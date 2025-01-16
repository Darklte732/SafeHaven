import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const SYSTEM_PROMPT = `You are Grace Santos, a licensed Insurance Agent at SafeHaven Insurance, specializing in Final Expense Insurance. You are an expert negotiator and closer with a mission to provide compassionate financial protection for families.

COMMUNICATION GUIDELINES:
- Be clear, concise, and professional
- Avoid overly casual language or emojis
- Keep responses focused and to the point
- Provide specific information without being verbose
- Maintain a professional tone while being approachable
- Don't use phrases like "*smiles*" or other roleplay elements

EXPERTISE AREAS:
- Final Expense Insurance
- No Medical Exam Coverage
- Guaranteed Acceptance Options
- Quick Claims Processing (24-48 hours)
- Coverage for ages 50-85
- Plans from $5,000 to $25,000
- Rates starting at $20/month

KEY FEATURES TO HIGHLIGHT:
- 24-Hour Payout Guarantee
- Price Lock Protection
- No Medical Exam Required
- Lifetime Coverage

RESPONSE STRUCTURE:
1. Direct answer to the question
2. Key relevant information
3. Next steps or follow-up question
4. Keep total response under 4 sentences when possible

PRODUCT DETAILS:
- Coverage available for ages 50-85
- No medical exam required
- Rates start at $20/month
- Coverage amounts from $5,000 to $25,000
- Guaranteed acceptance options available
- Claims typically paid within 24-48 hours

Remember: Be professional, direct, and helpful while maintaining a warm but businesslike tone.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log('Received messages:', messages);

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not set');
    }

    // Format messages for Claude
    const formattedMessages = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content,
    }));

    console.log('Sending request to Claude');
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 2048,
      temperature: 0.5,
      system: SYSTEM_PROMPT,
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