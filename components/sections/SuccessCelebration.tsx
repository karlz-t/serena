"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { config } from "@/config/content";
import { particleBurst } from "@/lib/animations";

interface SuccesCelebrationProps {
  onContinue?: () => void;
}

export function SuccessCelebration({ onContinue }: SuccesCelebrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger particle burst on mount
    setTimeout(() => {
      particleBurst(50, containerRef.current);
      setTimeout(() => particleBurst(50, containerRef.current), 500);
      setTimeout(() => particleBurst(50, containerRef.current), 1000);
    }, 300);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="h-[100dvh] w-full py-6 sm:py-16 px-6 bg-gradient-to-b from-pink-500 via-rose-400 to-red-500 relative overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated confetti background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `-${50}px`,
              rotate: Math.random() * 360,
              opacity: 1,
            }}
            animate={{
              y: `${window !== undefined ? window.innerHeight + 50 : 500}px`,
              rotate: Math.random() * 720,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          >
            {["🎉", "💕", "🌹", "✨", "🎊"][i % 5]}
          </motion.div>
        ))}
      </div>

      {/* Main celebration content */}
      <motion.div
        className="max-w-3xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Celebration emojis */}
        <motion.div
          className="mb-3 sm:mb-10 text-5xl sm:text-8xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        >
          🎉
        </motion.div>

        {/* Main message */}
        <motion.h2
          className="text-3xl sm:text-7xl font-bold text-white mb-3 sm:mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {config.successMessage}
        </motion.h2>

        {/* Decorative hearts */}
        <motion.div
          className="text-4xl mb-3 sm:mb-10"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          ❤️
        </motion.div>

        {/* Secondary celebration text */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-2xl sm:text-3xl text-white/90 font-light">
            I&apos;m counting the moments until I see you again.
          </p>
          <p className="text-xl text-white/80">
            Thank you for saying yes to this adventure with me. 💕
          </p>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="mt-4 sm:mt-12 flex justify-center gap-5 text-4xl sm:text-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          {["🌹", "💕", "✨"].map((emoji, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-20, 20, -20],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>

        {/* Continue hint */}
        {onContinue && (
          <motion.div
            className="mt-4 sm:mt-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.6 }}
          >
            <p className="text-white/80 text-sm mb-3">Let's continue celebrating...</p>
            <motion.button
              onClick={onContinue}
              className="inline-block text-white hover:text-white/80 transition-colors"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="text-xs block mt-1">Continue</span>
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
}
