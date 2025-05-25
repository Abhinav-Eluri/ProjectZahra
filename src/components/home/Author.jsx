import React from 'react';
import AuthorHero from '@/components/author/AuthorHero';
import ArtistPortraitGallery from '@/components/author/ArtistPortraitGallery';
import ArtisticQuote from '@/components/author/ArtisticQuote';
import FeaturedWorkGallery from '@/components/author/FeaturedWorkGallery';
import AboutSection from '@/components/author/AboutSection';
import RecognitionSection from '@/components/author/RecognitionSection';
import CallToAction from '@/components/author/CallToAction';

function Author() {
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
          <AuthorHero />
          <ArtistPortraitGallery />
          <ArtisticQuote />
          <FeaturedWorkGallery />
          <AboutSection />
          <RecognitionSection />
          <CallToAction />
        </div>
      </div>
    </div>
  );
}

export default Author;
