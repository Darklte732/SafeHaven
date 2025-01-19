import { z } from 'zod';

// Types for the n8n webhook payload
export const N8NPayloadSchema = z.object({
  Heart_conditions: z.string(),
  nicotineUse: z.string(),
  High_blood_pressure: z.string(),
  cancer_history: z.string(),
  Stroke_TIA_history: z.string(),
  dob: z.string().regex(/^\d{8}$/), // MMDDYYYY format
  height: z.number(),
  Diabetes: z.string(),
  coverageAmount: z.string(),
  phone: z.string().regex(/^\d{10}$/),
  nicotine_use: z.string(),
  lung_conditions: z.string(),
  Hospital_stays: z.string(),
  state: z.string().length(2),
  gender: z.enum(['Male', 'Female']),
  weight: z.number()
});

type N8NPayload = z.infer<typeof N8NPayloadSchema>;

interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 5000   // 5 seconds
};

export class N8NIntegrationError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly isRetryable: boolean = true
  ) {
    super(message);
    this.name = 'N8NIntegrationError';
  }
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function sendToN8N(
  data: Partial<N8NPayload>,
  retryConfig: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<boolean> {
  let attempt = 0;
  
  // Transform boolean values to strings
  const transformedData = {
    ...data,
    Heart_conditions: String(data.Heart_conditions || false),
    High_blood_pressure: String(data.High_blood_pressure || false),
    cancer_history: String(data.cancer_history || false),
    Stroke_TIA_history: String(data.Stroke_TIA_history || false),
    Diabetes: String(data.Diabetes || false),
    nicotine_use: String(data.nicotine_use || false),
    lung_conditions: String(data.lung_conditions || false),
    Hospital_stays: String(data.Hospital_stays || false),
  };

  // Validate the payload
  try {
    N8NPayloadSchema.parse(transformedData);
  } catch (error) {
    console.error('Validation error:', error);
    throw new N8NIntegrationError(
      'Invalid payload data',
      'VALIDATION_ERROR',
      false
    );
  }

  while (attempt < retryConfig.maxRetries) {
    try {
      const response = await fetch('https://ab96-45-177-2-86.ngrok-free.app/webhook/MooQuoting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        throw new N8NIntegrationError(
          `HTTP error ${response.status}`,
          'HTTP_ERROR',
          response.status >= 500
        );
      }

      return true;
    } catch (error) {
      attempt++;
      
      if (error instanceof N8NIntegrationError && !error.isRetryable) {
        throw error;
      }

      if (attempt === retryConfig.maxRetries) {
        throw new N8NIntegrationError(
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
      
      console.warn(`Attempt ${attempt} failed, retrying in ${backoffDelay}ms`);
      await delay(backoffDelay);
    }
  }

  return false;
} 