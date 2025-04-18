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
      passwords: {
        Row: {
          id: string
          user_id: string
          title: string
          website_url: string | null
          username: string
          encrypted_password: string
          iv: string
          strength_score: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          website_url?: string | null
          username: string
          encrypted_password: string
          iv: string
          strength_score: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          website_url?: string | null
          username?: string
          encrypted_password?: string
          iv?: string
          strength_score?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      vulnerability_scans: {
        Row: {
          id: string
          user_id: string
          target: string
          scan_type: string
          status: string
          results: Json | null
          started_at: string
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          target: string
          scan_type: string
          status: string
          results?: Json | null
          started_at?: string
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          target?: string
          scan_type?: string
          status?: string
          results?: Json | null
          started_at?: string
          completed_at?: string | null
          created_at?: string
        }
      }
      ctf_challenges: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          difficulty: string
          points: number
          flag: string
          is_active: boolean
          hints: Json | null
          created_at: string
          created_by: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          difficulty: string
          points: number
          flag: string
          is_active?: boolean
          hints?: Json | null
          created_at?: string
          created_by: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          difficulty?: string
          points?: number
          flag?: string
          is_active?: boolean
          hints?: Json | null
          created_at?: string
          created_by?: string
        }
      }
      ctf_submissions: {
        Row: {
          id: string
          user_id: string
          challenge_id: string
          is_correct: boolean
          submitted_flag: string
          submitted_at: string
        }
        Insert: {
          id?: string
          user_id: string
          challenge_id: string
          is_correct: boolean
          submitted_flag: string
          submitted_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          challenge_id?: string
          is_correct?: boolean
          submitted_flag?: string
          submitted_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          display_name: string | null
          avatar_url: string | null
          is_admin: boolean
          two_factor_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          display_name?: string | null
          avatar_url?: string | null
          is_admin?: boolean
          two_factor_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          display_name?: string | null
          avatar_url?: string | null
          is_admin?: boolean
          two_factor_enabled?: boolean
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