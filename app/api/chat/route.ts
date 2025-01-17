import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

interface UserInformation {
  state?: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;
  height?: string | null;
  weight?: string | null;
  coverageAmount?: string | null;
  health?: HealthQuestions;
  error?: string;
  // Additional fields for lead capture
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  zipCode?: string | null;
  tobaccoUse?: boolean;
  bestTimeToCall?: string | null;
  preferredContactMethod?: 'phone' | 'email' | 'text' | null;
  leadSource?: string;
  ipAddress?: string;
  complete?: 'complete';
}

interface HealthQuestions {
  medications: string[];
  heartConditions: boolean;
  heartStints: boolean;
  lungConditions: boolean;
  highBloodPressure: boolean;
  cancer: boolean;
  diabetes: boolean;
  diabetesType?: 'type1' | 'type2';
  insulinUse?: boolean;
  stroke: boolean;
  hospitalStays: boolean;
}

interface CarrierEligibility {
  mutualOfOmaha: boolean;
  americanAmicable: boolean;
  gtl: boolean;
  reason?: string;
}

function determineCarrierEligibility(info: UserInformation, health: HealthQuestions): CarrierEligibility {
  const eligibility: CarrierEligibility = {
    mutualOfOmaha: true,
    americanAmicable: true,
    gtl: true
  };

  // Mutual of Omaha - Strictest health requirements
  if (health.heartConditions || health.stroke || health.cancer || 
      (health.diabetes && health.insulinUse) || health.lungConditions) {
    eligibility.mutualOfOmaha = false;
  }

  // American Amicable - Moderate health requirements
  if (health.heartStints || health.stroke || 
      (health.cancer && health.hospitalStays) || 
      (health.diabetes && health.diabetesType === 'type1')) {
    eligibility.americanAmicable = false;
  }

  // GTL - Most lenient of the three
  if ((health.heartConditions && health.hospitalStays) || 
      (health.stroke && health.hospitalStays) || 
      (health.cancer && !health.hospitalStays)) {
    eligibility.gtl = false;
  }

  return eligibility;
}

async function saveToSupabase(info: UserInformation): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('insurance_leads')
      .insert([
        {
          first_name: info.firstName,
          last_name: info.lastName,
          email: info.email,
          phone: info.phone,
          address: info.address,
          city: info.city,
          state: info.state,
          zip_code: info.zipCode,
          gender: info.gender,
          date_of_birth: info.dateOfBirth,
          height: info.height,
          weight: info.weight,
          coverage_amount: info.coverageAmount,
          tobacco_use: info.tobaccoUse,
          best_time_to_call: info.bestTimeToCall,
          preferred_contact_method: info.preferredContactMethod,
          lead_source: info.leadSource || 'website_chat',
          ip_address: info.ipAddress,
          health_conditions: info.health,
          created_at: new Date().toISOString(),
          status: 'new',
          carrier_eligibility: determineCarrierEligibility(info, info.health || defaultHealthQuestions)
        }
      ])
      .select();

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error saving to Supabase:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to save lead information' 
    };
  }
}

const defaultHealthQuestions: HealthQuestions = {
  medications: [],
  heartConditions: false,
  heartStints: false,
  lungConditions: false,
  highBloodPressure: false,
  cancer: false,
  diabetes: false,
  stroke: false,
  hospitalStays: false
};

