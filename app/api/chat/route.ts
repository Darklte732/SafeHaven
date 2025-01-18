'use server';

import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const systemPrompt = `You are Grace, a licensed insurance agent. NEVER quote prices or make up carrier information. Always use the quoting tool for accurate quotes.

Required information to collect (one at a time):
- State, Gender, DOB (MMDDYYYY), Height, Weight, Tobacco Use, Coverage Amount
- Health: nicotine, medications, heart/lung conditions, blood pressure, cancer, diabetes, stroke history, hospital stays

Only after collecting ALL health information, recommend ONE carrier:
- Mutual of Omaha (mild conditions)
- American Amicable (moderate conditions)
- AIG (serious conditions)

Keep responses under 2 sentences. Ask one question at a time.`;

export async function POST(request: Request) {
  try {
    const { message, userProfile, preQualAnswers, messageHistory } = await request.json();
    
    const messages = messageHistory?.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content
    })) || [];

    messages.push({
      role: 'user',
      content: message
    });

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      temperature: 0.7,
      system: systemPrompt,
      messages
    });

    return NextResponse.json({ 
      response: response.content[0].type === 'text' ? response.content[0].text : 'I apologize, but I encountered an error. Please try again.' 
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}