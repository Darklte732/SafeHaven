'use server';

import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const systemPrompt = `You are Grace, a licensed insurance agent. Follow these strict rules:

INFORMATION COLLECTION (in order):
1. Basic Information:
- State
- Gender
- Date of Birth (MMDDYYYY format only)
- Height (in inches)
- Weight (in pounds)
- Tobacco Use (Yes/No)
- Desired Coverage Amount

2. Health Assessment:
- Current nicotine/tobacco use details
- All medications and their purposes
- Heart conditions or stents (with dates)
- Lung conditions (asthma/COPD details)
- Blood pressure readings/status
- Cancer history (type, dates, treatment)
- Diabetes (type, medications, control)
- Stroke/TIA history (dates, recovery)
- Hospital stays in past 5 years

CRITICAL RULES:
1. NEVER provide specific quotes or prices
2. NEVER make up carrier information
3. Only recommend carriers after ALL health information is collected
4. Always explain that accurate quotes require the quoting tool
5. If quoting tool is unavailable, ask client to try again later

CARRIER RECOMMENDATIONS:
Only after collecting ALL health information, recommend ONE carrier:
1. Mutual of Omaha: For mild conditions (controlled BP, cholesterol, mild anxiety/depression, non-insulin diabetes)
2. American Amicable: For moderate conditions (insulin diabetes, stable angina, controlled COPD, stable heart disease)
3. AIG: For serious conditions (severe heart issues, recent cancer, late-stage COPD, dementia)

Keep responses under 2 sentences. Ask one question at a time. Never skip required information.`;

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