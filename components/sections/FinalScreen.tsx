"use client";

import { motion } from "framer-motion";
import { config } from "@/config/content";

export function FinalScreen() {
  return (
    <motion.section
      className="h-[100dvh] w-full py-6 sm:py-16 px-6 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 relative overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 100 + 20 + "px",
              height: Math.random() * 100 + 20 + "px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="max-w-2xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {/* Decorative element */}
        <motion.div
          className="mb-4 sm:mb-10 text-5xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          💕
        </motion.div>

        {/* Main title */}
        <motion.h2
          className="text-2xl sm:text-6xl font-bold text-white mb-3 sm:mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {config.finalScreenTitle}
        </motion.h2>

        {/* Main message */}
        <motion.p
          className="text-base sm:text-2xl text-pink-100 mb-4 sm:mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {config.finalScreenMessage}
        </motion.p>

        {/* Decorative flowers */}
        <motion.div
          className="flex justify-center gap-4 text-3xl sm:text-5xl mb-4 sm:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          {["🌹", "💕", "🌷", "✨", "🌸"].map((emoji, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-30, 30, -30],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>

        {/* Heart animation */}
        <motion.div
          className="text-7xl"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          ❤️
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
