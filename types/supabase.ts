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
      users: {
        Row: {
          id: string
          email: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          role: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      kpi_metrics: {
        Row: {
          id: string
          name: string
          value: number
          period: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          value: number
          period: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          value?: number
          period?: string
          created_at?: string
        }
      }
      kpi_history: {
        Row: {
          id: string
          metric_id: string
          value: number
          timestamp: string
        }
        Insert: {
          id?: string
          metric_id: string
          value: number
          timestamp?: string
        }
        Update: {
          id?: string
          metric_id?: string
          value?: number
          timestamp?: string
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
