"use client";
import Image from "next/image";
import Hero from "@/components/home/Hero";
import Author from "@/components/home/Author";
import Footer from "@/components/home/Footer";
import GalleryPreview from "@/components/home/GalleryPreview";

export default function Home() {
  return (
    <div className="w-full h-screen overflow-y-scroll">
    <Hero />
    <Author/>
    <GalleryPreview/>
    <Footer />
    </div>
  );
}
