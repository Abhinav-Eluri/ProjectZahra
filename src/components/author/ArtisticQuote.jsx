import React, { useState, useEffect } from 'react';

function ArtisticQuote() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`relative mb-32 transform transition-all duration-1000 delay-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 py-16 px-8 md:px-16 text-center">
          <div className="absolute top-8 left-8 text-6xl text-white/30 font-serif">"</div>
          <div className="absolute bottom-8 right-8 text-6xl text-white/30 font-serif">"</div>
          <blockquote className="relative z-20">
            <p className="text-2xl md:text-4xl font-light text-white leading-relaxed mb-8 italic">
              We create art as resistance, memory, and a voice for the silenced.
            </p>
            <footer className="text-white/90 text-lg font-medium">
              — Zahra & Manizha Abbasi
            </footer>
          </blockquote>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      </div>
    </div>
  );
}

export default ArtisticQuote;