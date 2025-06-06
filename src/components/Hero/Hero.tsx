import React, { useState, useEffect } from 'react';

interface HeroProps {
  onCTAClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCTAClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Main Hero
    {
      title: (
        <>
          Compete. Win.
          <br />
          Earn real BTC.
        </>
      ),
      content: (
        <div className="space-y-4 text-lg text-gray-300">
          <p className="font-bold">We give you 0.5 paper BTC to trade—zero risk, all the rewards.</p>
          <p>Compete every week for a chance to win up to 1000 USD in BTC.</p>
          <p>Are you ready?</p>
        </div>
      ),
      button: (
        <button 
          onClick={() => window.open('https://roxom.com/competitions', '_blank')}
          className="bg-gradient-to-r from-purple-400 to-[rgb(144,88,249)] text-white h-[44px] w-[210px] px-8 text-sm font-medium rounded transition-all duration-300 hover:from-purple-500 hover:to-[rgb(124,68,229)] hover:scale-105 transform whitespace-nowrap cursor-pointer"
          type="button"
          aria-label="Join our Bitcoin trading competitions - opens in new tab"
        >
          Join the competitions
        </button>
      ),
      rightContent: (
        <figure className="relative z-10 p-4" aria-label="Bitcoin competition trophy illustration">
          {/* Trophy Illustration */}
          <div className="w-full h-[500px] relative">
            <div className="absolute inset-8 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 rounded-full blur-2xl opacity-25" aria-hidden="true"></div>
            <div className="absolute inset-12 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full blur-xl opacity-15" aria-hidden="true"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-48 h-64 bg-gradient-to-b from-yellow-400 via-orange-400 to-red-500 rounded-lg transform rotate-12 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-black" aria-hidden="true">₿</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </figure>
      ),
      slideLabel: "Main competition offer"
    },
    // Slide 2: About Platform
    {
      title: (
        <>
          The Future of
          <br />
          Bitcoin Trading.
        </>
      ),
      content: (
        <div className="space-y-4 text-lg text-gray-300">
          <p className="font-bold">Experience risk-free Bitcoin trading with real rewards.</p>
          <p>Our platform combines the excitement of trading with the security of paper money.</p>
          <p>Build your skills, compete with others, and earn actual Bitcoin prizes.</p>
        </div>
      ),
      button: (
        <button 
          onClick={() => window.open('https://roxom.com/about', '_blank')}
          className="bg-gradient-to-r from-purple-400 to-[rgb(144,88,249)] text-white h-[44px] w-[210px] px-8 text-sm font-medium rounded transition-all duration-300 hover:from-purple-500 hover:to-[rgb(124,68,229)] hover:scale-105 transform whitespace-nowrap cursor-pointer"
          type="button"
          aria-label="Learn more about our platform - opens in new tab"
        >
          Learn More
        </button>
      ),
      rightContent: (
        <figure className="relative z-10 p-4" aria-label="Lightning bolt representing fast trading illustration">
          <div className="w-full h-[500px] relative">
            <div className="absolute inset-8 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-full blur-2xl opacity-25" aria-hidden="true"></div>
            <div className="absolute inset-12 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 rounded-full blur-xl opacity-15" aria-hidden="true"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-48 h-64 bg-gradient-to-b from-blue-400 via-indigo-400 to-purple-500 rounded-lg transform -rotate-12 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-300 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-white" aria-hidden="true">⚡</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </figure>
      ),
      slideLabel: "Platform features and benefits"
    }
  ];

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 max-w-full py-12 md:py-24" role="main">
      {/* Hero Carousel */}
      <section 
        className="grid md:grid-cols-2 gap-8 items-center" 
        aria-label="Hero carousel"
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Content Area */}
        <article className="flex flex-col justify-between min-h-[350px]">
          <header>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 transition-all duration-500">
              {slides[currentSlide].title}
            </h1>
            <div className="transition-all duration-500" role="region" aria-label={slides[currentSlide].slideLabel}>
              {slides[currentSlide].content}
            </div>
          </header>
          
          <footer className="mt-auto">
            <div className="transition-all duration-500">
              {slides[currentSlide].button}
            </div>
          </footer>
        </article>

        {/* Visual Content */}
        <aside className="relative" aria-label="Hero illustration">
          <div className="transition-all duration-500">
            {slides[currentSlide].rightContent}
          </div>
        </aside>
      </section>

      {/* Carousel Navigation */}
      <nav className="flex justify-center gap-2 mt-8" aria-label="Carousel navigation">
        <ul className="flex gap-2" role="tablist" aria-label="Slide selection">
          {slides.map((slide, index) => (
            <li key={index} role="presentation">
              <button
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                  index === currentSlide ? 'bg-purple-500' : 'bg-gray-500 hover:bg-gray-400'
                }`}
                role="tab"
                aria-selected={index === currentSlide}
                aria-controls={`slide-${index}`}
                aria-label={`Go to slide ${index + 1}: ${slide.slideLabel}`}
                type="button"
              />
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}; 