function parseUserInfo(input: string, existingInfo?: UserInformation): UserInformation {
  const info: UserInformation = existingInfo || {};
  
  // State
  const stateMatch = input.match(/(?:new jersey|nj|new york|ny|pennsylvania|pa)/i);
  if (stateMatch) {
    const state = stateMatch[0].toLowerCase();
    info.state = state === 'nj' ? 'new jersey' : 
                 state === 'ny' ? 'new york' : 
                 state === 'pa' ? 'pennsylvania' : state;
  }

  // Gender
  const genderMatch = input.match(/\b(male|female)\b/i);
  if (genderMatch) info.gender = genderMatch[0].toLowerCase();

  // Date of Birth - Support multiple formats
  const dobMatch = input.match(/(\d{2})[-/]?(\d{2})[-/]?(\d{4})|(\d{8})/);
  if (dobMatch) {
    if (dobMatch[4]) { // Format: MMDDYYYY
      const dob = dobMatch[4];
      const month = dob.slice(0, 2);
      const day = dob.slice(2, 4);
      const year = dob.slice(4);
      info.dateOfBirth = `${month}/${day}/${year}`;
    } else { // Format: MM/DD/YYYY or MM-DD-YYYY
      info.dateOfBirth = `${dobMatch[1]}/${dobMatch[2]}/${dobMatch[3]}`;
    }
    
    // Validate date
    const date = new Date(info.dateOfBirth);
    if (isNaN(date.getTime())) {
      info.dateOfBirth = null;
    } else {
      const age = calculateAge(date);
      if (age < 18 || age > 85) {
        info.dateOfBirth = null;
        info.error = `Age ${age} is outside our coverage range (18-85)`;
      }
    }
  }

  // Height (format: 5'10" or 5ft10 or 70)
  const heightMatch = input.match(/(\d+)'(\d+)"|(\d+)\s*(?:ft|feet)\s*(\d+)|(\d+)/i);
  if (heightMatch) {
    if (heightMatch[1] && heightMatch[2]) { // Format: 5'10"
      info.height = `${heightMatch[1]}'${heightMatch[2]}"`;
    } else if (heightMatch[3] && heightMatch[4]) { // Format: 5ft10
      info.height = `${heightMatch[3]}'${heightMatch[4]}"`;
    } else if (heightMatch[5]) { // Format: 70 (inches)
      const feet = Math.floor(Number(heightMatch[5]) / 12);
      const inches = Number(heightMatch[5]) % 12;
      info.height = `${feet}'${inches}"`;
    }
  }

  // Weight (with validation)
  const weightMatch = input.match(/(\d+)\s*(?:lbs?|pounds?)?/i);
  if (weightMatch) {
    const weight = Number(weightMatch[1]);
    if (weight >= 80 && weight <= 400) {
      info.weight = `${weight} lbs`;
    } else {
      info.weight = null;
      info.error = (info.error || '') + 
        `\nWeight ${weight} lbs is outside our coverage range (80-400 lbs)`;
    }
  }

  // Coverage Amount (with formatting)
  const coverageMatch = input.match(/\$?\s*(\d{1,6}(?:,\d{3})*)/);
  if (coverageMatch) {
    const amount = Number(coverageMatch[1].replace(/,/g, ''));
    if (amount >= 5000 && amount <= 25000) {
      info.coverageAmount = `$${amount.toLocaleString()}`;
    } else {
      info.coverageAmount = null;
      info.error = (info.error || '') + 
        `\nCoverage amount $${amount} is outside our range ($5,000-$25,000)`;
    }
  }

  // Add health information parsing
  const healthMatch = input.toLowerCase();
  const health: HealthQuestions = {
    medications: [],
    heartConditions: healthMatch.includes('heart') && !healthMatch.includes('no heart'),
    heartStints: healthMatch.includes('stint') && !healthMatch.includes('no stint'),
    lungConditions: healthMatch.includes('lung') && !healthMatch.includes('no lung'),
    highBloodPressure: healthMatch.includes('pressure') && !healthMatch.includes('no pressure'),
    cancer: healthMatch.includes('cancer') && !healthMatch.includes('no cancer'),
    diabetes: healthMatch.includes('diabetes') && !healthMatch.includes('no diabetes'),
    stroke: healthMatch.includes('stroke') && !healthMatch.includes('no stroke'),
    hospitalStays: healthMatch.includes('hospital') && !healthMatch.includes('no hospital')
  };

  if (health.diabetes) {
    health.diabetesType = healthMatch.includes('type 1') ? 'type1' : 
                         healthMatch.includes('type 2') ? 'type2' : undefined;
    health.insulinUse = healthMatch.includes('insulin');
  }

  info.health = health;

  // Additional field parsing
  const nameMatch = input.match(/(?:name is|call me|i am) ([a-zA-Z]+)(?: ([a-zA-Z]+))?/i);
  if (nameMatch) {
    info.firstName = nameMatch[1];
    info.lastName = nameMatch[2] || null;
  }

  const emailMatch = input.match(/\b[\w\.-]+@[\w\.-]+\.\w+\b/);
  if (emailMatch) info.email = emailMatch[0];

  const phoneMatch = input.match(/\b(\d{3}[-.]?\d{3}[-.]?\d{4})\b/);
  if (phoneMatch) info.phone = phoneMatch[1].replace(/[-.]/, '');

  const zipMatch = input.match(/\b\d{5}(?:-\d{4})?\b/);
  if (zipMatch) info.zipCode = zipMatch[0];

  const tobaccoMatch = input.toLowerCase();
  if (tobaccoMatch.includes('tobacco') || tobaccoMatch.includes('smoke')) {
    info.tobaccoUse = !tobaccoMatch.includes('no');
  }

  return info;
}

function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

interface QuestionState {
  currentQuestion: 'name' | 'email' | 'phone' | 'state' | 'gender' | 'dob' | 'height' | 'weight' | 'coverage' | 'health' | 'complete';
  data: UserInformation;
}

function getNextQuestion(info: UserInformation): { question: string; field: keyof UserInformation } {
  if (!info.firstName || !info.lastName) {
    return {
      question: "Let's get started! What is your first and last name?",
      field: 'firstName'
    };
  }
  if (!info.email) {
    return {
      question: `Thanks ${info.firstName}! What's your email address?`,
      field: 'email'
    };
  }
  if (!info.phone) {
    return {
      question: "Great! What's the best phone number to reach you?",
      field: 'phone'
    };
  }
  if (!info.state) {
    return {
      question: "Which state do you live in? (NJ, NY, or PA)",
      field: 'state'
    };
  }
  if (!info.gender) {
    return {
      question: "What is your gender? (male or female)",
      field: 'gender'
    };
  }
  if (!info.dateOfBirth) {
    return {
      question: "What is your date of birth? (MM/DD/YYYY)",
      field: 'dateOfBirth'
    };
  }
  if (!info.height) {
    return {
      question: "What is your height? (e.g., 5'10\" or 70 inches)",
      field: 'height'
    };
  }
  if (!info.weight) {
    return {
      question: "What is your weight in pounds?",
      field: 'weight'
    };
  }
  if (!info.coverageAmount) {
    return {
      question: "How much coverage are you looking for? ($5,000-$25,000)",
      field: 'coverageAmount'
    };
  }
  if (!info.health || Object.values(info.health).every(v => !v)) {
    return {
      question: `Perfect! Now, I need to ask you a few health questions to find the best coverage options.\n\nPlease answer Yes or No to each:\n\n` +
                `1. Do you have any heart conditions or stints?\n` +
                `2. Any lung conditions?\n` +
                `3. High blood pressure?\n` +
                `4. Any history of cancer?\n` +
                `5. Do you have diabetes? If yes, is it Type 1 or Type 2, and do you use insulin?\n` +
                `6. Any history of stroke?\n` +
                `7. Any hospital stays in the last 12 months?\n` +
                `8. Do you use any tobacco products?`,
      field: 'health'
    };
  }
  return {
    question: 'complete',
    field: 'complete'
  };
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages, userInfo } = await req.json();
    const lastMessage = messages[messages.length - 1] as Message;
    const previousMessages = messages.slice(0, -1) as Message[];

    // Get the last assistant message to track conversation state
    const lastAssistantMessage = messages
      .slice()
      .reverse()
      .find((m: Message) => m.role === 'assistant');

    // Handle user information input
    if (userInfo?.isUserInfo) {
      // Get IP address from request headers
      const forwarded = req.headers.get("x-forwarded-for");
      const ip = forwarded ? forwarded.split(/, /)[0] : req.headers.get("x-real-ip");
      
      // Parse user info while maintaining context from previous messages
      const existingInfo: UserInformation = {};
      for (const msg of previousMessages) {
        if (msg.role === 'user') {
          Object.assign(existingInfo, parseUserInfo(msg.content, existingInfo));
        }
      }
      const info = parseUserInfo(userInfo.rawInput, existingInfo);
      info.ipAddress = ip || undefined;
      
      // Check if there are any validation errors
      if (info.error) {
        return NextResponse.json({
          role: 'assistant',
          content: `I noticed some issues with the information provided:\n${info.error}\n\nPlease provide the correct information and I'll be happy to help you find the best coverage options.`
        });
      }

      // Get next question based on missing information
      const { question, field } = getNextQuestion(info);
      
      // If all information is collected
      if (field === 'complete') {
        // Save to Supabase
        const saveResult = await saveToSupabase(info);
        if (!saveResult.success) {
          console.error('Failed to save lead:', saveResult.error);
        }

        // Determine carrier eligibility
        const eligibility = determineCarrierEligibility(info, info.health!);
        const eligibleCarriers = Object.entries(eligibility)
          .filter(([_, eligible]) => eligible)
          .map(([carrier, _]) => carrier.replace(/([A-Z])/g, ' $1').trim());

        return NextResponse.json({
          role: 'assistant',
          content: `Thank you for providing all the information, ${info.firstName}! Based on your profile, I've identified the following carriers that can offer you the best coverage:\n\n` +
                  `${eligibleCarriers.length > 0 ? eligibleCarriers.join('\n') : 'We may need to explore additional options.'}\n\n` +
                  `I'll now search for the best rates from these carriers. One of our licensed agents will contact you ${info.preferredContactMethod ? `via ${info.preferredContactMethod}` : ''} with personalized quotes shortly.`,
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

      // Check if we should skip the current question based on the last response
      if (lastAssistantMessage?.content === question) {
        const nextInfo = parseUserInfo(lastMessage.content, info);
        const nextQuestion = getNextQuestion(nextInfo);
        return NextResponse.json({
          role: 'assistant',
          content: nextQuestion.question
        });
      }

      // Return next question
      return NextResponse.json({
        role: 'assistant',
        content: question
      });
    }

    // Default response for initial message
    return NextResponse.json({
      role: 'assistant',
      content: "Let's get started! What is your first and last name?"
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}