"use client";
import React from "react";
import Head from "next/head";
import Hero from "@/components/sections/Hero";

const GlassmorphicBackground = React.memo(() => (
  <div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-orange-white backdrop-filter backdrop-blur-2xl" />
  </div>
));

const Home: React.FC = () => {
  return (
    <div className="bg-[#f5f5f0] text-charcoal-black font-sans min-h-screen overflow-hidden relative">
      <Head>
        <title>AI-Powered Flashcard Assistant</title>
        <meta name="description" content="Enhance Your Learning with AI-Generated Flashcards" />
      </Head>
      <GlassmorphicBackground />
      <Hero />
      {/* <Features /> */}
    </div>
  );
};

export default React.memo(Home);