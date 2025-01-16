import { NextResponse } from 'next/server';
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

interface QuoteResponse {
  message: string;
  quoteData: any;
}

interface QuoteInfo {
  state: string;
  gender: string;
  dateOfBirth: string;
  height: string;
  weight: string;
  nicotineUse: boolean;
  coverageAmount: string;
  phoneNumber: string;
  optedIn?: boolean;
  tobaccoUse?: boolean;
  heartConditions?: boolean;
  lungConditions?: boolean;
  highBloodPressure?: boolean;
  cancerHistory?: boolean;
  diabetes?: boolean;
  strokeHistory?: boolean;
  hospitalStays?: boolean;
}

interface ProcessQuoteResult {
  collectedInfo: QuoteInfo;
  complete: boolean;
  missingFields?: string[];
}

interface PartialQuoteInfo extends Partial<QuoteInfo> {}

function extractQuoteInfo(messages: Message[]): Partial<QuoteInfo> {
  const info: Partial<QuoteInfo> = {};
  
  for (const message of messages) {
    if (message.role === 'user') {
      const content = message.content.toLowerCase();
      
      // Extract state
      if (content.includes('state')) {
        info.state = content.match(/state(?:\s+is)?\s+(\w+)/i)?.[1] || '';
      }
      
      // Extract gender
      if (content.includes('gender')) {
        info.gender = content.match(/gender(?:\s+is)?\s+(\w+)/i)?.[1] || '';
      }
      
      // Extract date of birth
      if (content.includes('birth')) {
        info.dateOfBirth = content.match(/(\d{2}\/\d{2}\/\d{4})/)?.[1] || '';
      }
      
      // Extract height (convert to string)
      if (content.includes('height')) {
        const heightMatch = content.match(/height(?:\s+is)?\s+(\d+)/i);
        info.height = heightMatch ? String(heightMatch[1]) : '';
      }
      
      // Extract weight (convert to string)
      if (content.includes('weight')) {
        const weightMatch = content.match(/weight(?:\s+is)?\s+(\d+)/i);
        info.weight = weightMatch ? String(weightMatch[1]) : '';
      }
      
      // Extract coverage amount (convert to string)
      if (content.includes('coverage')) {
        const amountMatch = content.match(/\$?(\d+(?:,\d{3})*)/);
        info.coverageAmount = amountMatch ? String(amountMatch[1].replace(/,/g, '')) : '';
      }
      
      // Extract nicotine use
      if (content.includes('nicotine') || content.includes('tobacco')) {
        info.nicotineUse = content.includes('yes');
      }
    }
  }
  
  return info;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

async function processQuoteRequest(messages: Message[]): Promise<ProcessQuoteResult> {
  const quoteInfo = extractQuoteInfo(messages);
  
  // Convert number values to strings
  const processedQuoteInfo = {
    ...quoteInfo,
    height: String(quoteInfo.height || ''),
    weight: String(quoteInfo.weight || ''),
    coverageAmount: String(quoteInfo.coverageAmount || ''),
  };

  const requiredFields = ['state', 'gender', 'dateOfBirth', 'height', 'weight', 'coverageAmount'];
  const missingFields = requiredFields.filter(field => !processedQuoteInfo[field as keyof QuoteInfo]);

  return {
    collectedInfo: processedQuoteInfo as QuoteInfo,
    complete: missingFields.length === 0,
    missingFields: missingFields.length > 0 ? missingFields : undefined
  };
}

async function getQuoteFromN8N(data: QuoteInfo): Promise<NextResponse> {
  try {
    // Format data for HTTP request
    const formattedData = {
      state: data.state,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      height: data.height,
      weight: data.weight,
      nicotineUse: data.tobaccoUse || data.nicotineUse || false,
      coverageAmounts: [
        Number(data.coverageAmount),
        Number(data.coverageAmount) + 5000,
        Number(data.coverageAmount) + 10000
      ],
      phoneNumber: data.phoneNumber || '1234567890'
    };

    // Initial request to start quote process
    const startResponse = await fetch('https://3be3-45-177-2-86.ngrok-free.app/webhook/MooQuoting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedData)
    });

    // Return error response
    if (!startResponse.ok) {
      console.error('Error starting quote process:', await startResponse.text());
      return NextResponse.json({ 
        error: 'Failed to start quote process',
        message: 'There was an error processing your quote request. Please try again.'
      }, { status: 500 });
    }

    // Get the response data
    const quoteData = await startResponse.json();

    // Return the formatted response to the user
    const response: QuoteResponse = {
      message: "Thank you for providing your information. Here are your quote options:",
      quoteData: quoteData
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in quote process:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      message: 'An unexpected error occurred while processing your request.'
    }, { status: 500 });
  }
}

interface QuoteData {
  state: string;
  gender: string;
  dateOfBirth: string;
  height: string;
  weight: string;
  nicotineUse: boolean;
  coverageAmount: string;
  phoneNumber: string;
  optedIn?: boolean;
  tobaccoUse?: boolean;
  heartConditions?: boolean;
  lungConditions?: boolean;
  highBloodPressure?: boolean;
  cancerHistory?: boolean;
  diabetes?: boolean;
  strokeHistory?: boolean;
  hospitalStays?: boolean;
  created_at?: string;
}

async function saveQuoteToSupabase(quoteData: QuoteData) {
  try {
    const { data, error } = await supabase
      .from('quotes')
      .insert([quoteData])
      .select()
      .single();

    if (error) {
      console.error('Error saving quote:', error);
      return null;
    }

    return data as QuoteData;
  } catch (error) {
    console.error('Error in saveQuoteToSupabase:', error);
    return null;
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
    
    // Process the quote request
    const quoteResult = await processQuoteRequest(messages);
    
    if (!quoteResult.complete) {
      return NextResponse.json({
        role: 'assistant',
        content: `I need some more information to provide accurate quotes. Please provide: ${quoteResult.missingFields?.join(', ')}`
      });
    }

    // Format data for initial request
    const formattedData = {
      ...quoteResult.collectedInfo,
      // Add any additional formatting here
    };

    try {
      // Save quote to Supabase
      const savedQuote = await saveQuoteToSupabase(formattedData);
      if (!savedQuote) {
        throw new Error('Failed to save quote');
      }

      return NextResponse.json({
        role: 'assistant',
        content: 'Thank you for providing all the information. I will process your quote request now.'
      });
    } catch (error) {
      console.error('Error in quote processing:', error);
      return NextResponse.json({
        role: 'assistant',
        content: 'I apologize, but there was an error processing your quote. Please try again later.'
      });
    }
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({
      role: 'assistant',
      content: 'I apologize, but I encountered an error. Please try again.'
    });
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