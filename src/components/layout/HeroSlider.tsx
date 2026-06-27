"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";

interface HeroSliderProps {
  images: string[];
  children?: React.ReactNode;
}

export default function HeroSlider({ images, children }: HeroSliderProps) {
  const [shuffledImages, setShuffledImages] = useState<string[]>(images);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    // Shuffle the images array starting from index 1 (keeping images[0] stable for preloading)
    const shuffled = [...images];
    for (let i = shuffled.length - 1; i > 1; i--) {
      const j = Math.floor(Math.random() * i) + 1;
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledImages(shuffled);
  }, [images]);

  useEffect(() => {
    if (shuffledImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledImages.length);
    }, 5000); // Transition every 5 seconds
    return () => clearInterval(interval);
  }, [shuffledImages.length]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          key={shuffledImages[currentIndex] || currentIndex}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={shuffledImages[currentIndex] || images[0]}
            alt="Hero background"
            fill
            sizes="100vw"
            priority={currentIndex === 0}
            className="object-cover"
            quality={75}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-brand-dark/40 z-10"></div>

      {/* Children Text Content - Animated Presence based on currentIndex */}
      <AnimatePresence>
        {currentIndex === 0 && children && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20 text-center px-4 max-w-4xl flex flex-col items-center"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Dot Indicators */}
      {shuffledImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3 items-center">
          {shuffledImages.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <motion.button
                key={idx}
                layout
                onClick={() => setCurrentIndex(idx)}
                className="relative h-2.5 cursor-pointer focus:outline-none"
                style={{ width: isActive ? 24 : 10 }}
                aria-label={`Go to slide ${idx + 1}`}
              >
                {/* Inactive dot background */}
                {!isActive && (
                  <div className="absolute inset-0 rounded-full bg-brand-cream/40 hover:bg-brand-cream/80 transition-colors duration-300" />
                )}
                {/* Active sliding indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeDotIndicator"
                    className="absolute inset-0 rounded-full bg-brand-gold"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
}
