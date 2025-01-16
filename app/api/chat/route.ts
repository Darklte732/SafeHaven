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
  const requiredFields = ['state', 'gender', 'dateOfBirth', 'height', 'weight', 'coverageAmount'];
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

    // Calculate coverage amounts (base amount and two higher tiers)
    const baseAmount = data.coverageAmount;
    const coverageAmounts = [
      baseAmount,
      Math.min(baseAmount + 5000, 25000),
      Math.min(baseAmount + 10000, 25000)
    ].filter((amount, index, self) => self.indexOf(amount) === index); // Remove duplicates

    // Determine recommended carrier based on health conditions
    let recommendedCarrier = 'Mutual of Omaha'; // Default for healthy applicants
    const healthIssues = [
      data.heartConditions,
      data.lungConditions,
      data.highBloodPressure,
      data.cancerHistory,
      data.diabetes,
      data.strokeHistory,
      data.hospitalStays
    ].filter(Boolean).length;

    if (healthIssues >= 3) {
      recommendedCarrier = 'AIG';
    } else if (healthIssues >= 1) {
      recommendedCarrier = 'American Amicable';
    }

    // Format data for n8n webhook
    const formattedData = {
      State: data.state,
      Gender: data.gender,
      DateOfBirth: data.dateOfBirth,
      Height: data.height,
      Weight: data.weight,
      TobaccoUse: data.tobaccoUse ? 'Yes' : 'No',
      CoverageAmounts: coverageAmounts,
      RecommendedCarrier: recommendedCarrier,
      HealthProfile: {
        Medications: data.medications || [],
        HeartConditions: data.heartConditions || false,
        LungConditions: data.lungConditions || false,
        HighBloodPressure: data.highBloodPressure || false,
        CancerHistory: data.cancerHistory || false,
        Diabetes: data.diabetes || false,
        StrokeHistory: data.strokeHistory || false,
        HospitalStays: data.hospitalStays || false
      }
    };

    console.log('Sending formatted data to n8n:', formattedData);
    const response = await fetch('https://3be3-45-177-2-86.ngrok-free.app/webhook/MooQuoting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const quoteResponse = await response.json();
    return {
      ...quoteResponse,
      recommendedCarrier,
      coverageAmounts,
      processingTime: '2 minutes'
    };
  } catch (error) {
    console.error('Error getting quote from n8n:', error);
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
1. State of residence
2. Gender
3. Date of Birth (MMDDYYYY)
4. Height (inches)
5. Weight (pounds)
6. Coverage Amount desired ($5,000 - $25,000)
7. Tobacco/Nicotine use
8. Health Assessment (one at a time):
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
After "I AGREE": "Thank you for agreeing to the terms. What state do you live in?"
Regular Flow: "Got it, Texas. What is your date of birth? Please provide it in MMDDYYYY format."

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
When all information is collected, say:
"Thank you for providing all the necessary information. I'll now generate quotes for [coverage amounts]. Based on your health profile, I recommend [carrier name] as the best fit for your situation. This will take approximately 2 minutes to process all quotes. Please wait while I prepare your personalized quotes..."`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log('Received messages:', messages);

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not set');
    }

    // Process quote request
    const quoteResult = await processQuoteRequest(messages);
    console.log('Quote processing result:', quoteResult);

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
    if (quoteResult.complete) {
      systemPrompt += `\n\nQUOTE STATUS: Processing\nESTIMATED TIME: 2 minutes\nRECOMMENDED CARRIER: ${quoteResult.quote.recommendedCarrier}`;
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
        loading: quoteResult.complete ? true : false,
        estimatedTime: quoteResult.complete ? '2 minutes' : null
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