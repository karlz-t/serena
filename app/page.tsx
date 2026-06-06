"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OpeningScene } from "@/components/sections/OpeningScene";
import { GardenOfMemories } from "@/components/sections/GardenOfMemories";
import { ConstellationOfQualities } from "@/components/sections/ConstellationOfQualities";
import { HeartCollectionGame } from "@/components/sections/HeartCollectionGame";
import { BibleScripture } from "@/components/sections/BibleScripture";
import { FinalMoment } from "@/components/sections/FinalMoment";
import { SuccessCelebration } from "@/components/sections/SuccessCelebration";
import { PhotoGallery } from "@/components/sections/PhotoGallery";
import { FinalScreen } from "@/components/sections/FinalScreen";
import { MusicToggle } from "@/components/MusicToggle";

type SectionType =
  | "opening"
  | "garden"
  | "constellation"
  | "game"
  | "bible"
  | "final-moment"
  | "success"
  | "gallery"
  | "final-screen";

const SECTION_ORDER: SectionType[] = [
  "opening", "garden", "constellation", "game", "bible",
  "final-moment", "success", "gallery", "final-screen",
];

export default function Page() {
  const [currentSection, setCurrentSection] = useState<SectionType>("opening");
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchStartX = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  const handleSectionComplete = (nextSection: SectionType) => {
    setCurrentSection(nextSection);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    isSwiping.current = false;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isSwiping.current) return;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    // Only trigger if clearly vertical and past threshold
    if (Math.abs(deltaY) < 60 || Math.abs(deltaY) < Math.abs(deltaX) * 1.5) return;
    isSwiping.current = true;
    const idx = SECTION_ORDER.indexOf(currentSection);
    if (deltaY > 0 && idx < SECTION_ORDER.length - 1) {
      handleSectionComplete(SECTION_ORDER[idx + 1]);
    } else if (deltaY < 0 && idx > 0) {
      handleSectionComplete(SECTION_ORDER[idx - 1]);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case "opening":
        return <OpeningScene onBegin={() => handleSectionComplete("garden")} />;
      case "garden":
        return <GardenOfMemories onContinue={() => handleSectionComplete("constellation")} />;
      case "constellation":
        return <ConstellationOfQualities onContinue={() => handleSectionComplete("game")} />;
      case "game":
        return <HeartCollectionGame onComplete={() => handleSectionComplete("bible")} />;
      case "bible":
        return <BibleScripture onContinue={() => handleSectionComplete("final-moment")} />;
      case "final-moment":
        return <FinalMoment onContinue={() => handleSectionComplete("success")} />;
      case "success":
        return <SuccessCelebration onContinue={() => handleSectionComplete("gallery")} />;
      case "gallery":
        return <PhotoGallery onContinue={() => handleSectionComplete("final-screen")} />;
      case "final-screen":
        return <FinalScreen />;
      default:
        return <OpeningScene onBegin={() => handleSectionComplete("garden")} />;
    }
  };

  return (
    <main
      ref={containerRef}
      className="relative w-full bg-white overflow-x-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>

      {/* Music toggle */}
      <MusicToggle />
    </main>
  );
}
