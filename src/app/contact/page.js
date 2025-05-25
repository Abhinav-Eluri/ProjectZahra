"use client";
import React from 'react';
import ContactForm from '@/components/home/ContactForm';
import Footer from '@/components/home/Footer';

export default function Contact() {
  return (
    <div className="w-full min-h-screen">
      <div className="py-10">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          We'd love to hear from you. Whether you have questions about our work, 
          are interested in collaborations, or just want to say hello, please use the form below.
        </p>
      </div>
      
      <section className="min-h-screen">
        <ContactForm />
      </section>
      
      <section className="snap-start">
        <Footer />
      </section>
    </div>
  );
}