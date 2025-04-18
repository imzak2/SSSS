import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Environment variables would typically be loaded from .env file
// For this demo, we'll use placeholder values that will be replaced
// when connecting to Supabase via the UI
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);