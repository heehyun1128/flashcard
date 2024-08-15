"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FaGithub } from "react-icons/fa";
import Head from "next/head";

const GlassmorphicBackground = React.memo(() => (
  <div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-orange-white backdrop-filter backdrop-blur-2xl" />
  </div>
));

const Home: React.FC = () => {
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
        backgroundImage: "linear-gradient(to right, #FFC671, #FFD390)",
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
    <div className="bg-[#f5f5f0] text-charcoal-black font-sans min-h-screen overflow-hidden relative">
      <Head>
        <title>AI-Powered Flashcard Assistant</title>
        <meta name="description" content="Enhance Your Learning with AI-Generated Flashcards" />
      </Head>
      <GlassmorphicBackground />

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16 text-center relative z-10">
        <motion.h1
          {...mainAnimationProps}
          className="text-7xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-deep-orange to-light-orange"
        >
          AI-Powered Flashcard Assistant
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-charcoal-black text-xl mt-6"
        >
          Revolutionize Your Study Sessions with AI-Generated Flashcards
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 flex justify-center space-x-4"
        >
          <SignedIn>
            <Link href="/create-flashcards" passHref>
              <motion.button
                className="bg-gradient-to-r from-deep-orange to-light-orange text-charcoal-black font-bold py-3 px-8 rounded-[0.50rem] text-lg transition-all duration-200 shadow-lg backdrop-filter backdrop-blur-3xl"
                {...buttonHoverProps}
                {...buttonAnimationProps}
                whileHover={{
                  boxShadow: '0 0 25px rgba(255, 198, 113, 0.5)',
                }}
              >
                Create Flashcards
              </motion.button>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" passHref>
              <motion.button
                className="bg-gradient-to-r from-deep-orange to-light-orange text-charcoal-black font-bold py-3 px-8 rounded-[0.50rem] text-lg transition-all duration-200 shadow-lg backdrop-filter backdrop-blur-3xl"
                {...buttonHoverProps}
                {...buttonAnimationProps}
                whileHover={{
                  boxShadow: '0 0 25px rgba(255, 198, 113, 0.5)',
                }}
              >
                Sign in to Start Learning
              </motion.button>
            </Link>
          </SignedOut>

          <Link href="https://github.com/yourusername/flashai" passHref>
            <motion.button
              className="bg-[#24292e] text-white font-light py-3 px-8 rounded-[0.50rem] text-lg transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 backdrop-filter backdrop-blur-3xl"
              {...buttonAnimationProps}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 25px rgba(255, 255, 255, 0.5)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="text-xl" />
              <span>View repository</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20 p-2 bg-deep-orange bg-opacity-10 rounded-3xl shadow-6xl relative overflow-hidden backdrop-filter backdrop-blur-3xl"
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
            className="rounded-2xl relative z-10 w-full h-full object-cover"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-charcoal-black text-lg mt-6"
        >
          Leveraging advanced AI to generate personalized flashcards from your study materials,
          optimizing your learning experience.
        </motion.p>
      </main>
    </div>
  );
};

export default React.memo(Home);