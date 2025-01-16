import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

interface QuoteInfo {
  optedIn?: boolean;
  state?: string;
  gender?: string;
  dateOfBirth?: string;
  height?: number;
  weight?: number;
  tobaccoUse?: boolean;
  coverageAmount?: number;
  nicotineUse?: boolean;
  phoneNumber?: string;
  medications?: string[];
  heartConditions?: boolean;
  lungConditions?: boolean;
  highBloodPressure?: boolean;
  cancerHistory?: boolean;
  diabetes?: boolean;
  strokeHistory?: boolean;
  hospitalStays?: boolean;
}

function extractQuoteInfo(messages: any[]): Partial<QuoteInfo> {
  const info: Partial<QuoteInfo> = {};
  
  // Check for opt-in in any message
  info.optedIn = messages.some(m => 
    m.role === 'user' && 
    m.content.toUpperCase().includes('I AGREE')
  );

  const lastMessage = messages[messages.length - 1].content.toLowerCase();

  // Extract phone number (XXX-XXX-XXXX)
  const phoneMatch = lastMessage.match(/\b\d{3}-\d{3}-\d{4}\b/);
  if (phoneMatch) info.phoneNumber = phoneMatch[0];

  // Extract state (2-letter code)
  const stateMatch = lastMessage.match(/\b[A-Z]{2}\b/i);
  if (stateMatch) info.state = stateMatch[0].toUpperCase();

  // Extract gender
  if (lastMessage.includes('male')) info.gender = 'male';
  if (lastMessage.includes('female')) info.gender = 'female';

  // Extract date of birth (MMDDYYYY)
  const dobMatch = lastMessage.match(/\b\d{8}\b/);
  if (dobMatch) info.dateOfBirth = dobMatch[0];

  // Extract height and weight
  const heightMatch = lastMessage.match(/(\d+)\s*(?:inch|inches|in)/i);
  if (heightMatch) info.height = parseInt(heightMatch[1]);
  
  const weightMatch = lastMessage.match(/(\d+)\s*(?:pound|pounds|lbs)/i);
  if (weightMatch) info.weight = parseInt(weightMatch[1]);

  // Extract tobacco/nicotine use
  info.tobaccoUse = lastMessage.includes('yes') && lastMessage.includes('tobacco');
  info.nicotineUse = lastMessage.includes('yes') && lastMessage.includes('nicotine');

  // Extract coverage amount
  const coverageMatch = lastMessage.match(/(\d+),?000/);
  if (coverageMatch) info.coverageAmount = parseInt(coverageMatch[0].replace(',', ''));

  // Extract health conditions
  info.heartConditions = lastMessage.includes('heart') || lastMessage.includes('stints');
  info.lungConditions = lastMessage.includes('asthma') || lastMessage.includes('copd');
  info.highBloodPressure = lastMessage.includes('blood pressure') || lastMessage.includes('hypertension');
  info.cancerHistory = lastMessage.includes('cancer');
  info.diabetes = lastMessage.includes('diabetes');
  info.strokeHistory = lastMessage.includes('stroke') || lastMessage.includes('tia');
  info.hospitalStays = lastMessage.includes('hospital');

  return info;
}

async function processQuoteRequest(messages: any[]) {
  const quoteInfo = extractQuoteInfo(messages);
  
  // If not opted in, don't process further
  if (!quoteInfo.optedIn) {
    return {
      complete: false,
      needsOptIn: true,
      collectedInfo: quoteInfo
    };
  }

  // Check if we have enough information for a quote
  const requiredFields = ['state', 'gender', 'dateOfBirth', 'height', 'weight', 'coverageAmount', 'phoneNumber'];
  const missingFields = requiredFields.filter(field => !(field in quoteInfo));

  if (missingFields.length > 0) {
    return {
      complete: false,
      missingFields,
      collectedInfo: quoteInfo
    };
  }

  // If we have all required info, get quote from n8n
  const quote = await getQuoteFromN8N(quoteInfo);
  
  // Save quote to Supabase
  await saveQuoteToSupabase({
    ...quoteInfo,
    quote_amount: quote.amount,
    created_at: new Date().toISOString(),
    status: 'pending'
  });

  return {
    complete: true,
    quote,
    collectedInfo: quoteInfo
  };
}

