"use client";
import Image from "next/image";
import Hero from "@/components/home/Hero";
import Author from "@/components/home/Author";
import Footer from "@/components/home/Footer";
import GalleryPreview from "@/components/home/GalleryPreview";
import ContactForm from "@/components/home/ContactForm";
import ExhibitionsScreenings from "@/components/home/ExhibitionsScreenings";

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



            {/* Author Section - Dynamic Height */}
            <section className="min-h-screen snap-start">
                <Author/>
            </section>
            <section className="min-h-screen snap-start">
                <ExhibitionsScreenings/>
            </section>

            <section className="min-h-screen snap-start">
                <ContactForm/>
            </section>

            {/* Footer Section - Auto Height */}
            <section className="snap-start">
                <Footer/>
            </section>

        </div>
    );
}