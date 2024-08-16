"use client";
import React from "react";
import Head from "next/head";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";

const Home: React.FC = () => {
  return (
    <div className="bg-orange-white text-charcoal-black font-sans min-h-screen overflow-hidden relative">
      <Head>
        <title>AI-Powered Flashcard Assistant</title>
        <meta name="description" content="Enhance Your Learning with AI-Generated Flashcards" />
      </Head>
      <Hero />
      <Features />
    </div>
  );
};

export default React.memo(Home);