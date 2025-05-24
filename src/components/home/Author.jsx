import React, { useState, useEffect } from 'react';
import Image from "next/image";

function Author() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/30 overflow-y-auto">

        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {/* Hero Section with Parallax Effect */}
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

            {/* Artist Portrait Gallery Section */}
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

            {/* Artistic Quote Section */}
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

            {/* Featured Work Gallery */}
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

            {/* About Section with Floating Cards */}
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
                      {/* Replace this div with: <img src="/path/to/artists-working.jpg" alt="Zahra and Manizha Abbasi at work" className="w-full h-full object-cover" /> */}
                      <div className="text-center text-purple-600 dark:text-purple-300">
                        <div className="text-8xl mb-4">🎨</div>
                        <p className="text-lg font-medium">Add Artists at Work Photo</p>
                      </div>
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

            {/* Recognition Section */}
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
                    description: "Short film 'Ali&apos;s Story' was shortlisted for this prestigious award.",
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

            {/* Call to Action Section */}
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
                    Discover more of Zahra and Manizha&apos;s powerful visual narratives and join their mission to amplify unheard voices.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-gray-50">
                      View Full Portfolio
                    </button>
                    <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105">
                      Get In Touch
                    </button>
                  </div>
                </div>

                {/* Decorative particles */}
                <div className="absolute top-10 left-10 w-2 h-2 bg-white/50 rounded-full animate-ping"></div>
                <div className="absolute top-20 right-20 w-1 h-1 bg-white/50 rounded-full animate-ping delay-1000"></div>
                <div className="absolute bottom-10 left-20 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping delay-500"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
}

export default Author;
