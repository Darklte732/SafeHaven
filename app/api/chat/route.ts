import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

interface UserInformation {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  dateOfBirth?: string;
  gender?: string;
  height?: string;
  weight?: string;
  tobaccoUse?: boolean;
  coverageAmount?: number;
  bestTimeToCall?: string;
  preferredContactMethod?: string;
  leadSource?: string;
  ipAddress?: string;
  isUserInfo?: boolean;
  rawInput?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages, userInfo } = await req.json();
    const lastMessage = messages[messages.length - 1];
    const previousMessages = messages.slice(0, -1);
    const lastAssistantMessage = previousMessages.reverse().find((m: Message) => m.role === 'assistant')?.content || '';

    let response = '';
    let currentUserInfo: UserInformation = {};
    
    // Extract user information from the message
    if (userInfo?.isUserInfo && userInfo.rawInput) {
      const input = userInfo.rawInput.toLowerCase();
      
      // Name extraction
      const nameMatch = input.match(/(?:my name is|i am|i'm)\s+([a-z]+(?:\s+[a-z]+)?)/i);
      if (nameMatch) {
        const fullName = nameMatch[1].trim().split(' ');
        currentUserInfo.firstName = fullName[0];
        if (fullName.length > 1) {
          currentUserInfo.lastName = fullName[1];
        }
      }
      
      // Email extraction
      const emailMatch = input.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i);
      if (emailMatch) {
        currentUserInfo.email = emailMatch[1];
      }
      
      // Phone extraction
      const phoneMatch = input.match(/(\d{3}[-.]?\d{3}[-.]?\d{4})/);
      if (phoneMatch) {
        currentUserInfo.phone = phoneMatch[1];
      }
    }

    // Determine next question based on conversation state
    if (messages.length === 1) {
      response = "Let's get started! What is your first and last name? Example: John Smith";
    }
    else if (lastAssistantMessage.includes("What is your first and last name?")) {
      const nameParts = lastMessage.content.trim().split(' ');
      if (nameParts.length >= 2) {
        currentUserInfo.firstName = nameParts[0];
        currentUserInfo.lastName = nameParts.slice(1).join(' ');
        response = `Nice to meet you ${currentUserInfo.firstName}! What's your email address?`;
      } else {
        response = "I need both your first and last name. Please provide them both (Example: John Smith)";
      }
    }
    else if (lastAssistantMessage.includes("What's your email address?")) {
      const emailMatch = lastMessage.content.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i);
      if (emailMatch) {
        currentUserInfo.email = emailMatch[1];
        response = "Great! What's your phone number?";
      } else {
        response = "I need a valid email address. Please provide it in the format: example@domain.com";
      }
    }
    else if (lastAssistantMessage.includes("What's your phone number?")) {
      const phoneMatch = lastMessage.content.match(/(\d{3}[-.]?\d{3}[-.]?\d{4})/);
      if (phoneMatch) {
        currentUserInfo.phone = phoneMatch[1];
        response = "Perfect! What state do you live in? (Please use the two-letter abbreviation, e.g., NY)";
      } else {
        response = "I need a valid phone number. Please provide it in the format: 123-456-7890";
      }
    }
    else {
      response = "I'm here to help you find the right insurance coverage. What would you like to know?";
    }

    return NextResponse.json({
      content: response,
      userInfo: currentUserInfo,
      error: null,
      details: null
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({
      content: "I apologize, but I encountered an error. Please try again.",
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}