"use client";
import React from 'react';
import Footer from "@/components/home/Footer";
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutPage() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const values = [
    { name: "Authenticity", description: "We prioritize genuine voices and perspectives.", icon: "🔍" },
    { name: "Inclusivity", description: "We welcome diverse expressions and experiences.", icon: "🌍" },
    { name: "Innovation", description: "We embrace new forms and approaches to storytelling.", icon: "💡" },
    { name: "Collaboration", description: "We foster partnerships across disciplines and borders.", icon: "🤝" },
    { name: "Resilience", description: "We celebrate the enduring spirit of creativity in the face of adversity.", icon: "💪" }
  ];

  return (
    <div className="w-full min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/30 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                About AFGUNSEEN
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mb-8"></div>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Amplifying Afghan voices through art, culture, and storytelling
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                  <div className="relative w-full h-80 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 z-10"></div>
                    <Image 
                      src="https://source.unsplash.com/random/600x800/?afghanistan,art" 
                      alt="Afghan Art"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    AFGUNSEEN is a platform dedicated to showcasing the rich cultural heritage and contemporary artistic expressions from Afghanistan and its diaspora. Our mission is to amplify voices that often go unheard and to present narratives that challenge stereotypes and broaden perspectives.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Founded in 2022, AFGUNSEEN brings together artists, filmmakers, photographers, and writers who share a connection to Afghanistan. Through exhibitions, screenings, publications, and digital content, we create spaces for dialogue, reflection, and cultural exchange.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-10 shadow-lg text-white"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-6 text-center">Our Vision</h2>
              <p className="text-xl leading-relaxed max-w-3xl mx-auto text-center">
                We envision a world where Afghan art and culture are recognized and celebrated globally, contributing to a more nuanced understanding of Afghanistan&apos;s past, present, and future. We believe in the power of art to transcend boundaries, foster empathy, and inspire change.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              Our Values
            </motion.h2>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {values.map((value, index) => (
                <motion.div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  variants={fadeIn}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{value.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Journey</h2>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 to-indigo-600"></div>

                {/* Timeline items */}
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">2022</h3>
                      <p className="text-gray-700 dark:text-gray-300">AFGUNSEEN was founded with a mission to showcase Afghan art globally</p>
                    </div>
                    <div className="z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg"></div>
                    <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                    <div className="z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg"></div>
                    <div className="md:w-1/2 md:pl-8 md:text-left mb-4 md:mb-0">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">2023</h3>
                      <p className="text-gray-700 dark:text-gray-300">Expanded our platform to include digital exhibitions and virtual events</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">2024</h3>
                      <p className="text-gray-700 dark:text-gray-300">Launched international partnerships with museums and cultural institutions</p>
                    </div>
                    <div className="z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg"></div>
                    <div className="md:w-1/2 md:pl-8 md:text-left"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Join Our Community</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Be part of our mission to amplify Afghan voices and stories through art and culture.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Get Involved
            </button>
          </motion.div>
        </section>

        {/* Footer Section */}
        <section>
          <Footer />
        </section>
      </div>
    </div>
  );
}
