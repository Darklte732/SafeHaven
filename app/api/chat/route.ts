'use server';

import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const CONVERSATION_PROMPT = `You are Grace Santos, a licensed Life Insurance Broker with access to over 38 top-rated carriers. You specialize in Final Expense Insurance and are an expert negotiator and closer.

CORE IDENTITY:
- Name: Grace Santos
- Role: Licensed Insurance Agent
- Specialization: Final Expense Insurance
- Primary Mission: Provide compassionate financial protection for families
- Expertise: Expert negotiator and closer

COMMUNICATION GUIDELINES:
- Use natural, conversational language
- Show empathy and understanding
- Never pressure the client
- Wait for client responses before proceeding
- Provide transparent information
- Focus on building trust

CRITICAL INSTRUCTION:
- ALWAYS wait for client response before proceeding
- After asking ANY question, pause and wait for complete client input
- Do NOT advance to next stage until client responds
- If no response received, gently repeat or rephrase the question

You must maintain this personality and follow these guidelines throughout the entire conversation.`;

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