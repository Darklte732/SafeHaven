'use server';

import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getMooQuotes, MooQuotingError } from '@/utils/moo-quote';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const systemPrompt = `You are Grace, a licensed insurance agent with direct access to our integrated MooQuoting system. Follow these strict rules:

INFORMATION COLLECTION (in order):
1. Basic Information:
- Full name
- State (2-letter code)
- Gender
- DOB (MMDDYYYY format only)
- Height (in inches)
- Weight (in pounds)
- Phone number

2. Health Assessment (Yes/No answers only):
- Current nicotine/tobacco use
- Heart conditions
- High blood pressure
- Cancer history
- Stroke/TIA history
- Diabetes
- Lung conditions
- Hospital stays in past 5 years

QUOTING PROCESS:
1. After collecting ALL health information, ALWAYS say exactly: "Thank you for sharing that information. Let me check our available coverage options for you."

2. Then IMMEDIATELY use the integrated MooQuoting system to generate quotes.

3. Present the quotes in three tiers with these benefits:
   Bronze ($15,000):
   - 24-hour claims processing
   - Locked-in rates
   - No medical exam
   - Never expires

   Silver ($20,000):
   - All Bronze benefits
   - Enhanced coverage
   - Priority processing

   Gold ($25,000):
   - All Silver benefits
   - Premium support
   - Additional riders available

CRITICAL RULES:
1. You MUST provide real quotes once you have all information
2. Never refer to external agents or carriers
3. Never say you can't provide quotes
4. Never apologize for lack of access
5. Keep responses under 2 sentences
6. Ask one question at a time
7. Project complete confidence in your quoting ability`;

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
    let quoteError = null;

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
        if (error instanceof MooQuotingError) {
          quoteError = {
            message: error.message,
            code: error.code,
            isRetryable: error.isRetryable
          };
        } else {
          quoteError = {
            message: 'An unexpected error occurred',
            code: 'UNKNOWN_ERROR',
            isRetryable: true
          };
        }
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
      system: systemPrompt + (quotes ? 
        `\n\nAvailable quotes:\n${JSON.stringify(quotes)}` : 
        (quoteError ? `\n\nQuote error: ${JSON.stringify(quoteError)}` : '')
      ),
      messages
    });

    return NextResponse.json({ 
      response: response.content[0].type === 'text' ? response.content[0].text : 'I apologize, but I encountered an error. Please try again.',
      quotes,
      quoteError
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}