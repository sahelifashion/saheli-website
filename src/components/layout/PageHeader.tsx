"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  tagline: string;
  bgImage: string;
}

export default function PageHeader({ title, tagline, bgImage }: PageHeaderProps) {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-brand-dark/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-brand-gold tracking-[0.2em] text-xs md:text-sm font-semibold uppercase block mb-3"
        >
          {tagline}
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-cream"
        >
          {title}
        </motion.h1>
        
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-16 h-[2px] bg-brand-gold mx-auto mt-6 origin-center"
        ></motion.div>
      </div>
    </div>
  );
}
