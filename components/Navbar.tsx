"use client";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { headerAnimationProps } from "@/utils/motion";

const Navbar: React.FC = () => {
  return (
    <header className="container mx-auto px-6 py-8 flex items-center justify-between relative z-10">
      <motion.div
        {...headerAnimationProps}
        className="text-charcoal-black flex items-center justify-between w-full"
      >
        <Link href="/">
          <motion.img 
            src="/images/Logo.svg" 
            alt="Cardia Logo" 
            className="h-8" 
            whileHover={{ scale: 1.05 }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ 
              x: 0, 
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

        {/* <SignedIn>
          <UserButton/>
        </SignedIn> */}
        {/* <SignedOut> */}
          {/* <Link href="/">
            <Button variant="ghost">Join waitlist</Button>
          </Link> */}
        {/* </SignedOut> */}
      </motion.div>
    </header>
  );
};

export default Navbar;