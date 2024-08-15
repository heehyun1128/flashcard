"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FaGithub } from "react-icons/fa";
import Head from "next/head";

const GlassmorphicBackground = React.memo(() => (
  <div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-[#f5f5f0] bg-opacity-50 backdrop-filter backdrop-blur-2xl" />
    <div className="absolute top-0 right-0 w-full h-full bg-[#1e90ff] rounded-full mix-blend-multiply filter blur-[150px] opacity-10" />
    <div className="absolute bottom-0 left-0 w-full h-full bg-[#87cefa] rounded-full mix-blend-multiply filter blur-[150px] opacity-10" />
  </div>
));

export default function Home() {
  const headerAnimationProps = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 },
    }),
    []
  );

  const mainAnimationProps = useMemo(
    () => ({
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    }),
    []
  );

  const buttonHoverProps = useMemo(
    () => ({
      whileHover: {
        scale: 1.05,
        backgroundImage: "linear-gradient(to right, #2F855A, #38A169)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    }),
    []
  );

  const buttonAnimationProps = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
    []
  );

  return (
    <div className="bg-[#f5f5f0] text-[#1e90ff] font-sans min-h-screen overflow-hidden relative">
      <Head>
        <title>Flashcard Saas</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>
      <GlassmorphicBackground />

      {/* Navigation Bar */}
      <header className="container mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <motion.div
          {...headerAnimationProps}
          className="text-[#1e90ff] text-2xl font-bold"
        >
          Flashcard
        </motion.div>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in" passHref>
            <motion.button
              className="bg-gradient-to-r from-[#1e90ff] to-[#87cefa] text-white font-bold py-2 px-4 rounded-[0.50rem] text-lg transition-all duration-200 shadow-lg backdrop-filter backdrop-blur-3xl"
              {...buttonHoverProps}
              {...buttonAnimationProps}
            >
              Sign In / Sign Up
            </motion.button>
          </Link>
        </SignedOut>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16 text-center relative z-10">
        <motion.div
          {...mainAnimationProps}
          className="relative w-full h-96 mb-8"
        >
          <video
            src="/main.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-lg"
          />
        </motion.div>
        <motion.h1
          {...mainAnimationProps}
          className="text-7xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1e90ff] to-[#87cefa]"
        >
          Welcome to Flashcard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[#1e90ff] text-xl mt-6"
        >
          Create flashcards from your text
        </motion.p>

        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <motion.button
            className="bg-gradient-to-r from-[#1e90ff] to-[#87cefa] text-white font-bold py-3 px-8 rounded-[0.50rem] text-lg transition-all duration-200 shadow-lg backdrop-filter backdrop-blur-3xl"
            {...buttonHoverProps}
            {...buttonAnimationProps}
            whileHover={{
              boxShadow: '0 0 25px rgba(30, 144, 255, 0.5)',
            }}
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Feature Section Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold mb-4">Feature Section</h2>
          {/* Add your feature content here */}
        </motion.div>

        {/* Pricing Section Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold mb-4">Pricing</h2>
          {/* Add your pricing content here */}
        </motion.div>
      </main>
    </div>
  );
}