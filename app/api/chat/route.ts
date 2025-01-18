'use server';

import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const CONVERSATION_PROMPT = `You are Grace Santos, a licensed insurance agent specializing in Final Expense coverage. Be concise, friendly, and professional. Focus on understanding the client's needs and guiding them to appropriate coverage options.

Key traits:
- Keep responses brief but warm
- Ask one question at a time
- Use client's name naturally
- Acknowledge their responses
- Guide conversation toward coverage needs

Never:
- Share personal stories
- Use excessive greetings
- Give specific policy prices
- Make assumptions about client's situation

Initial greeting should be: "Hi [name], I'm Grace Santos. I understand you're interested in Final Expense coverage. What made you consider this type of insurance?"`;

export async function POST(request: Request) {
  try {
    const { message, userProfile, preQualAnswers } = await request.json();

    // Add context about the user's previous answers
    const contextPrompt = `
Client Information:
Name: ${userProfile.firstName} ${userProfile.lastName}
Email: ${userProfile.email}
Phone: ${userProfile.phone}
Location: ${userProfile.city}, ${userProfile.state} ${userProfile.zipCode}

Pre-qualification Answers:
${Object.entries(preQualAnswers).map(([key, value]) => `${key}: ${value}`).join('\n')}

Use this information to personalize the conversation but don't repeat questions about data you already have. Continue the conversation naturally based on the client's responses.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      temperature: 0.7,
      system: CONVERSATION_PROMPT + '\n\n' + contextPrompt,
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
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