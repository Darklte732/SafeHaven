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
      admin_settings: {
        Row: {
          id: string
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          settings: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          settings?: Json
          created_at?: string
          updated_at?: string
        }
      }
      admin_kpi: {
        Row: {
          id: string
          metrics: Json
          summary: Json
          top_performers: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          metrics: Json
          summary: Json
          top_performers: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          metrics?: Json
          summary?: Json
          top_performers?: Json
          created_at?: string
          updated_at?: string
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
