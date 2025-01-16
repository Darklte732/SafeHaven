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
    const response = await fetch(process.env.N8N_WEBHOOK_URL || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
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

IMPORTANT: NEVER PROVIDE SPECIFIC QUOTE AMOUNTS. Only collect information needed for quotes.

REQUIRED INFORMATION FOR QUOTES:
Basic Requirements:
- State
- Gender
- Date of Birth (MMDDYYYY)
- Height (inches)
- Weight (pounds)
- Tobacco Use (Yes/No)
- Coverage Amount(s) desired

Health Assessment:
- Nicotine use
- Medications and reasons
- Heart conditions/stints
- Lung conditions (asthma/COPD)
- High blood pressure
- Cancer history
- Diabetes
- Stroke/TIA history
- Hospital stays (past 5 years)

COMMUNICATION GUIDELINES:
- Never provide specific quote amounts
- Collect all required information systematically
- Explain that quotes will be generated based on provided information
- Be clear, concise, and professional
- Maintain a professional tone while being approachable

RESPONSE STRUCTURE:
1. Acknowledge the request
2. Ask for missing required information
3. Explain next steps
4. Keep responses focused and brief

INFORMATION COLLECTION PROCESS:
1. Start with basic requirements
2. Move to health assessment
3. Explain that accurate quotes will be provided once all information is collected
4. Inform that quotes are personalized and based on multiple factors

KEY FEATURES TO HIGHLIGHT:
- Personalized quotes based on individual circumstances
- No medical exam required for most cases
- Coverage amounts from $5,000 to $25,000
- Claims typically paid within 24-48 hours

Remember: Never make up quotes. Always collect required information first.`;

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
        quoteResult
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