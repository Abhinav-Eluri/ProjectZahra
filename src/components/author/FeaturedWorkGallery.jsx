import React, { useState, useEffect } from 'react';

function FeaturedWorkGallery() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`mb-32 transform transition-all duration-1000 delay-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Featured Work
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Visual Storytelling",
            subtitle: "Exploring identity through symbolic art",
            color: "from-purple-500 to-pink-500"
          },
          {
            title: "Documentary Film",
            subtitle: "Capturing authentic stories of Afghan women",
            color: "from-indigo-500 to-purple-500"
          },
          {
            title: "Collaborative Art",
            subtitle: "Sisters united in creative expression",
            color: "from-pink-500 to-indigo-500"
          }
        ].map((work, index) => (
          <div key={index} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800"></div>
            <div className={`absolute inset-0 bg-gradient-to-t ${work.color} opacity-0 group-hover:opacity-90 transition-all duration-500`}></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <div className="text-center text-white p-6">
                <h3 className="text-2xl font-bold mb-2">{work.title}</h3>
                <p className="text-white/90">{work.subtitle}</p>
                <button className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedWorkGallery;