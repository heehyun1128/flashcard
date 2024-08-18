"use client";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { headerAnimationProps } from "@/utils/motion";

const Navbar: React.FC = () => {
  return (
    <header className="container mx-auto mt-5 px-6 py-8 flex items-center justify-between relative z-10">
      <motion.div
        {...headerAnimationProps}
        className="text-charcoal-black flex items-center"
      >
        <Link href="/">
          <motion.img 
            src="/images/Logo.svg" 
            alt="Cardia Logo" 
            className="h-8" 
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
              }
            }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </Link>
      </motion.div>
      <motion.div 
        className="flex items-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.5
            }
          }}
        >
          <Link href="/pricing" className="font-medium text-charcoal-black hover:text-deep-orange transition-colors">
            Pricing
          </Link>
        </motion.div>
        <SignedOut>
          <Link href="/sign-in" passHref>
            <Button variant="secondary">Log in / Sign up</Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </motion.div>
    </header>
  );
};

export default Navbar;