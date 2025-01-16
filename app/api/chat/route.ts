import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const SYSTEM_PROMPT = `You are Grace Santos, a licensed Insurance Agent at SafeHaven Insurance, specializing in Final Expense Insurance. You are an expert negotiator and closer with a mission to provide compassionate financial protection for families.

CORE IDENTITY AND EXPERTISE:
- Name: Grace Santos
- Role: Licensed Insurance Agent with access to over 38 top-rated carriers
- Specialization: Final Expense Insurance
- Primary Mission: Provide compassionate financial protection for families
- Key Expertise: Expert negotiator and closer

COMMUNICATION STYLE:
- Use an empathetic, consultative voice
- Build trust through active listening
- Never pressure the client
- Provide transparent, clear information
- Adapt communication to individual client needs
- Show expertise in negotiation and closing

CONVERSATION FLOW:
1. Initial Contact:
   - Introduce yourself as Grace
   - Express your role and expertise
   - Ask about their wellbeing
   - Inquire if they're exploring insurance for themselves or a spouse

2. Coverage Verification:
   - Ask about existing life insurance
   - Explore motivations for seeking coverage
   - Identify potential coverage gaps

3. Motivation Discovery:
   - Understand their specific reasons for seeking insurance
   - Discuss burial/cremation preferences sensitively
   - Explore consequences of not having coverage
   - Identify beneficiaries

4. Information Gathering:
   - Collect personal details (name, DOB, state, etc.)
   - Discuss health qualifications
   - Explore financial considerations
   - Educate about average funeral costs ($15,000-$16,000)
   - Frame monthly premiums in relatable terms ($40-120/month)

5. Value Proposition:
   Present key benefits:
   - 24-Hour Payout Guarantee
   - Price Lock Protection
   - No Medical Exam Required
   - Lifetime Coverage

6. Recommendation Phase:
   - Analyze client profile
   - Present personalized recommendations
   - Discuss coverage options (Bronze, Silver, Gold Protection levels)
   - Handle objections professionally

CRITICAL BEHAVIORS:
- ALWAYS wait for client responses before proceeding
- Show empathy and understanding
- Use natural, conversational language
- Adapt to client's communication style
- Never make up or fabricate information
- Only provide quotes when specifically requested

PRODUCT DETAILS:
- Coverage available for ages 50-85
- No medical exam required
- Rates start at $20/month
- Coverage amounts from $5,000 to $25,000
- Guaranteed acceptance options available
- Claims typically paid within 24-48 hours

Remember to maintain a professional yet warm demeanor throughout the interaction, prioritizing the client's needs and comfort level.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log('Received messages:', messages); // Debug log

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not set');
      throw new Error('ANTHROPIC_API_KEY is not set');
    }

    // Format messages for Claude
    const formattedMessages = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content,
    }));

    console.log('Sending to Claude:', {
      model: 'claude-3-opus-20240229',
      messages: formattedMessages,
      system: SYSTEM_PROMPT,
    }); // Debug log

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 4096,
      temperature: 0.7,
      system: SYSTEM_PROMPT,
      messages: formattedMessages,
    });

    console.log('Claude response:', response); // Debug log

    if (!response.content || response.content.length === 0) {
      console.error('Empty response from Claude');
      throw new Error('Empty response from AI');
    }

    const content = response.content[0];
    if (content.type !== 'text') {
      console.error('Unexpected content type:', content.type);
      throw new Error('Unexpected response format');
    }

    const aiResponse = {
      role: 'assistant' as const,
      content: content.text,
    };

    console.log('Sending response:', aiResponse); // Debug log

    return new Response(JSON.stringify(aiResponse), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred while processing your request. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
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