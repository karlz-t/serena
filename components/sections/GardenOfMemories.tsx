"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/config/content";
import Image from "next/image";

interface GardenOfMemoriesProps {
  onContinue?: () => void;
}

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 320 : -320, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 320 : -320, opacity: 0 }),
};

const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

export function GardenOfMemories({ onContinue }: GardenOfMemoriesProps) {
  const [[activeIndex, direction], setPage] = useState([0, 0]);
  const memories = config.memories;

  const paginate = (newDirection: number) => {
    const next = activeIndex + newDirection;
    if (next < 0 || next >= memories.length) return;
    setPage([next, newDirection]);
  };

  const memory = memories[activeIndex];

  return (
    <motion.section
      className="h-[100dvh] w-full px-6 bg-gradient-to-b from-white via-pink-50 to-white relative overflow-hidden flex flex-col justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Decorative flowers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl opacity-10"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 5 + i * 0.5, repeat: Infinity }}
            style={{ left: `${(i * 17 + 5) % 100}%`, top: `${(i * 13 + 10) % 100}%` }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col gap-4">
        {/* Title */}
        <motion.div
          className="text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-1">
            The Garden of Memories
          </h2>
          <p className="text-gray-500 text-xs sm:text-base">
            Moments that made my heart remember why I love you
          </p>
        </motion.div>

        {/* Carousel card */}
        <div className="overflow-hidden rounded-2xl">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, { offset, velocity }) => {
                const power = swipePower(offset.x, velocity.x);
                if (power < -6000) paginate(1);
                else if (power > 6000) paginate(-1);
              }}
              className="cursor-grab active:cursor-grabbing select-none"
            >
              <div className="bg-white/90 backdrop-blur-sm shadow-xl border border-pink-100 overflow-hidden">
                {memory.image && (
                  <div
                    className="w-full bg-pink-50 flex items-center justify-center"
                    style={{ height: "clamp(140px, 28vh, 260px)" }}
                  >
                    <Image
                      src={memory.image}
                      alt={memory.title}
                      width={500}
                      height={260}
                      className="max-h-full max-w-full object-contain"
                      draggable={false}
                      unoptimized
                    />
                  </div>
                )}
                <div className="p-5 sm:p-7">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1.5">
                    {memory.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {memory.description}
                  </p>
                  <motion.div
                    className="mt-3 text-xl sm:text-2xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {memory.emoji ?? "🌷"}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrows + dots */}
        <div className="flex items-center justify-center gap-6">
          <motion.button
            onClick={() => paginate(-1)}
            disabled={activeIndex === 0}
            className="w-9 h-9 rounded-full bg-white shadow border border-pink-100 flex items-center justify-center text-gray-500 disabled:opacity-30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ‹
          </motion.button>
          <div className="flex gap-2">
            {memories.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setPage([i, i > activeIndex ? 1 : -1])}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === activeIndex ? "bg-rose-400" : "bg-pink-200"
                }`}
                whileHover={{ scale: 1.3 }}
              />
            ))}
          </div>
          <motion.button
            onClick={() => paginate(1)}
            disabled={activeIndex === memories.length - 1}
            className="w-9 h-9 rounded-full bg-white shadow border border-pink-100 flex items-center justify-center text-gray-500 disabled:opacity-30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ›
          </motion.button>
        </div>

        {activeIndex === 0 && (
          <motion.p
            className="text-xs text-gray-400 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Swipe or use arrows to explore
          </motion.p>
        )}

        {/* Continue */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 text-xs mb-2">✨ The best is yet to come</p>
          {onContinue && (
            <motion.button
              onClick={onContinue}
              className="inline-block text-gray-500 hover:text-gray-700 transition-colors"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="text-xs block mt-0.5">Continue</span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