async function getQuoteFromN8N(data: any) {
  try {
    // Format height from 5'9 to 59
    if (typeof data.height === 'string' && data.height.includes("'")) {
      const [feet, inches] = data.height.replace("'", "").split(" ");
      data.height = parseInt(feet) * 10 + parseInt(inches || '0');
    }

    // Format date of birth to MM-DD-YYYY
    const dob = data.dateOfBirth;
    const formattedDob = `${dob.substring(0,2)}-${dob.substring(2,4)}-${dob.substring(4)}`;

    // Calculate coverage amounts with $10,000 increments
    const baseAmount = parseInt(data.coverageAmount);
    const coverageAmounts = [
      baseAmount,
      baseAmount + 10000,
      baseAmount + 20000
    ];

    // Format data for initial request
    const formattedData = {
      state: data.state,
      gender: data.gender === 'male' ? 'Male' : 'Female',
      dob: formattedDob,
      height: data.height,
      weight: data.weight,
      nicotine_use: data.tobaccoUse || data.nicotineUse || false,
      coverage_amount_0: coverageAmounts[0].toString(),
      coverage_amount_1: coverageAmounts[1].toString(),
      coverage_amount_2: coverageAmounts[2].toString(),
      phone: data.phoneNumber
    };

    console.log('Starting quote process with data:', formattedData);
    
    // Initial request to start quote process
    const startResponse = await fetch('https://3be3-45-177-2-86.ngrok-free.app/quote/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    if (!startResponse.ok) {
      throw new Error(`Failed to start quote process: ${startResponse.status}`);
    }

    const startResult = await startResponse.json();
    const quoteId = startResult.quoteId; // Assuming n8n returns a quote ID

    // Poll for quote status every 10 seconds for up to 2 minutes
    let attempts = 0;
    const maxAttempts = 12; // 12 attempts * 10 seconds = 2 minutes
    
    while (attempts < maxAttempts) {
      console.log(`Checking quote status (attempt ${attempts + 1}/${maxAttempts})`);
      
      const statusResponse = await fetch(`https://3be3-45-177-2-86.ngrok-free.app/quote/status/${quoteId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!statusResponse.ok) {
        throw new Error(`Failed to check quote status: ${statusResponse.status}`);
      }

      const statusResult = await statusResponse.json();
      
      if (statusResult.status === 'complete') {
        console.log('Quote process completed:', statusResult);
        return {
          ...statusResult,
          coverageAmounts,
          processingTime: '2 minutes'
        };
      }

      // Wait 10 seconds before next attempt
      await new Promise(resolve => setTimeout(resolve, 10000));
      attempts++;
    }

    throw new Error('Quote process timed out after 2 minutes');
  } catch (error) {
    console.error('Error in quote process:', error);
    throw error;
  }
}

async function saveQuoteToSupabase(quoteData: any) {
  try {
    const { data, error } = await supabase
      .from('quotes')
      .insert([quoteData])
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving quote to Supabase:', error);
    throw error;
  }
}

const SYSTEM_PROMPT = `You are Grace Santos, a licensed Insurance Agent at SafeHaven Insurance, specializing in Final Expense Insurance. You are an expert negotiator and closer with a mission to provide compassionate financial protection for families.

IMPORTANT: ALWAYS START WITH LEGAL OPT-IN. Never proceed with questions until user agrees.

INITIAL OPT-IN MESSAGE:
"Welcome! Before we begin, I need to inform you that by continuing this conversation:
1. You consent to SafeHaven Insurance collecting and processing your information
2. You agree to be contacted about insurance quotes and related services
3. You understand this is for insurance quote purposes only
4. You acknowledge that rates are subject to underwriting approval

Please reply with 'I AGREE' to continue with the quote process, or let me know if you have any questions about these terms."

AFTER OPT-IN RECEIVED, FOLLOW THIS SEQUENCE:
1. Phone number (10 digits)
2. State of residence
3. Gender
4. Date of Birth (MMDDYYYY)
5. Height (inches)
6. Weight (pounds)
7. Coverage Amount desired ($5,000 - $25,000)
8. Tobacco/Nicotine use
9. Health Assessment (one at a time):
   - Medications and reasons
   - Heart conditions/stints
   - Lung conditions
   - High blood pressure
   - Cancer history
   - Diabetes
   - Stroke history
   - Hospital stays

COMMUNICATION GUIDELINES:
- NEVER proceed with questions without opt-in
- Ask only ONE question at a time
- Wait for the answer before moving to the next question
- Be clear and concise
- Acknowledge the information received
- Move naturally to the next question
- Keep responses brief and focused

RESPONSE STRUCTURE:
1. For new conversations, always start with opt-in message
2. For ongoing conversations:
   - Acknowledge any information provided
   - Ask the next single question in sequence
3. Keep responses under 3 sentences

EXAMPLE RESPONSES:
First Message: [INITIAL OPT-IN MESSAGE]
After "I AGREE": "Thank you for agreeing to the terms. What is your phone number? Please provide it in the format XXX-XXX-XXXX."
Regular Flow: "Got it, your phone number is recorded. What state do you live in?"

Remember: 
- Never proceed without explicit opt-in
- Never make up quotes
- Ask only one question at a time
- Keep responses brief and focused

COVERAGE AMOUNT EXPLANATION:
When asking for coverage amount, explain that you'll provide quotes for three coverage levels:
1. Their requested amount
2. A mid-tier option ($5,000 more than requested)
3. A premium option ($10,000 more than requested, up to $25,000)

QUOTE GENERATION MESSAGE:
When all information is collected, ONLY say:
"Thank you for providing all the necessary information. I'll now generate quotes for [coverage amounts]. This will take approximately 2 minutes to process. You'll see a countdown timer while I process your quotes. Please wait while I prepare your personalized rates..."

IMPORTANT QUOTE RULES:
1. NEVER make up or provide specific quote amounts
2. NEVER mention specific carriers
3. While quotes are processing, ONLY say "I'm still processing your quotes. This typically takes about 2 minutes to ensure we get you the best rates. Please continue to wait..."
4. ONLY provide quote information when it's explicitly included in the system message

WAITING RESPONSES:
If user asks about status: "I'm still gathering quotes from our carrier network. This process takes about 2 minutes to ensure accuracy. Please continue to wait..."
If user seems impatient: "I understand you're eager to see the quotes. We're almost there. This thorough process helps us find the best rates for you."`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log('Received messages:', messages);

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not set');
    }

    // Process quote request first
    const quoteResult = await processQuoteRequest(messages);
    console.log('Quote processing result:', quoteResult);

    // If we have complete information, initiate the quote process before getting AI response
    let quoteProcessing = false;
    let webhookResponse = null;
    if (quoteResult.complete) {
      quoteProcessing = true;
      try {
        webhookResponse = await getQuoteFromN8N(quoteResult.collectedInfo);
        console.log('Webhook response:', webhookResponse);
      } catch (error) {
        console.error('Error from webhook:', error);
      }
    }

    // Format messages for Claude
    const formattedMessages = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content,
    }));

    // Add quote result to system prompt if available
    let systemPrompt = SYSTEM_PROMPT;
    if (quoteResult.collectedInfo) {
      systemPrompt += `\n\nCURRENT COLLECTED INFORMATION:\n${JSON.stringify(quoteResult.collectedInfo, null, 2)}`;
    }
    if (quoteResult.missingFields) {
      systemPrompt += `\n\nMISSING FIELDS:\n${quoteResult.missingFields.join('\n')}`;
    }
    if (quoteProcessing) {
      systemPrompt += `\n\nQUOTE STATUS: Processing\nESTIMATED TIME: 2 minutes\nPLEASE RESPOND WITH THE PROCESSING MESSAGE`;
    }

    console.log('Sending request to Claude');
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 2048,
      temperature: 0.5,
      system: systemPrompt,
      messages: formattedMessages,
    });

    console.log('Received response from Claude');
    const content = response.content[0];
    
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    return new Response(
      JSON.stringify({
        role: 'assistant',
        content: content.text,
        quoteResult,
        quoteProcessing,
        webhookResponse,
        loading: quoteProcessing,
        estimatedTime: quoteProcessing ? '2 minutes' : null,
        loadingState: quoteProcessing ? {
          status: 'processing',
          startTime: Date.now(),
          endTime: Date.now() + 120000, // 2 minutes in milliseconds
          message: 'Generating your personalized quotes...',
          steps: [
            {
              name: 'Submitting information',
              duration: 5000,
              status: 'completed'
            },
            {
              name: 'Processing quotes',
              duration: 110000,
              status: 'in_progress'
            },
            {
              name: 'Retrieving final rates',
              duration: 5000,
              status: 'pending'
            }
          ]
        } : null
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );

  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to get response from AI',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 