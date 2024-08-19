"use client";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function Home() {

  const [isOnWaitlist, setIsOnWaitlist]= useState<boolean>(false)
  return (
    <div className="bg-orange-white text-charcoal-black font-sans min-h-screen overflow-hidden relative">
      <Hero isSuccess={isOnWaitlist}/>
      <InfoSection
        title="Revolutionize Your Learning"
        description="Discover a new way to master any subject with our cutting-edge flashcard technology. Harness the power of AI and spaced repetition to accelerate your learning journey."
      />
      <Features />  
      <Footer setIsOnWaitlist={setIsOnWaitlist}/>
    </div>
  );
}