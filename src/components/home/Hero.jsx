"use client";
import React from 'react';
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import Link from 'next/link';

function Hero() {
    return (
        <div 
            className="w-full h-full relative flex flex-col items-center justify-center text-center"
            style={{
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/MainImage.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed"
            }}
        >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-10 w-32 h-32 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-10 left-20 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <SplitText
                    text="Welcome to Afgunseen"
                    className="text-5xl md:text-7xl font-serif text-white font-bold mb-6"
                    delay={150}
                    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                    easing="easeOutCubic"
                    threshold={0.2}
                    rootMargin="-50px"
                    onLetterAnimationComplete={() => {
                        console.log('All letters animated!');
                    }}
                />

                <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto opacity-0 animate-fadeIn animation-delay-1000">
                    Discover the powerful visual narratives of Afghan artists Zahra & Manizha Abbasi
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 opacity-0 animate-fadeIn animation-delay-2000">
                    <Link href="/gallery" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
                        Explore Gallery
                    </Link>
                    <a href="#about" className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-gray-900 transform transition duration-300 hover:scale-105">
                        Learn More
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>

            {/* Add custom animation styles */}
            <style jsx global>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 1s forwards;
                }
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
}

export default Hero;
