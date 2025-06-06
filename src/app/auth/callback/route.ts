import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  console.log('🔄 Auth callback - Starting');
  const requestUrl = new URL(request.url);
  console.log('🔍 Auth callback - URL:', requestUrl.toString());
  
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const error_description = requestUrl.searchParams.get('error_description');

  if (error) {
    console.error('❌ Auth callback - Error from provider:', {
      error,
      description: error_description
    });
    return NextResponse.redirect(new URL('/?error=auth_error', requestUrl.origin));
  }

  if (code) {
    console.log('🔑 Auth callback - Received code:', code.substring(0, 8) + '...');
    
    try {
      // Create a supabase client with cookies for Next.js 15 compatibility
      const cookieStore = cookies();
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
      
      console.log('🔄 Auth callback - Exchanging code for session');
      
      // Exchange the code for a session
      const { data: { session }, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error('❌ Auth callback - Error exchanging code:', {
          error: exchangeError.message,
          details: exchangeError
        });
        return NextResponse.redirect(new URL('/?error=auth_exchange_error', requestUrl.origin));
      }

      if (!session) {
        console.error('❌ Auth callback - No session created');
        return NextResponse.redirect(new URL('/?error=no_session_created', requestUrl.origin));
      }

      console.log('✅ Auth callback - Session created successfully', {
        userId: session.user.id,
        email: session.user.email,
        userMetadata: session.user.user_metadata
      });

      // Check if user was created in our custom users table
      console.log('🔍 Auth callback - Checking if user exists in users table');
      
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileError) {
        console.error('❌ Auth callback - Error checking user profile:', {
          error: profileError.message,
          details: profileError,
          code: profileError.code
        });
      } else if (userProfile) {
        console.log('✅ Auth callback - User profile found in users table:', {
          id: userProfile.id,
          name: userProfile.name,
          email: userProfile.email,
          created_at: userProfile.created_at
        });
      } else {
        console.log('⚠️ Auth callback - No user profile found in users table - trigger may not have fired');
      }

      // Add a small delay to allow database trigger to complete
      console.log('⏳ Auth callback - Waiting 2 seconds for database trigger to complete...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check again after delay
      const { data: userProfileAfterDelay, error: profileAfterDelayError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileAfterDelayError) {
        console.error('❌ Auth callback - Still no user profile after delay:', {
          error: profileAfterDelayError.message,
          details: profileAfterDelayError,
          code: profileAfterDelayError.code
        });
        
        // Try to manually create the user profile as fallback
        console.log('🔧 Auth callback - Attempting manual user creation as fallback');
        const { data: manualUser, error: manualError } = await supabase
          .from('users')
          .insert({
            id: session.user.id,
            name: session.user.user_metadata?.full_name || 
                  session.user.user_metadata?.name || 
                  session.user.email?.split('@')[0] || 
                  'Unknown User',
            email: session.user.email!,
            created_at: new Date().toISOString()
          })
          .select()
          .single();
          
        if (manualError) {
          console.error('❌ Auth callback - Manual user creation failed:', {
            error: manualError.message,
            details: manualError,
            code: manualError.code
          });
        } else {
          console.log('✅ Auth callback - Manual user creation successful:', manualUser);
        }
      } else {
        console.log('✅ Auth callback - User profile confirmed after delay:', {
          id: userProfileAfterDelay.id,
          name: userProfileAfterDelay.name,
          email: userProfileAfterDelay.email,
          created_at: userProfileAfterDelay.created_at
        });
      }

      console.log('🏠 Auth callback - Redirecting to home page');
      return NextResponse.redirect(new URL('/', requestUrl.origin));
    } catch (error) {
      console.error('❌ Auth callback - Unexpected error:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        error
      });
      return NextResponse.redirect(new URL('/?error=auth_unexpected_error', requestUrl.origin));
    }
  }

  console.log('❌ Auth callback - No code provided');
  return NextResponse.redirect(new URL('/?error=no_auth_code', requestUrl.origin));
} 