import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export class UserService {
  private static supabase = createClientComponentClient();

  // Get the current user's profile
  static async getCurrentUserProfile(): Promise<UserProfile | null> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      
      if (!user) {
        return null;
      }

      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Unexpected error fetching user profile:', error);
      return null;
    }
  }

  // Update user profile
  static async updateUserProfile(updates: Partial<Pick<UserProfile, 'name'>>): Promise<boolean> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No authenticated user');
      }

      const { error } = await this.supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        console.error('Error updating user profile:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Unexpected error updating user profile:', error);
      return false;
    }
  }

  // Get user profile by ID (useful for admin features)
  static async getUserProfileById(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile by ID:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Unexpected error fetching user profile by ID:', error);
      return null;
    }
  }
} 