"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.footer
      className="bg-orange-white font-sans"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-16 mt-44 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24">
          <motion.div className="text-center md:text-left" variants={itemVariants}>
            <motion.h1 
              className="text-[54px] sm:text-[64px] md:text-[74px] lg:text-[118px] font-semibold leading-[0.9] mb-4 text-charcoal-black tracking-[-0.05em]"
              variants={itemVariants}
            >
              Stay tuned for
              <br />
              our upcoming
              <br />
              full launch
            </motion.h1>
            <motion.p 
              className="text-charcoal-black text-base sm:text-lg md:text-xl mt-4 sm:mt-6 tracking-tight"
              variants={itemVariants}
            >
              Subscribe to not miss out on any news!
            </motion.p>
          </motion.div>
          <motion.div className="space-y-4 md:flex md:justify-center md:items-center" variants={itemVariants}>
            <form className="w-full max-w-md">
              <motion.input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Your name" 
                className="w-full px-4 py-2 rounded-md border border-gray-100 focus:outline-none focus:ring focus:border-deep-orange focus:ring-deep-orange"
                variants={itemVariants}
              />
              
              <motion.input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Email address" 
                className="w-full px-4 py-2 rounded-md border border-gray-100 focus:outline-none focus:ring focus:border-deep-orange focus:ring-deep-orange mt-6"
                variants={itemVariants}
              />
              
              <motion.div className="flex items-center mt-6" variants={itemVariants}>
                <input type="checkbox" id="privacy-policy" name="privacy-policy" className="form-checkbox text-yellow-500 border-gray-100 rounded" />
                <label htmlFor="privacy-policy" className="ml-2 text-charcoal-black">I have read and agree to the <a href="#" className="underline">Privacy Policy</a></label>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Button type="submit" className="w-full mt-8" variant="secondary">Join waitlist</Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
        <motion.nav 
          className="flex flex-col md:flex-row justify-between text-charcoal-black mt-16 space-y-4 md:space-y-0"
          variants={itemVariants}
        >
          <ul className="flex space-x-4">
            <motion.li whileHover={{ scale: 1.05 }}><a href="#" className="hover:underline">Instagram</a></motion.li>
            <motion.li whileHover={{ scale: 1.05 }}><a href="#" className="hover:underline">TikTok</a></motion.li>
            <motion.li whileHover={{ scale: 1.05 }}><a href="#" className="hover:underline">Privacy policy</a></motion.li>
          </ul>
          <motion.p variants={itemVariants}>&copy; Cardia 2024</motion.p>
        </motion.nav>
      </div>
    </motion.footer>
  );
};

export default Footer;