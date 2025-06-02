import React, { useState, useEffect, useRef } from 'react';
import { User } from '@supabase/auth-helpers-nextjs';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsDropdownOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getDisplayName = () => {
    return user.user_metadata?.full_name || 
           user.user_metadata?.name || 
           user.email?.split('@')[0] || 
           'User';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative ml-4" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-4 text-white hover:text-purple-300 transition-colors px-5 py-3 rounded-lg hover:bg-slate-800/50 cursor-pointer"
      >
        {/* Avatar */}
        {user.user_metadata?.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt={getDisplayName()}
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-medium text-white cursor-pointer">
            {getInitials(getDisplayName())}
          </div>
        )}
        
        {/* Name (hidden on mobile) */}
        <span className="hidden md:block text-sm font-medium cursor-pointer">{getDisplayName()}</span>
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 w-64 bg-slate-800 rounded-lg shadow-xl border border-slate-700 z-50" style={{ marginTop: '1rem' }}>
          {/* Email */}
          <div style={{ padding: '1rem 1.25rem' }} className="border-b border-slate-700">
            <p className="text-sm text-gray-400 truncate" style={{ marginLeft: '0.5rem' }}>
              {user.email}
            </p>
          </div>

          {/* Sign Out Button */}
          <div style={{ padding: '1rem 1.25rem' }}>
            <button
              onClick={handleSignOut}
              className="w-full text-left text-sm text-gray-300 hover:bg-slate-700 hover:text-white rounded-md transition-colors cursor-pointer font-medium"
              style={{ padding: '0.25rem 1rem' }}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 