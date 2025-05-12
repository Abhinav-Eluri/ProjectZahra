"use client";
import Image from "next/image";
import Hero from "@/components/home/Hero";
import Author from "@/components/home/Author";
import Footer from "@/components/home/Footer";
import GalleryPreview from "@/components/home/GalleryPreview";

export default function Home() {
    return (
        <div className="w-full min-h-screen overflow-y-hidden overflow-x-hidden snap-y snap-mandatory">
            <div className="snap-start h-screen">
                <Hero/>
            </div>

            <div className="snap-start h-screen">
                <GalleryPreview/>
            </div>
            <div className="snap-start h-screen">
                <Author/>
            </div>
            <div className="snap-start">
                <Footer/>
            </div>
        </div>
    );
}
