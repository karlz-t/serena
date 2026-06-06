"use client";

import { motion } from "framer-motion";
import { config } from "@/config/content";

interface FinalMomentProps {
  onContinue: () => void;
}

export function FinalMoment({ onContinue }: FinalMomentProps) {
  return (
    <motion.section
      className="h-[100dvh] w-full py-6 sm:py-16 px-6 bg-gradient-to-b from-indigo-900 via-purple-900 to-black relative overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Animated starfield */}
      <div className="absolute inset-0">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Floating lanterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${100}%`,
              opacity: 0,
            }}
            animate={{
              y: `-${100}%`,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              delay: i * 2,
            }}
          >
            🏮
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="max-w-3xl mx-auto text-center relative z-10 space-y-3 sm:space-y-8 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Opening message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-lg sm:text-2xl text-white/90 font-light leading-relaxed italic">
            {config.finalMessages[0]}
          </p>
        </motion.div>

        {/* Decorative pause */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl sm:text-4xl"
        >
          💫
        </motion.div>

        {/* Middle messages */}
        <motion.div
          className="space-y-3 sm:space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {config.finalMessages.slice(1).map((message, index) => (
            <motion.p
              key={index}
              className="text-base sm:text-xl text-white/80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.3 }}
            >
              {message}
            </motion.p>
          ))}
        </motion.div>

        {/* Decorative pause */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className="text-3xl sm:text-4xl"
        >
          ✨
        </motion.div>

        {/* Proposal section */}
        <motion.div
          className="pt-2 sm:pt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 className="text-2xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 mb-2 sm:mb-6 break-words">
            {config.proposalName},
          </motion.h2>

          <motion.h3 className="text-xl sm:text-5xl font-bold text-white mb-3 sm:mb-8">
            {config.proposalText}
          </motion.h3>

          {/* Proposal buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.6 }}
          >
            <motion.button
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-xl shadow-lg hover:shadow-2xl transition-shadow"
              onClick={onContinue}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {config.yesButtonText}
            </motion.button>

            <motion.button
              className="bg-gradient-to-r from-rose-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-xl shadow-lg hover:shadow-2xl transition-shadow"
              onClick={onContinue}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {config.absolutelyButtonText}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
