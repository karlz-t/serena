"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { config } from "@/config/content";

interface OpeningSceneProps {
  onBegin: () => void;
}

export function OpeningScene({ onBegin }: OpeningSceneProps) {
  return (
    <motion.section
      className="h-[100dvh] w-full flex items-center justify-center bg-gradient-to-b from-pink-50 via-white to-purple-50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{
              opacity: 0,
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.3, 0],
              y: [0, -100, -200],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            {["🌸", "✨", "💕", "🌷"][i % 4]}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="text-center px-6 z-10"
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.4,
            },
          },
        }}
      >
        {/* Greeting */}
        <motion.h1
          className="text-3xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent mb-4 sm:mb-6"
          variants={fadeInUp}
        >
          {config.openingGreeting}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-2xl text-gray-600 mb-8 sm:mb-12 font-light"
          variants={fadeInUp}
        >
          {config.openingSubtitle}
        </motion.p>

        {/* Animated decorative element */}
        <motion.div
          className="mb-8 sm:mb-12"
          variants={fadeInUp}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="text-5xl sm:text-6xl">💕</div>
        </motion.div>

        {/* Begin button */}
        <motion.button
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-shadow"
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBegin}
        >
          {config.openingButtonText}
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
