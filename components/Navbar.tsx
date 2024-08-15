"use client";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import Link from "next/link";

const Navbar: React.FC = () => {
  const headerAnimationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  };

  return (
    <header className="container mx-auto px-6 py-8 flex items-center justify-between relative z-10">
      <motion.div
        {...headerAnimationProps}
        className="text-charcoal-black"
      >
        <Link href="/">
          <motion.img 
            src="/images/Logo.svg" 
            alt="Cardia Logo" 
            className="h-8" 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </Link>
      </motion.div>

      <SignedIn>
        <UserButton/>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button>Log in / Sign up</Button>
        </Link>
      </SignedOut>
    </header>
  );
};

export default Navbar;