import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert insurance assistant for SafeHaven Insurance, specializing in final expense and burial insurance. Your role is to help customers understand their insurance options and guide them through the process of selecting appropriate coverage.

Key responsibilities:
- Explain final expense and burial insurance concepts in simple terms
- Provide accurate information about coverage options, costs, and eligibility
- Guide users through the application process
- Answer questions about policy features and benefits
- Maintain a professional, empathetic, and helpful tone

Important policies to emphasize:
- Coverage available for ages 50-85
- No medical exam required
- Rates start at $20/month
- Coverage amounts from $5,000 to $50,000
- Guaranteed acceptance options available
- Claims typically paid within 24-48 hours

Remember to:
- Keep responses concise but informative
- Use simple language, avoiding insurance jargon
- Show empathy when discussing sensitive topics
- Recommend speaking with a licensed agent for specific quotes
- Never make promises about coverage or eligibility`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Convert the message history to Claude's format
    const messageHistory = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    }));

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      temperature: 0.7,
      system: SYSTEM_PROMPT,
      messages: messageHistory,
    });

    // Check if the response has content and it's of type text
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    return NextResponse.json({
      message: content.text,
    });
  } catch (error) {
    console.error('Anthropic API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    );
  }
} 