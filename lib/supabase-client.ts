import { createClient } from '@supabase/supabase-js';

// Only create the Supabase client on the client side
let supabase: ReturnType<typeof createClient>;

if (typeof window !== 'undefined') {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // Validate environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });
}

// Auth helper functions
export const getCurrentUser = async () => {
  if (!supabase) return null;

  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error getting user:', error.message);
      return null;
    }
    return user;
  } catch (error) {
    console.error('Unexpected error getting user:', error);
    return null;
  }
};

export const signIn = async (email: string, password: string) => {
  if (!supabase) throw new Error('Supabase client not initialized');

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('Sign in error:', error.message);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Unexpected sign in error:', error);
    throw error;
  }
};

export const signUp = async (email: string, password: string) => {
  if (!supabase) throw new Error('Supabase client not initialized');

  try {
    // Only get origin on client side
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    if (!origin) {
      throw new Error('Could not determine application origin');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          email,
        }
      }
    });
    
    if (error) {
      // Log detailed error information
      console.error('Sign up error details:', {
        message: error.message,
        status: error.status,
        name: error.name
      });
      throw error;
    }

    // Check if user was created but needs to confirm email
    if (data?.user?.identities?.length === 0) {
      throw new Error('Email already registered');
    }

    return data;
  } catch (error: any) {
    // Enhanced error logging
    console.error('Sign up error:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    throw error;
  }
};

export const signOut = async () => {
  if (!supabase) throw new Error('Supabase client not initialized');

  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error.message);
      throw error;
    }
  } catch (error) {
    console.error('Unexpected sign out error:', error);
    throw error;
  }
};

// Export supabase client for direct usage
export { supabase };