import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

type Role = 'user' | 'assistant';
type Message = {
  role: Role;
  content: string;
};

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
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
    // Check API key
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not set');
      return NextResponse.json(
        { error: 'The AI service is not properly configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format. Messages must be an array.' },
        { status: 400 }
      );
    }

    // Validate messages
    const messageHistory = messages.map((msg: { role: string; content: string }): Message => {
      if (msg.role !== 'user' && msg.role !== 'assistant') {
        throw new Error('Invalid role in message history. Role must be "user" or "assistant".');
      }
      if (typeof msg.content !== 'string' || !msg.content.trim()) {
        throw new Error('Invalid message content. Content must be a non-empty string.');
      }
      return {
        role: msg.role as Role,
        content: msg.content.trim(),
      };
    });

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      temperature: 0.7,
      system: SYSTEM_PROMPT,
      messages: messageHistory,
    });

    // Validate response
    const content = response.content[0];
    if (!content || content.type !== 'text' || !content.text) {
      throw new Error('Invalid response from AI service');
    }

    // Return response
    return NextResponse.json({ message: content.text });

  } catch (error) {
    console.error('Chat API error:', error);
    
    let errorMessage = 'An error occurred while processing your request.';
    let statusCode = 500;
    
    if (error instanceof Error) {
      if (error.message.includes('ANTHROPIC_API_KEY')) {
        errorMessage = 'The AI service is not properly configured. Please contact support.';
      } else if (error.message.includes('Invalid role') || error.message.includes('Invalid message content')) {
        errorMessage = 'Invalid request format. Please check your message format.';
        statusCode = 400;
      } else if (error.message.includes('rate limit')) {
        errorMessage = 'The service is temporarily busy. Please try again in a moment.';
        statusCode = 429;
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
} 