"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { config } from "@/config/content";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface PhotoGalleryProps {
  onContinue?: () => void;
}

export function PhotoGallery({ onContinue }: PhotoGalleryProps) {
  const photos = config.galleryPhotos || [];

  return (
    <motion.section
      className="h-[100dvh] w-full py-6 sm:py-16 px-6 bg-gradient-to-b from-white via-pink-50 to-white flex flex-col justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          className="text-center mb-4 sm:mb-12 flex-shrink-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Our Photo Gallery
          </h2>
          <p className="text-gray-500 text-lg">
            Moments frozen in time, memories in our hearts
          </p>
        </motion.div>

        {/* Photos grid */}
        {photos.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
                whileHover={{ y: -10 }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={photo.url}
                    alt={photo.caption || ""}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Caption overlay */}
                {photo.caption && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <p className="text-white font-semibold">{photo.caption}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-16 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Our memories await!
            </h3>
            <p className="text-gray-600">
              Add your favorite photos to the gallery in the config file. Edit{" "}
              <code className="bg-white px-2 py-1 rounded font-mono text-sm">
                config/content.ts
              </code>
              {" "}and add URLs to the{" "}
              <code className="bg-white px-2 py-1 rounded font-mono text-sm">
                galleryPhotos
              </code>{" "}
              array.
            </p>
          </motion.div>
        )}

        {/* Continue hint */}
        <motion.div
          className="mt-4 sm:mt-12 text-center flex-shrink-0"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm mb-3">One more moment awaits...</p>
          {onContinue && (
            <motion.button
              onClick={onContinue}
              className="inline-block text-gray-500 hover:text-gray-700 transition-colors"
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
