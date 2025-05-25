"use client";
import Image from "next/image";
import Hero from "@/components/home/Hero";
import Footer from "@/components/home/Footer";
import GalleryPreview from "@/components/home/GalleryPreview";
import Link from "next/link";

export default function Home() {
    return (
        <div className="w-full min-h-screen">
            {/* Hero Section - Full Screen */}
            <section className="h-screen snap-start">
                <Hero/>
            </section>

            {/* Gallery Preview Section - Full Screen */}
            <section className="h-screen snap-start">
                <GalleryPreview/>
            </section>


            {/* Contact Us Button */}
            <section className="py-16 text-center">
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="max-w-2xl mx-auto mb-8 text-gray-600">
                    Have questions or want to collaborate? We&apos;d love to hear from you.
                </p>
                <Link href="/contact">
                    <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        Contact Us
                    </button>
                </Link>
            </section>

            {/* Footer Section - Auto Height */}
            <section className="snap-start">
                <Footer/>
            </section>
        </div>
    );
}
