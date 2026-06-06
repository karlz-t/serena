"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/config/content";

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
}

interface HeartCollectionGameProps {
  onComplete?: () => void;
}

export function HeartCollectionGame({ onComplete }: HeartCollectionGameProps) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [collected, setCollected] = useState<Set<number>>(new Set());
  const [gameComplete, setGameComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heartIdRef = useRef(0);
  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Generate floating hearts
  useEffect(() => {
    if (gameComplete) return;

    const interval = setInterval(() => {
      if (hearts.length < config.heartMessages.length) {
        const pos = getRandomPosition();
        const newHeart: FloatingHeart = {
          id: heartIdRef.current++,
          x: pos.x,
          y: pos.y,
        };
        setHearts((prev) => [...prev, newHeart]);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [hearts.length, gameComplete]);

  // Check if all hearts collected — delay popup so the last message can be read
  useEffect(() => {
    if (
      collected.size === config.heartMessages.length &&
      config.heartMessages.length > 0
    ) {
      completeTimerRef.current = setTimeout(() => setGameComplete(true), 4000);
    }
    return () => {
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    };
  }, [collected]);

  const handleHeartClick = (id: number) => {
    if (!collected.has(id)) {
      setCollected((prev) => new Set([...prev, id]));
    }
  };

  // Client-side only: generate positions
  const getRandomPosition = () => {
    const el = containerRef.current;
    if (!el) return { x: 0, y: 0 };
    return {
      x: Math.random() * (el.clientWidth - 60),
      y: Math.random() * (el.clientHeight - 60),
    };
  };

  return (
    <motion.section
      className="h-[100dvh] w-full bg-gradient-to-b from-white via-rose-50 to-white relative overflow-hidden flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Section title */}
      <motion.div
        className="text-center pt-5 pb-3 sm:pt-14 sm:pb-7 px-6 relative z-20 flex-shrink-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-3">
          Collect the Hearts
        </h2>
        <p className="text-sm sm:text-lg text-gray-500 mb-4 px-4">
          Click on the floating hearts to reveal sweet messages
        </p>
        <p className="text-rose-500 font-semibold text-sm sm:text-base">
          {collected.size} / {config.heartMessages.length} hearts collected
        </p>
      </motion.div>

      {/* Game container */}
      <div
        ref={containerRef}
        className="relative flex-1 min-h-0 pointer-events-auto overflow-hidden"
      >
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.button
              key={heart.id}
              className="absolute w-12 h-12 text-4xl cursor-pointer group z-30 pointer-events-auto"
              initial={{
                x: heart.x,
                y: heart.y,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                y: heart.y - 200,
                opacity: collected.has(heart.id) ? 0 : 1,
              }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
              transition={{
                duration: collected.has(heart.id) ? 4.5 : 8,
                ease: "easeInOut",
              }}
              onClick={() => handleHeartClick(heart.id)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
              onAnimationComplete={() => {
                if (!collected.has(heart.id)) {
                  setHearts((prev) => prev.filter((h) => h.id !== heart.id));
                }
              }}
            >
              {/* Glowing effect */}
              <motion.div
                className="absolute inset-0 bg-rose-400 rounded-full opacity-0 group-hover:opacity-50"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
              <span className="relative z-10">❤️</span>

              {/* Collected message tooltip */}
              <AnimatePresence>
                {collected.has(heart.id) && (
                  <motion.div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-rose-500 text-white px-3 py-2 rounded-full text-sm font-semibold pointer-events-none"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }}
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.8, delay: 3 } }}
                  >
                    {
                      config.heartMessages[
                        Array.from(collected).indexOf(heart.id)
                      ]
                    }
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Game complete message */}
      <AnimatePresence>
        {gameComplete && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-12 text-center shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                className="text-6xl mb-6"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                💕
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {config.gameCompleteMessage}
              </h3>
              <p className="text-gray-500 text-lg mb-6">
                Keep scrolling to discover what awaits...
              </p>
              {onComplete && (
                <motion.button
                  onClick={onComplete}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue the Journey
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
