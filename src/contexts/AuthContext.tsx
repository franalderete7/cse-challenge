'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClientComponentClient, SupabaseClient, User } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  supabase: SupabaseClient;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  signingOut: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();
  
  const supabase = createClientComponentClient();

  useEffect(() => {
    console.log('🔄 AuthProvider - Initializing');
    console.log('🔍 Current URL:', window.location.href);
    console.log('🔍 Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      HAS_SUPABASE_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    });
    
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('📱 AuthProvider - Initial session check:', {
        hasSession: !!session,
        userId: session?.user?.id,
        email: session?.user?.email
      });
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔄 AuthProvider - Auth state changed:', {
        event,
        hasSession: !!session,
        userId: session?.user?.id,
        email: session?.user?.email
      });
      
      // Update user state with the current session
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Reset signing out state when auth state changes
      if (event === 'SIGNED_OUT') {
        setSigningOut(false);
      }
    });

    return () => {
      console.log('🧹 AuthProvider - Cleaning up subscription');
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const signInWithGoogle = async () => {
    console.log('🔑 AuthProvider - Starting Google sign in');
    try {
      // Always use the current origin in browser environments
      const redirectUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/auth/callback`
        : '/auth/callback'; // Fallback, should not reach this in browser
        
      console.log('🔗 AuthProvider - Using redirect URL:', redirectUrl);
      console.log('🔗 AuthProvider - Window location origin:', window.location.origin);
      console.log('🔗 AuthProvider - Full redirect URL breakdown:', {
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        port: window.location.port,
        origin: window.location.origin,
        fullRedirectUrl: redirectUrl
      });
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('❌ AuthProvider - Google sign in error:', error);
        throw error;
      }

      console.log('✅ AuthProvider - Google sign in initiated:', data);
    } catch (error) {
      console.error('❌ AuthProvider - Unexpected error during Google sign in:', error);
      throw error;
    }
  };

  const signOut = async () => {
    console.log('🔑 AuthProvider - Starting sign out');
    setSigningOut(true);
    
    try {
      // Call client-side signout
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ AuthProvider - Client-side sign out failed:', error);
        setSigningOut(false);
      } else {
        console.log('✅ AuthProvider - Client-side sign out successful');
        // Clear user state immediately for better UX
        setUser(null);
        
        // Small delay for visual feedback
        setTimeout(() => {
          setSigningOut(false);
          // Navigate to home page
          router.push('/');
        }, 500);
      }
    } catch (error) {
      console.error('❌ AuthProvider - Unexpected error in signOut function:', error);
      setSigningOut(false);
      router.push('/');
    }
  };

  return (
    <AuthContext.Provider value={{ user, supabase, signInWithGoogle, signOut, loading, signingOut }}>
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