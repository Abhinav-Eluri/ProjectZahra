"use client";
import React from 'react';
import Author from "@/components/home/Author";
import Footer from "@/components/home/Footer";

export default function ArtistsPage() {
  return (
    <div className="w-full min-h-screen pt-20">
      {/* Artists Section */}
      <section className="min-h-screen">
        <Author />
      </section>

      {/* Footer Section */}
      <section>
        <Footer />
      </section>
    </div>
  );
}