"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/config/content";

interface ConstellationOfQualitiesProps {
  onContinue?: () => void;
}

// Positions as % of the container (x, y)
const STAR_POSITIONS = [
  { x: 20, y: 25 },
  { x: 52, y: 8  },
  { x: 82, y: 25 },
  { x: 70, y: 72 },
  { x: 28, y: 72 },
];

// Pairs of star indices to connect with lines
const CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2],
];


export function ConstellationOfQualities({ onContinue }: ConstellationOfQualitiesProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const qualities = config.qualities;

  return (
    <motion.section
      className="h-[100dvh] w-full py-6 sm:py-16 px-6 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background starfield — deterministic positions to avoid hydration mismatch */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 31 + 7) % 100}%`,
              top: `${(i * 17 + 3) % 100}%`,
              width: i % 3 === 0 ? 2 : 1,
              height: i % 3 === 0 ? 2 : 1,
            }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{
              duration: 2 + (i % 4),
              repeat: Infinity,
              delay: (i % 7) * 0.4,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto w-full relative z-10 flex flex-col flex-1 min-h-0 px-4">
        {/* Centered group: title + constellation + detail card */}
        <div className="flex-1 flex flex-col justify-center gap-5">
        {/* Title */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-3 sm:mb-4">
            Constellations of You
          </h2>
          <p className="text-purple-200 text-sm sm:text-lg">
            Tap the stars to reveal what I admire about you
          </p>
        </motion.div>

        {/* Constellation canvas */}
        <div className="relative w-full flex-shrink-0" style={{ height: 250 }}>
          {/* Connecting lines via SVG */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {CONNECTIONS.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={STAR_POSITIONS[a].x}
                y1={STAR_POSITIONS[a].y}
                x2={STAR_POSITIONS[b].x}
                y2={STAR_POSITIONS[b].y}
                stroke="rgba(167, 139, 250, 0.35)"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 + i * 0.15 }}
              />
            ))}
          </svg>

          {/* Star buttons */}
          {qualities.map((_, index) => {
            const pos = STAR_POSITIONS[index];
            if (!pos) return null;
            const isSelected = selectedIndex === index;

            return (
              <motion.button
                key={index}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onClick={() => setSelectedIndex(isSelected ? null : index)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.12 }}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.85 }}
              >
                {/* Invisible tap target */}
                <div className="w-10 h-10 flex items-center justify-center">
                  <motion.span
                    style={{
                      display: "inline-block",
                      lineHeight: 1,
                      /* 4-pointed star character */
                    }}
                    animate={
                      isSelected
                        ? {
                            fontSize: 22,
                            color: "#fde047",
                            textShadow: [
                              "0 0 6px rgba(253,224,71,0.8), 0 0 14px rgba(253,224,71,0.6)",
                              "0 0 12px rgba(253,224,71,1), 0 0 28px rgba(253,224,71,0.9)",
                              "0 0 6px rgba(253,224,71,0.8), 0 0 14px rgba(253,224,71,0.6)",
                            ],
                          }
                        : {
                            fontSize: 13,
                            color: "#ffffff",
                            textShadow: [
                              "0 0 4px rgba(255,255,255,0.6), 0 0 8px rgba(255,255,255,0.3)",
                              "0 0 8px rgba(255,255,255,1), 0 0 16px rgba(255,255,255,0.6)",
                              "0 0 4px rgba(255,255,255,0.6), 0 0 8px rgba(255,255,255,0.3)",
                            ],
                          }
                    }
                    transition={{ duration: 1.8 + (index * 0.3), repeat: Infinity }}
                  >
                    ✦
                  </motion.span>
                </div>

              </motion.button>
            );
          })}
        </div>

        {/* Quality detail card — fixed height slot so constellation never shifts */}
        <div style={{ minHeight: 120 }} className="flex items-start">
          <AnimatePresence mode="wait">
            {selectedIndex !== null && (
              <motion.div
                key={selectedIndex}
                className="w-full bg-white/10 backdrop-blur-md border border-purple-400/30 rounded-2xl p-5 sm:p-7 text-center"
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5">
                  {qualities[selectedIndex].label}
                </h3>
                <p className="text-purple-100 text-sm leading-relaxed">
                  {qualities[selectedIndex].description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>{/* end centered group */}

        {/* Hint / Continue — pinned to bottom */}
        <div className="mt-auto pb-4 text-center">
          {selectedIndex === null ? (
            <motion.p
              className="text-purple-400 text-xs sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              Tap a star to explore
            </motion.p>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-purple-300 text-xs sm:text-sm mb-3">More wonders await</p>
              {onContinue && (
                <motion.button
                  onClick={onContinue}
                  className="inline-block text-purple-300 hover:text-white transition-colors"
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
          )}
        </div>
      </div>
    </motion.section>
  );
}
