"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { config } from "@/config/content";

export function MusicToggle() {
  const [isMuted, setIsMuted] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Check if audio URL is provided
    if (config.backgroundMusicUrl) {
      setHasAudio(true);
    }

    // Load muted state from localStorage
    const savedMuted = localStorage.getItem("music-muted");
    if (savedMuted !== null) {
      setIsMuted(JSON.parse(savedMuted));
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current || !hasAudio) return;

    if (isMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked by browser
      });
    }

    // Save preference to localStorage
    localStorage.setItem("music-muted", JSON.stringify(isMuted));
  }, [isMuted, hasAudio]);

  const toggleMusic = () => {
    setIsMuted(!isMuted);
  };

  if (!hasAudio) {
    return null;
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={config.backgroundMusicUrl}
        loop
        playsInline
      />

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
          {isMuted ? (
            <VolumeX size={24} />
          ) : (
            <Volume2 size={24} />
          )}
        </motion.div>
      </motion.button>
    </>
  );
}
