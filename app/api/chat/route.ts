'use server';

import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message, userProfile, preQualAnswers, messageHistory } = await request.json();

    // Build conversation history
    const messages = [];
    
    // Only add the system message for the first interaction
    if (!messageHistory || messageHistory.length === 0) {
      messages.push({
        role: 'assistant',
        content: `Hi ${userProfile.firstName}, I'm Grace. What's your main reason for looking into Final Expense coverage?`
      });
    } else {
      // Add previous messages
      messages.push(...messageHistory.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      })));
    }

    // Add current message
    messages.push({
      role: 'user',
      content: message
    });

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      temperature: 0.7,
      system: `You are Grace, a licensed insurance agent. Keep responses under 2 sentences. Focus on understanding client needs and moving the conversation forward. Never introduce yourself again after the first message.`,
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