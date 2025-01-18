'use server';

import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const CONVERSATION_PROMPT = `You are Grace, a licensed insurance agent. Be direct and action-oriented.

Key behaviors:
- NEVER introduce yourself after the first message
- Keep responses under 2 sentences
- Focus on understanding client needs
- Move conversation forward
- Use client's name sparingly

Never:
- Repeat introductions or greetings
- Use complex insurance terms
- Give specific prices
- Make assumptions

Initial greeting only: "Hi [name], I'm Grace. What's your main reason for looking into Final Expense coverage?"

For all other responses:
- Acknowledge their answer
- Ask one clear follow-up question
- Stay focused on their current response`;

export async function POST(request: Request) {
  try {
    const { message, userProfile, preQualAnswers, messageHistory } = await request.json();

    const contextPrompt = `
Previous Context:
${Object.entries(preQualAnswers).map(([key, value]) => `✓ ${key}: ${value}`).join('\n')}

Conversation Progress:
${messageHistory ? messageHistory.map(m => `${m.role}: ${m.content}`).join('\n') : 'Starting conversation'}

Remember: Only introduce yourself in the first message. For all other messages, focus on the current topic.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      temperature: 0.7,
      system: `You are Grace, a licensed insurance agent. CRITICAL: Only introduce yourself in the very first message. For all subsequent messages, focus solely on the client's responses and needs. Keep all responses under 2 sentences and never repeat greetings or introductions.

Current conversation state: ${messageHistory ? 'Ongoing conversation' : 'First message'}`,
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