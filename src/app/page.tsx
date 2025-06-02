'use client';

import React, { useState } from 'react';
import { AuthModal } from '@/components/Auth';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';

export default function RoxomLanding() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleCTAClick = () => {
    alert('Join our competitions and win BTC!');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="container">
        <Navigation onOpenLogin={() => setAuthModalOpen(true)} />
        <main className="flex-1">
          <Hero onCTAClick={handleCTAClick} />
          <Footer />
        </main>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
