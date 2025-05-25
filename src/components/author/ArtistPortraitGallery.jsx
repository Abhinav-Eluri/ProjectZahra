import React, { useState, useEffect } from 'react';
import Image from "next/image";

function ArtistPortraitGallery() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`mb-32 transform transition-all duration-1000 delay-200 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Meet the Artists
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full"></div>
      </div>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Zahras Portrait */}
        <div className="group relative">
          <div className="relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105">
            <div className="aspect-[3/4] bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-800 dark:to-purple-900 flex items-center justify-center">
              <Image fill src="/images/photographers/second_image.jpg" alt="Zahra Abbasi" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-bold mb-2">Zahra Abbasi</h3>
              <p className="text-white/90 text-sm">Former cyclist and painter exploring identity through symbolic art</p>
            </div>
          </div>
        </div>

        {/* Collaborative Portrait */}
        <div className="group relative">
          <div className="relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105">
            <div className="aspect-[3/4] bg-gradient-to-br from-pink-200 to-indigo-300 dark:from-pink-800 dark:to-indigo-900 flex items-center justify-center">
              <Image fill
                     src="/images/photographers/together.jpg" alt="Zahra and Manizha Abbasi together" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-bold mb-2">Sisters in Art</h3>
              <p className="text-white/90 text-sm">United in their mission to tell powerful stories through visual media</p>
            </div>
          </div>
        </div>

        {/* Manizhas Portrait */}
        <div className="group relative">
          <div className="relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105">
            <div className="aspect-[3/4] bg-gradient-to-br from-indigo-200 to-indigo-300 dark:from-indigo-800 dark:to-indigo-900 flex items-center justify-center">
              <Image fill src="/images/photographers/first_image.jpg" alt="Manizha Abbasi" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-bold mb-2">Manizha Abbasi</h3>
              <p className="text-white/90 text-sm">Former TV journalist and cinema student, now documentary filmmaker</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Images Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Behind the scenes / Work images */}
        {[
          { title: "Behind the Camera", desc: "Documentary filming process" },
          { title: "Art Creation", desc: "Zahra working on a painting" },
          { title: "Film Production", desc: "On set with their latest project" },
          { title: "Exhibition", desc: "Presenting their work at a gallery" }
        ].map((item, index) => (
          <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
              {/* Replace with actual images: <img src="/path/to/image.jpg" alt={item.title} className="w-full h-full object-cover" /> */}
              <div className="text-center text-gray-500 dark:text-gray-400">
                <div className="text-3xl mb-2">📸</div>
                <p className="text-xs font-medium">{item.title}</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-center text-white">
                <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-white/80">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtistPortraitGallery;