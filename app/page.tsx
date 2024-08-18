"use client";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";

export default function Home() {

  return (
    <div className="bg-orange-white text-charcoal-black font-sans min-h-screen overflow-hidden relative">
      <Hero />
      <InfoSection
        title="Revolutionize Your Learning"
        description="Discover a new way to master any subject with our cutting-edge flashcard technology. Harness the power of AI and spaced repetition to accelerate your learning journey."
      />
      <Features />  
      <Footer />
    </div>
  );
}