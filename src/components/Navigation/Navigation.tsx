import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { Sun, Trophy } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/components/Auth';

interface NavigationProps {
  onOpenLogin: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenLogin }) => {
  const { user, loading } = useAuth();

  return (
    <header className="w-full bg-black">
      <div className="max-w-7xl mx-auto px-4 max-w-full">
        <div className="h-16 flex items-center justify-between">
          {/* Left side: Logo and Navigation */}
          <div className="flex items-center gap-8 lg:gap-12">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4 shrink-0">
              <div className="w-8 h-8 relative flex items-center justify-center">
                <Image
                  src="/logo-purple.png"
                  alt="Roxom Logo"
                  width={32}
                  height={32}
                  priority
                />
              </div>
              <span className="text-white text-3xl font-montserrat ml-2">Roxom</span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link href="#" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-sm">
                Markets
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-0.5"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Link>
              <Link href="#" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-sm">
                Trade
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-0.5"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                Competitions
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                About
              </Link>
              <button className="flex items-center justify-center gap-2.5 border border-amber-500 text-amber-500 rounded min-h-[32px] min-w-[140px] px-4 py-1.5 text-xs bg-gradient-to-r from-black/40 to-amber-500/25 hover:bg-amber-500/15 transition-colors">
                <Trophy size={14} className="flex-shrink-0" />
                <span>500 USD in BTC</span>
              </button>
            </nav>
          </div>

          {/* Right side: Theme toggle and Sign In/User Profile */}
          <div className="flex items-center gap-4 lg:gap-5">
            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <Sun size={18} className="text-gray-300 hover:text-white" />
            </button>
            
            {loading ? (
              <div className="w-[80px] h-[32px] bg-slate-700 animate-pulse rounded"></div>
            ) : user ? (
              <UserProfile user={user} />
            ) : (
              <button 
                onClick={onOpenLogin}
                className="bg-gradient-to-r from-purple-400 to-[rgb(144,88,249)] text-white min-w-[80px] min-h-[32px] px-4 py-1.5 text-sm font-medium rounded transition-all duration-300 hover:from-purple-500 hover:to-[rgb(124,68,229)] cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}; 