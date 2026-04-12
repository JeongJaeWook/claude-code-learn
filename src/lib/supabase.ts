import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type Database = {
  public: {
    Tables: {
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          completed: boolean;
          completed_at: string | null;
        };
        Insert: {
          user_id: string;
          lesson_id: string;
          completed?: boolean;
          completed_at?: string | null;
        };
        Update: {
          completed?: boolean;
          completed_at?: string | null;
        };
      };
      user_notes: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          text_content: string;
          drawing_data: DrawingStroke[];
          updated_at: string;
        };
        Insert: {
          user_id: string;
          lesson_id: string;
          text_content?: string;
          drawing_data?: DrawingStroke[];
        };
        Update: {
          text_content?: string;
          drawing_data?: DrawingStroke[];
          updated_at?: string;
        };
      };
    };
  };
};

export type DrawingStroke = {
  points: { x: number; y: number }[];
  color: string;
  width: number;
};
