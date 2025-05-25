import React, { useState, useEffect } from 'react';

function RecognitionSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`mb-32 transform transition-all duration-1000 delay-900 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Recognition & Awards
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full"></div>
      </div>

      {/* Featured Publications */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8 text-center">Featured In</h3>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['DW', 'Express Tribune', 'Service95', 'Afghanistan International TV', 'Malala Fund'].map((pub, index) => (
            <div key={index} className="px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-purple-100 dark:border-purple-900/50">
              <span className="font-medium text-gray-800 dark:text-gray-200">{pub}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Also featured by rescue_deutschland (IRC), on.assembly, Ashoka Global, Kabul Luftbrücke, and HerStoryAf.
        </p>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: "PILnet Pro Bono Award",
            description: "Short film 'Ali's Story' was shortlisted for this prestigious award.",
            icon: "⭐",
            gradient: "from-yellow-400 to-orange-500"
          },
          {
            title: "GirlsGoMovie Festival",
            description: "Film \"For Me, For You\" won second place at this celebrated festival.",
            icon: "🎬",
            gradient: "from-pink-400 to-red-500"
          },
          {
            title: "Förderpreis von OK-TV Ludwigshafen",
            description: "Received this award for their exceptional filmmaking.",
            icon: "🏆",
            gradient: "from-blue-400 to-indigo-500"
          },
          {
            title: "Kinemathek Karlsruhe",
            description: "Film shown twice at the queer-feminist short film evening \"Weiche Kinemathek\".",
            icon: "🎭",
            gradient: "from-purple-400 to-pink-500"
          }
        ].map((award, index) => (
          <div key={index} className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-purple-100 dark:border-purple-900/50">
            <div className="flex items-start space-x-4">
              <div className={`p-4 bg-gradient-to-r ${award.gradient} rounded-xl text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {award.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {award.title}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {award.description}
                </p>
              </div>
            </div>
            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${award.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecognitionSection;