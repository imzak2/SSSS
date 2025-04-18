import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';
import LoadingScreen from '../components/common/LoadingScreen';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    needsTwoFactor?: boolean;
  }>;
  signUp: (email: string, password: string, displayName: string) => Promise<{
    error: Error | null;
    needsEmailVerification?: boolean;
  }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (password: string) => Promise<{ error: Error | null }>;
  setupTwoFactor: () => Promise<{
    error: Error | null;
    qrCode?: string;
    secret?: string;
  }>;
  verifyTwoFactor: (token: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // If we have a user, check if they're an admin
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
      
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // If we have a user, check if they're an admin
        if (session?.user) {
          checkAdminStatus(session.user.id);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Check if user has admin role
  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('is_admin')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        return;
      }
      
      setIsAdmin(data?.is_admin || false);
    } catch (error) {
      console.error('Error in admin check:', error);
      setIsAdmin(false);
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Check if 2FA is required
      if (data?.user) {
        const { data: profileData } = await supabase
          .from('user_profiles')
          .select('two_factor_enabled')
          .eq('user_id', data.user.id)
          .single();
          
        if (profileData?.two_factor_enabled) {
          // Sign out and redirect to 2FA verification
          await supabase.auth.signOut();
          return { error: null, needsTwoFactor: true };
        }
      }
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Create user profile
      if (data?.user) {
        await supabase.from('user_profiles').insert({
          user_id: data.user.id,
          display_name: displayName,
          is_admin: false,
          two_factor_enabled: false,
        });
      }
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // Update password
  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // Setup two-factor authentication
  const setupTwoFactor = async () => {
    try {
      // This is a placeholder - in a real app, you would use a library like otplib
      // to generate a secret and QR code. For this demo, we'll simulate it.
      const secret = 'EXAMPLESECRETKEY';
      const qrCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAABA0lEQVR42uyYMQ7DMAwDXf3/p7OXoUMdSnYMZNFNpNucKBGy/Hpd13Vd13Vd17WiReQWqIbYEFmCf8S2wNmDc5Di4SsQYmJboAAZQBMMQA7M6TDqYQHk1JD0QQE9QU4N8fXoaBfSkDHIGE7NgAlSDIk4xCOk2IEZBBPENqCZYdXA2oJwgpyA+uCfg1wfYW9hkAeJ3jYgDQYwlzD6Rg9kD/0aTCbYW/RtNrCAzQaRgJiATDIB2aDj+AgOaQ2OBHQUYgLjGFRHHg6JCJQU5DtETjJBckBMsG8jJ5BbIDMkDe0EWoNhGLFB9pFdiDHEjgCtQfJQ8vCeYChh1cB+jOMbfJzgXl9g+HMAAAAASUVORK5CYII=';
      
      // Update user profile with 2FA enabled flag
      if (user) {
        await supabase
          .from('user_profiles')
          .update({ two_factor_enabled: true })
          .eq('user_id', user.id);
      }
      
      return { error: null, qrCode, secret };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // Verify two-factor authentication
  const verifyTwoFactor = async (token: string) => {
    try {
      // This is a placeholder - in a real app, you would verify the token
      // against the user's secret using a library like otplib.
      // For this demo, we'll simulate it and accept any 6-digit token.
      const isValid = /^\d{6}$/.test(token);
      
      if (!isValid) {
        throw new Error('Invalid 2FA token');
      }
      
      // In a real app, you would sign in the user after successful 2FA
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const contextValue = {
    user,
    session,
    isLoading,
    isAdmin,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    setupTwoFactor,
    verifyTwoFactor,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}