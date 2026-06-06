"use client";

import { motion } from "framer-motion";
import { config } from "@/config/content";
import { TypewriterText } from "@/lib/animations";

interface BibleScriptureProps {
  onContinue?: () => void;
}

export function BibleScripture({ onContinue }: BibleScriptureProps) {
  return (
    <motion.section
      className="h-[100dvh] w-full py-6 sm:py-16 px-6 bg-gradient-to-b from-amber-50 via-white to-amber-50 relative overflow-hidden flex items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Decorative light rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-gradient-to-b from-yellow-300 to-transparent opacity-30"
            style={{
              height: "100%",
              left: `${20 + i * 15}%`,
              width: "2px",
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        {/* Decorative element */}
        <motion.div
          className="mb-4 sm:mb-10"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-6xl">✨</div>
        </motion.div>

        {/* Bible verse reference */}
        <motion.p
          className="text-amber-700 text-lg mb-6 font-semibold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {config.bibleVerse}
        </motion.p>

        {/* Bible message with typewriter effect */}
        <motion.div
          className="text-2xl sm:text-4xl font-light text-gray-800 leading-relaxed italic mb-4 sm:mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <TypewriterText text={config.bibleMessage} delay={0.2} />
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-4 sm:mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-3xl">💕</span>
          <motion.div
            className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Personal message */}
        <motion.p
          className="text-lg text-gray-600 leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Because that&apos;s exactly what loving you feels like.
        </motion.p>

        {/* Decorative element */}
        <motion.div
          className="mt-3 sm:mt-8"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <span className="text-4xl">🌸</span>
        </motion.div>

        {/* Hint for next action */}
        <motion.div
          className="mt-4 sm:mt-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-amber-600 text-sm mb-3">The journey continues...</p>
          {onContinue && (
            <motion.button
              onClick={onContinue}
              className="inline-block text-amber-700 hover:text-amber-900 transition-colors"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="text-xs block mt-1">Continue</span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
