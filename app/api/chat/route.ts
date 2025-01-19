'use server';

import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getMooQuotes } from '@/utils/moo-quote';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const systemPrompt = `You are Grace, a licensed insurance agent. Follow these strict rules:

INFORMATION COLLECTION (in order):
1. Basic Information:
- Full name
- State (2-letter code)
- Gender
- DOB (MMDDYYYY format only)
- Height (in inches)
- Weight (in pounds)
- Phone number

2. Health Assessment:
- Current nicotine/tobacco use
- Heart conditions
- High blood pressure
- Cancer history
- Stroke/TIA history
- Diabetes
- Lung conditions
- Hospital stays in past 5 years

CRITICAL RULES:
1. ALWAYS provide specific quotes when you have all required information
2. Present quotes in three tiers: Bronze ($15,000), Silver ($20,000), and Gold ($25,000)
3. Never direct clients to external agents or carriers
4. Maintain a friendly, professional tone
5. If quote generation fails, apologize and offer to try again

Keep responses under 2 sentences. Ask one question at a time. Never skip required information.`;

export async function POST(request: Request) {
  try {
    const { message, userProfile, preQualAnswers, messageHistory, collectedInfo } = await request.json();
    
    const messages = messageHistory?.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content
    })) || [];

    // Check if we have all required information for quoting
    const hasAllInfo = collectedInfo && 
      collectedInfo.state &&
      collectedInfo.gender &&
      collectedInfo.dob &&
      collectedInfo.height &&
      collectedInfo.weight &&
      typeof collectedInfo.healthInfo?.nicotine !== 'undefined' &&
      typeof collectedInfo.healthInfo?.heartConditions !== 'undefined' &&
      typeof collectedInfo.healthInfo?.bloodPressure !== 'undefined' &&
      typeof collectedInfo.healthInfo?.cancer !== 'undefined' &&
      typeof collectedInfo.healthInfo?.stroke !== 'undefined' &&
      typeof collectedInfo.healthInfo?.diabetes !== 'undefined' &&
      typeof collectedInfo.healthInfo?.lungConditions !== 'undefined' &&
      typeof collectedInfo.healthInfo?.hospitalStays !== 'undefined';

    let quotes = null;
    if (hasAllInfo) {
      try {
        quotes = await getMooQuotes({
          fullName: `${userProfile.firstName} ${userProfile.lastName}`,
          state: collectedInfo.state,
          gender: collectedInfo.gender as 'Male' | 'Female',
          dob: collectedInfo.dob.replace(/[^0-9]/g, ''),
          height: parseInt(collectedInfo.height),
          weight: parseInt(collectedInfo.weight),
          phone: userProfile.phone.replace(/[^0-9]/g, ''),
          nicotineUse: collectedInfo.healthInfo.nicotine === 'Yes',
          heartConditions: collectedInfo.healthInfo.heartConditions === 'Yes',
          highBloodPressure: collectedInfo.healthInfo.bloodPressure === 'Yes',
          cancerHistory: collectedInfo.healthInfo.cancer === 'Yes',
          strokeHistory: collectedInfo.healthInfo.stroke === 'Yes',
          diabetes: collectedInfo.healthInfo.diabetes === 'Yes',
          lungConditions: collectedInfo.healthInfo.lungConditions === 'Yes',
          hospitalStays: collectedInfo.healthInfo.hospitalStays === 'Yes'
        });
      } catch (error) {
        console.error('Failed to get quotes:', error);
      }
    }

    messages.push({
      role: 'user',
      content: message
    });

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      temperature: 0.7,
      system: systemPrompt + (quotes ? `\n\nAvailable quotes:\n${JSON.stringify(quotes)}` : ''),
      messages
    });

    return NextResponse.json({ 
      response: response.content[0].type === 'text' ? response.content[0].text : 'I apologize, but I encountered an error. Please try again.',
      quotes
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}