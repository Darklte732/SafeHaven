import { z } from 'zod';

// Types for the MooQuoting payload
export const MooQuotingSchema = z.object({
  fullName: z.string(),
  state: z.string().length(2),
  gender: z.enum(['Male', 'Female']),
  dob: z.string().regex(/^\d{8}$/), // MMDDYYYY format
  height: z.number(),
  weight: z.number(),
  phone: z.string().regex(/^\d{10}$/),
  nicotineUse: z.boolean(),
  heartConditions: z.boolean(),
  highBloodPressure: z.boolean(),
  cancerHistory: z.boolean(),
  strokeHistory: z.boolean(),
  diabetes: z.boolean(),
  lungConditions: z.boolean(),
  hospitalStays: z.boolean()
});

type MooQuotingPayload = z.infer<typeof MooQuotingSchema>;

interface QuoteResult {
  coverageAmount: number;
  monthlyRate: number;
  tier: 'Bronze' | 'Silver' | 'Gold';
}

interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 5000
};

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class MooQuotingError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly isRetryable: boolean = true
  ) {
    super(message);
    this.name = 'MooQuotingError';
  }
}

export async function getMooQuotes(
  data: MooQuotingPayload, 
  retryConfig: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<QuoteResult[]> {
  let attempt = 0;

  while (attempt < retryConfig.maxRetries) {
    try {
      // Validate the payload
      MooQuotingSchema.parse(data);

      const payload = {
        ...data,
        coverageAmount: '15000,20000,25000',
        // Transform booleans to strings as required by the API
        Heart_conditions: data.heartConditions.toString(),
        nicotineUse: data.nicotineUse ? 'Yes' : 'No',
        High_blood_pressure: data.highBloodPressure.toString(),
        cancer_history: data.cancerHistory.toString(),
        Stroke_TIA_history: data.strokeHistory.toString(),
        Diabetes: data.diabetes.toString(),
        lung_conditions: data.lungConditions.toString(),
        Hospital_stays: data.hospitalStays.toString()
      };

      const response = await fetch('https://ab96-45-177-2-86.ngrok-free.app/webhook/MooQuoting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new MooQuotingError(
          `HTTP error ${response.status}`,
          'HTTP_ERROR',
          response.status >= 500
        );
      }

      const result = await response.json();
      
      // Validate the response structure
      if (!result.rates || typeof result.rates !== 'object') {
        throw new MooQuotingError(
          'Invalid response format',
          'INVALID_RESPONSE',
          false
        );
      }

      // Transform the response into our standard format
      return [
        {
          coverageAmount: 15000,
          monthlyRate: parseFloat(result.rates.bronze) || 0,
          tier: 'Bronze'
        },
        {
          coverageAmount: 20000,
          monthlyRate: parseFloat(result.rates.silver) || 0,
          tier: 'Silver'
        },
        {
          coverageAmount: 25000,
          monthlyRate: parseFloat(result.rates.gold) || 0,
          tier: 'Gold'
        }
      ].filter(quote => quote.monthlyRate > 0); // Only return valid quotes
    } catch (error) {
      attempt++;
      
      if (error instanceof MooQuotingError && !error.isRetryable) {
        throw error;
      }

      if (attempt === retryConfig.maxRetries) {
        throw new MooQuotingError(
          'Max retries exceeded',
          'MAX_RETRIES_ERROR',
          false
        );
      }

      // Calculate delay with exponential backoff
      const backoffDelay = Math.min(
        retryConfig.baseDelay * Math.pow(2, attempt - 1),
        retryConfig.maxDelay
      );
      
      console.warn(`MooQuoting attempt ${attempt} failed, retrying in ${backoffDelay}ms`);
      await delay(backoffDelay);
    }
  }

  throw new MooQuotingError(
    'Failed to get quotes',
    'UNKNOWN_ERROR',
    false
  );
}