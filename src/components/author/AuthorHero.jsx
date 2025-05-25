import React, { useState, useEffect } from 'react';

function AuthorHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`text-center mb-40 transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transform: `translateY(${Math.min(scrollY * 0.1, 100)}px)` }}
    >
      <div className="relative inline-block">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 animate-gradient-x">
            Zahra & Manizha
          </span>
          <br />
          <span className="text-gray-800 dark:text-white">Abbasi</span>
        </h1>
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-2xl rounded-full"></div>
      </div>
      <p className="mt-8 max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
        Afghan artists and filmmakers creating
        <span className="font-semibold text-purple-600 dark:text-purple-400"> powerful visual narratives</span>
        that bridge cultures and amplify unheard voices
      </p>

      {/* Floating Action Buttons */}
      <div className="mt-12 flex justify-center space-x-4">
        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:to-indigo-700">
          View Portfolio
        </button>
        <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-purple-200 hover:bg-white">
          Contact Artists
        </button>
      </div>
    </div>
  );
}

export default AuthorHero;