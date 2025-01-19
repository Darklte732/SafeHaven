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

// Add webhook configuration
interface WebhookConfig {
  url: string;
  authToken?: string;
  workflowId?: string;
}

const DEFAULT_WEBHOOK_CONFIG: WebhookConfig = {
  url: process.env.N8N_WEBHOOK_URL || 'https://a42e-45-177-2-86.ngrok-free.app/webhook/MooQuoting',
  authToken: process.env.N8N_AUTH_TOKEN || '',
  workflowId: process.env.N8N_WORKFLOW_ID || ''
};

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
  retryConfig: RetryConfig = DEFAULT_RETRY_CONFIG,
  webhookConfig: WebhookConfig = DEFAULT_WEBHOOK_CONFIG
): Promise<QuoteResult[]> {
  let attempt = 0;

  while (attempt < retryConfig.maxRetries) {
    try {
      // Validate the payload
      MooQuotingSchema.parse(data);

      // Transform data for n8n webhook
      const payload = {
        workflowId: webhookConfig.workflowId,
        timestamp: new Date().toISOString(),
        data: {
          fullName: data.fullName,
          state: data.state,
          gender: data.gender,
          dob: data.dob,
          height: data.height.toString(),
          weight: data.weight.toString(),
          phone: data.phone,
          coverageAmount: '15000,20000,25000',
          nicotineUse: data.nicotineUse ? 'Yes' : 'No',
          heartConditions: data.heartConditions ? 'Yes' : 'No',
          highBloodPressure: data.highBloodPressure ? 'Yes' : 'No',
          cancerHistory: data.cancerHistory ? 'Yes' : 'No',
          strokeHistory: data.strokeHistory ? 'Yes' : 'No',
          diabetes: data.diabetes ? 'Yes' : 'No',
          lungConditions: data.lungConditions ? 'Yes' : 'No',
          hospitalStays: data.hospitalStays ? 'Yes' : 'No'
        }
      };

      const response = await fetch(webhookConfig.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(webhookConfig.authToken && { 'Authorization': `Bearer ${webhookConfig.authToken}` }),
          ...(webhookConfig.workflowId && { 'X-Workflow-ID': webhookConfig.workflowId })
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new MooQuotingError(
          `Webhook error: ${response.status} - ${errorText}`,
          response.status === 401 ? 'AUTH_ERROR' : 
          response.status === 422 ? 'VALIDATION_ERROR' : 
          'HTTP_ERROR',
          response.status >= 500
        );
      }

      const result = await response.json();
      
      if (!result.rates || typeof result.rates !== 'object') {
        throw new MooQuotingError(
          'Invalid response format from webhook',
          'INVALID_RESPONSE',
          false
        );
      }

      return [
        {
          coverageAmount: 15000,
          monthlyRate: parseFloat(result.rates.bronze) || 0,
          tier: 'Bronze' as const
        },
        {
          coverageAmount: 20000,
          monthlyRate: parseFloat(result.rates.silver) || 0,
          tier: 'Silver' as const
        },
        {
          coverageAmount: 25000,
          monthlyRate: parseFloat(result.rates.gold) || 0,
          tier: 'Gold' as const
        }
      ].filter(quote => quote.monthlyRate > 0);
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