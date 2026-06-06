"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { config } from "@/config/content";

export function MusicToggle() {
  const [isMuted, setIsMuted] = useState(true);
  const [hasAudio, setHasAudio] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (config.backgroundMusicUrl) {
      setHasAudio(true);
    }

    const savedMuted = localStorage.getItem("music-muted");
    if (savedMuted !== null) {
      setIsMuted(JSON.parse(savedMuted));
    } else {
      setShowNudge(true);
    }
  }, []);

  useEffect(() => {
    if (!showNudge) return;
    const timer = setTimeout(() => setShowNudge(false), 4000);
    return () => clearTimeout(timer);
  }, [showNudge]);

  useEffect(() => {
    if (!audioRef.current || !hasAudio) return;

    if (isMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }

    localStorage.setItem("music-muted", JSON.stringify(isMuted));
  }, [isMuted, hasAudio]);

  const toggleMusic = () => {
    setShowNudge(false);
    setIsMuted(!isMuted);
  };

  if (!hasAudio) {
    return null;
  }

  return (
    <>
      <audio ref={audioRef} src={config.backgroundMusicUrl} loop playsInline />

      <AnimatePresence>
        {showNudge && (
          <motion.div
            className="fixed bottom-28 right-4 z-40 bg-gradient-to-br from-pink-500 to-rose-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            🎵 Tap to play music
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="fixed bottom-8 right-8 z-40 bg-gradient-to-br from-pink-500 to-rose-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        title={isMuted ? "Unmute music" : "Mute music"}
      >
        <motion.div
          animate={{ rotate: isMuted ? 0 : [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </motion.div>
      </motion.button>
    </>
  );
}
