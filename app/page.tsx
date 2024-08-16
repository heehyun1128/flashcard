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

const GlassmorphicBackground = React.memo(function GlassmorphicBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-orange-white backdrop-filter backdrop-blur-2xl" />
    </div>
  );
});




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

      <div className="text-charcoal-black relative">Feature Section</div>
      <div className="z-50 relative">
        <Credits />
      </div>
      <GlassmorphicBackground />
    </div>
  );
}
