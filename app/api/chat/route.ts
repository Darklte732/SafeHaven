import { NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface UserInfo {
  rawInput: string;
  isUserInfo: boolean;
}

export async function POST(req: Request) {
  try {
    const { messages, userInfo } = await req.json();
    const lastMessage = messages[messages.length - 1];

    // Handle user information input
    if (userInfo?.isUserInfo) {
      const info = parseUserInfo(userInfo.rawInput);
      return NextResponse.json({
        role: 'assistant',
        content: `Thank you for providing your information. Based on the details you've shared:\n\n` +
                `Location: ${info.state || 'Not specified'}\n` +
                `Gender: ${info.gender || 'Not specified'}\n` +
                `Date of Birth: ${info.dateOfBirth || 'Not specified'}\n` +
                `Height: ${info.height || 'Not specified'}\n` +
                `Weight: ${info.weight || 'Not specified'}\n` +
                `Coverage Amount: $${info.coverageAmount || 'Not specified'}\n\n` +
                `I'll now search for the best insurance options that match your profile. One moment please...`,
        loadingState: {
          status: 'processing',
          startTime: Date.now(),
          endTime: Date.now() + 60000,
          message: 'Searching for insurance quotes...',
          steps: [
            { name: 'Verifying information', duration: 5000, status: 'completed' },
            { name: 'Checking eligibility', duration: 10000, status: 'in_progress' },
            { name: 'Calculating rates', duration: 15000, status: 'pending' },
            { name: 'Preparing quotes', duration: 20000, status: 'pending' }
          ]
        }
      });
    }

    // Default response for other messages
    return NextResponse.json({
      role: 'assistant',
      content: 'I need some more information to provide accurate quotes. Please provide: state, gender, dateOfBirth, height, weight, coverageAmount'
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function parseUserInfo(input: string) {
  const info: Record<string, string> = {};
  
  // State
  const stateMatch = input.match(/(?:new jersey|nj|new york|ny|pennsylvania|pa)/i);
  if (stateMatch) info.state = stateMatch[0].toLowerCase();

  // Gender
  const genderMatch = input.match(/\b(male|female)\b/i);
  if (genderMatch) info.gender = genderMatch[0].toLowerCase();

  // Date of Birth
  const dobMatch = input.match(/(\d{1,2}\/\d{1,2}\/\d{4}|\d{8})/);
  if (dobMatch) info.dateOfBirth = dobMatch[0];

  // Height
  const heightMatch = input.match(/(\d+'?\d+"?|\d+\s*(?:ft|feet))/i);
  if (heightMatch) info.height = heightMatch[0];

  // Weight
  const weightMatch = input.match(/(\d+)\s*(?:lbs?|pounds?)/i);
  if (weightMatch) info.weight = weightMatch[1] + ' lbs';

  // Coverage Amount
  const coverageMatch = input.match(/\b(\d{1,6})\b/);
  if (coverageMatch) info.coverageAmount = coverageMatch[0];

  return info;
}