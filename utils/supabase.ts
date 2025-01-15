import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
)

export type Form = {
  id: string
  // Personal Information
  first_name: string
  middle_name?: string | null
  last_name: string
  dob: string
  ssn: string
  height: string
  weight: string
  email: string | null
  phone: string
  
  // Address
  address: string
  city: string
  state: string
  zip: string
  
  // Insurance Details
  coverage_amount: number
  status: 'pending' | 'completed' | 'submitted'
  tobacco_use: boolean
  medical_conditions: string | null
  
  // Beneficiary Information
  beneficiary_name: string
  beneficiary_relationship: string
  
  // Payment Information
  draft_day: number
  routing_number: string
  account_number: string
  
  // Additional Information
  has_drivers_license: boolean
  birth_country: string
  is_us_citizen: boolean
  
  // Medical Questions
  has_high_blood_pressure: boolean
  has_heart_disease: boolean
  has_diabetes: boolean
  
  // Existing Insurance
  has_existing_insurance: boolean
  will_replace_insurance: boolean
  has_pending_insurance: boolean
  
  // System Fields
  created_at: string
  updated_at: string
  created_by: string | null
  pdf_url: string | null
  notes: string | null
} 