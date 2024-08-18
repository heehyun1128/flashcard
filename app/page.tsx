"use client";
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import React from "react";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Checkout from "@/components/transaction/Checkout";
import Credits from "@/components/transaction/Credits";
import Hero from "@/components/sections/Hero";
import FlashcardDemo from "@/components/demo/FlashcardDemo";






export default function Home() {
  const router = useRouter();
  return (
    <div className="bg-[#f5f5f0] text-charcoal-black font-sans min-h-screen overflow-hidden relative">
      <Head>
        <title>AI-Powered Flashcard Assistant</title>
        <meta
          name="description"
          content="Enhance Your productivity with AI-Generated Flashcards"
        />
      </Head>

      <Hero />

      <div className="relative z-50 ">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Planning to learn something today?</h2>
      </div>
      
        <FlashcardDemo />
      </div>
      <div className="z-50 relative">
        <Credits />
      </div>
    
    </div>
  );
}
