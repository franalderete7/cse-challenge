import React from 'react';
import { MessageCircle, Send, Wifi } from 'lucide-react';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="relative" role="contentinfo">
      {/* Main Footer Content */}
      <section className="max-w-7xl mx-auto px-4 max-w-full min-h-[250px] flex flex-col justify-end pb-16 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          The World's
          <br />
          <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">First </span>
          <span className="text-orange-400">Bitcoin Exchange</span>
        </h2>
      </section>

      {/* Contact & Social Actions */}
      <aside className="fixed bottom-8 right-8 flex flex-col gap-4 z-40" aria-label="Quick contact options">
        {/* Telegram Contact Button */}
        <button 
          className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
          aria-label="Contact us on Telegram"
          type="button"
        >
          <Send size={24} className="text-white" aria-hidden="true" />
        </button>
        
        {/* Roxom Support Button */}
        <button 
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer" 
          style={{ backgroundColor: 'rgb(80,40,180)' }} 
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(60,20,160)'} 
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(80,40,180)'}
          aria-label="Contact Roxom support"
          type="button"
        >
          <Image
            src="/logo-purple.png"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
        </button>
      </aside>
    </footer>
  );
}; 