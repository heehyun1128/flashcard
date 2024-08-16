"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { mainAnimationProps } from "@/utils/motion";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 text-center relative z-10">
      <motion.h1
        {...mainAnimationProps}
        className="text-[54px] sm:text-[64px] md:text-[74px] lg:text-[96px] font-extrabold leading-[1.1] mb-4 text-charcoal-black text-center tracking-tighter"
      >
        AI Superpowers for
        <br />
        your{" "}
        <span className="relative inline-block">
          <span className="absolute inset-0 bg-deep-orange opacity-50 transform h-[40%] translate-y-[150%]"></span>
          <span className="relative">flashcards</span>
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-charcoal-black text-base sm:text-lg md:text-xl mt-4 sm:mt-6 text-center tracking-tight"
      >
        Supercharge your learning with AI-powered flashcards. Effortless,
        <br />
        lightning-fast, and presented in a sleek, intuitive interface.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
      >
        <SignedIn>
          <Link href="/create-flashcards" passHref>
            <Button className="w-full sm:w-auto">
              Create Flashcards
            </Button>
          </Link>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in" passHref>
            <Button variant="secondary" className="w-full sm:w-auto">
              Sign in to Start Learning
            </Button>
          </Link>
        </SignedOut>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-12 sm:mt-20 p-2 bg-deep-orange bg-opacity-10 rounded-3xl shadow-6xl relative overflow-hidden backdrop-filter backdrop-blur-3xl"
        style={{
          boxShadow: "0 0 50px 2px rgba(255, 198, 113, 0.2)",
        }}
      >
        <div className="absolute inset-0 bg-deep-orange opacity-30 filter blur-3xl"></div>
        <video
          src="/video/main.mp4"
          width={1200}
          height={600}
          autoPlay
          loop
          muted
          playsInline
          className="rounded-2xl relative z-10 w-full h-auto object-cover"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-charcoal-black text-base sm:text-lg mt-6"
      >
        Leveraging advanced AI to generate personalized flashcards from your study materials,
        optimizing your learning experience.
      </motion.p>
    </main>
  );
};

export default Hero;