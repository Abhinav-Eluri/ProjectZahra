import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function CallToAction() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`text-center py-20 transform transition-all duration-1000 delay-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-16">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Experience Their Art
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover more of Zahra and Manizha's powerful visual narratives and join their mission to amplify unheard voices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-gray-50">
              View Full Portfolio
            </button>
            <Link href="/contact">
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105">
                Get In Touch
              </button>
            </Link>
          </div>
        </div>

        {/* Decorative particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-white/50 rounded-full animate-ping"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-white/50 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-10 left-20 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping delay-500"></div>
      </div>
    </div>
  );
}

export default CallToAction;