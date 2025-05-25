import React, { useState, useEffect } from 'react';

function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`mb-32 transform transition-all duration-1000 delay-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About the Artists
            </h2>
            <div className="flex items-center mb-8">
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-900/50">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Zahra and Manizha Abbasi are Afghan artists and filmmakers based in Germany. They use photography, film, and painting to tell stories of Afghan girls and women.
              </p>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-indigo-100 dark:border-indigo-900/50">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Manizha, a former national TV journalist, studied cinema at Kabul University. Zahra, a former cyclist and painter, explores identity through symbolic art.
              </p>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105">
            {/* Main image with gradient overlay */}
            <div className="relative aspect-square bg-gradient-to-br from-purple-200 to-indigo-300 dark:from-purple-800 dark:to-indigo-900 flex items-center justify-center">
              <img src="/images/artistAtWork.jpeg" alt="Zahra at work" className="w-full h-full object-cover" />

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-indigo-900/20 opacity-70 group-hover:opacity-40 transition-opacity duration-500"></div>
            </div>

            {/* Elegant frame */}
            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-2xl pointer-events-none"></div>

            {/* Hover effect - subtle glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-xl"></div>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-purple-500 rounded-full opacity-60 animate-bounce"></div>
          <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-indigo-500 rounded-full opacity-60 animate-bounce delay-1000"></div>
          <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-16 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full opacity-40"></div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;