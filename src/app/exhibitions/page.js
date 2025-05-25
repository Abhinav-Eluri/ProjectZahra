"use client";
import React from 'react';
import ExhibitionsScreenings from "@/components/home/ExhibitionsScreenings";
import Footer from "@/components/home/Footer";

export default function ExhibitionsPage() {
  return (
    <div className="w-full min-h-screen pt-20">
      {/* Exhibitions Section */}
      <section className="min-h-screen">
        <ExhibitionsScreenings />
      </section>

      {/* Footer Section */}
      <section>
        <Footer />
      </section>
    </div>
  );
}