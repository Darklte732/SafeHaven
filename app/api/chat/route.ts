import { NextResponse } from 'next/server';

interface UserInformation {
  state?: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;
  height?: string | null;
  weight?: string | null;
  coverageAmount?: string | null;
  health?: HealthQuestions;
  error?: string;
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

function parseUserInfo(input: string): UserInformation {
  const info: UserInformation = {};
  
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

export async function POST(req: Request) {
  try {
    const { messages, userInfo } = await req.json();
    const lastMessage = messages[messages.length - 1];

    // Handle user information input
    if (userInfo?.isUserInfo) {
      const info = parseUserInfo(userInfo.rawInput);
      
      // Check if there are any validation errors
      if (info.error) {
        return NextResponse.json({
          role: 'assistant',
          content: `I noticed some issues with the information provided:\n${info.error}\n\nPlease provide the correct information and I'll be happy to help you find the best coverage options.`
        });
      }

      // Check for missing required fields
      const requiredFields = ['state', 'gender', 'dateOfBirth', 'height', 'weight', 'coverageAmount'] as const;
      type RequiredField = typeof requiredFields[number];
      const missingFields = requiredFields.filter(field => !info[field as keyof UserInformation]);
      
      if (missingFields.length > 0) {
        return NextResponse.json({
          role: 'assistant',
          content: `I still need some information to provide accurate quotes. Please provide your:\n${missingFields.join(', ')}`
        });
      }

      // If all basic info is provided, proceed to health questions if not already answered
      if (!info.health || Object.values(info.health).every(v => !v)) {
        return NextResponse.json({
          role: 'assistant',
          content: `Thank you for providing your basic information. Now, I need to ask you a few health questions to find the best coverage options. Please answer Yes or No to each:\n\n` +
                  `1. Do you have any heart conditions or stints?\n` +
                  `2. Any lung conditions?\n` +
                  `3. High blood pressure?\n` +
                  `4. Any history of cancer?\n` +
                  `5. Do you have diabetes? If yes, is it Type 1 or Type 2, and do you use insulin?\n` +
                  `6. Any history of stroke?\n` +
                  `7. Any hospital stays in the last 12 months?`
        });
      }

      // If we have health information, determine carrier eligibility
      const eligibility = determineCarrierEligibility(info, info.health);
      const eligibleCarriers = Object.entries(eligibility)
        .filter(([_, eligible]) => eligible)
        .map(([carrier, _]) => carrier.replace(/([A-Z])/g, ' $1').trim());

      return NextResponse.json({
        role: 'assistant',
        content: `Based on your health profile, I've identified the following carriers that can offer you the best coverage:\n\n` +
                `${eligibleCarriers.length > 0 ? eligibleCarriers.join('\n') : 'We may need to explore additional options.'}\n\n` +
                `I'll now search for the best rates from these carriers. One moment please...`,
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
      content: 'I need some more information to provide accurate quotes. Please provide:\n' +
               '- State (NJ, NY, or PA)\n' +
               '- Gender (male or female)\n' +
               '- Date of Birth (MM/DD/YYYY)\n' +
               '- Height (e.g., 5\'10" or 70 inches)\n' +
               '- Weight (in pounds)\n' +
               '- Coverage Amount ($5,000-$25,000)'
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}