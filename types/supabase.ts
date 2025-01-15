export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      forms: {
        Row: {
          id: string
          first_name: string
          middle_name: string | null
          last_name: string
          dob: string
          ssn: string
          height: string
          weight: string
          email: string | null
          phone: string
          address: string
          city: string
          state: string
          zip: string
          coverage_amount: number
          status: 'pending' | 'completed' | 'submitted'
          tobacco_use: boolean
          medical_conditions: string | null
          beneficiary_name: string
          beneficiary_relationship: string
          draft_day: number
          routing_number: string
          account_number: string
          has_drivers_license: boolean
          birth_country: string
          is_us_citizen: boolean
          has_high_blood_pressure: boolean
          has_heart_disease: boolean
          has_diabetes: boolean
          has_existing_insurance: boolean
          will_replace_insurance: boolean
          has_pending_insurance: boolean
          created_at: string
          updated_at: string
          created_by: string | null
          pdf_url: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          first_name: string
          middle_name?: string | null
          last_name: string
          dob: string
          ssn: string
          height: string
          weight: string
          email?: string | null
          phone: string
          address: string
          city: string
          state: string
          zip: string
          coverage_amount: number
          status?: 'pending' | 'completed' | 'submitted'
          tobacco_use?: boolean
          medical_conditions?: string | null
          beneficiary_name: string
          beneficiary_relationship: string
          draft_day: number
          routing_number: string
          account_number: string
          has_drivers_license?: boolean
          birth_country?: string
          is_us_citizen?: boolean
          has_high_blood_pressure?: boolean
          has_heart_disease?: boolean
          has_diabetes?: boolean
          has_existing_insurance?: boolean
          will_replace_insurance?: boolean
          has_pending_insurance?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string | null
          pdf_url?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          first_name?: string
          middle_name?: string | null
          last_name?: string
          dob?: string
          ssn?: string
          height?: string
          weight?: string
          email?: string | null
          phone?: string
          address?: string
          city?: string
          state?: string
          zip?: string
          coverage_amount?: number
          status?: 'pending' | 'completed' | 'submitted'
          tobacco_use?: boolean
          medical_conditions?: string | null
          beneficiary_name?: string
          beneficiary_relationship?: string
          draft_day?: number
          routing_number?: string
          account_number?: string
          has_drivers_license?: boolean
          birth_country?: string
          is_us_citizen?: boolean
          has_high_blood_pressure?: boolean
          has_heart_disease?: boolean
          has_diabetes?: boolean
          has_existing_insurance?: boolean
          will_replace_insurance?: boolean
          has_pending_insurance?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string | null
          pdf_url?: string | null
          notes?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 