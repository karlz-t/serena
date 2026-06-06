# Image Optimization & Music Default Muted Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve images in optimized formats via Netlify's Next.js adapter, and default music to muted with a first-visit toast nudge.

**Architecture:** Four isolated file edits — remove the global `unoptimized` flag, add per-image responsive sizing, and rewrite `MusicToggle` to start muted and show a pill toast to new visitors. No new files, no new dependencies.

**Tech Stack:** Next.js 16, React 19, Framer Motion, Tailwind CSS, TypeScript, pnpm

---

## File Map

| File | Change |
|---|---|
| `next.config.mjs` | Remove `images: { unoptimized: true }` |
| `components/sections/GardenOfMemories.tsx` | Remove `unoptimized`, add `sizes`, add conditional `priority` |
| `components/sections/PhotoGallery.tsx` | Conditional `unoptimized` for GIFs only, add `sizes` |
| `components/MusicToggle.tsx` | Default muted, first-visit toast nudge |

---

## Task 1: Remove global unoptimized flag

**Files:**
- Modify: `next.config.mjs`

- [ ] **Step 1: Edit next.config.mjs**

Replace the file content with:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build
```

Expected: build completes without errors. If Netlify's Next.js adapter isn't configured, image optimization will silently fall back to unoptimized — that's fine for now and won't break the build.

- [ ] **Step 3: Commit**

```bash
git add next.config.mjs
git commit -m "feat: enable Next.js image optimization on Netlify"
```

---

## Task 2: Fix GardenOfMemories images

**Files:**
- Modify: `components/sections/GardenOfMemories.tsx:97-105`

- [ ] **Step 1: Update the Image component**

Find this block inside `GardenOfMemories.tsx` (around line 97):

```tsx
<Image
  src={memory.image}
  alt={memory.title}
  width={500}
  height={260}
  className="max-h-full max-w-full object-contain"
  draggable={false}
  unoptimized
/>
```

Replace it with:

```tsx
<Image
  src={memory.image}
  alt={memory.title}
  width={500}
  height={260}
  className="max-h-full max-w-full object-contain"
  draggable={false}
  sizes="(max-width: 768px) 100vw, 500px"
  priority={activeIndex === 0}
/>
```

- `sizes` tells the browser the rendered width so it requests the correct resolution.
- `priority` preloads the first image (the one visible on load). It evaluates to `false` for subsequent cards, which is fine — they load lazily.

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build
```

Expected: build succeeds. No type errors — `priority` and `sizes` are valid `next/image` props.

- [ ] **Step 3: Commit**

```bash
git add components/sections/GardenOfMemories.tsx
git commit -m "feat: add responsive sizes and priority to memory images"
```

---

## Task 3: Fix PhotoGallery images

**Files:**
- Modify: `components/sections/PhotoGallery.tsx:57-63`

- [ ] **Step 1: Update the Image component**

Find this block inside `PhotoGallery.tsx` (around line 57):

```tsx
<Image
  src={photo.url}
  alt={photo.caption || ""}
  fill
  className="object-cover"
  unoptimized
/>
```

Replace it with:

```tsx
<Image
  src={photo.url}
  alt={photo.caption || ""}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 50vw, 33vw"
  unoptimized={photo.url.endsWith('.gif')}
/>
```

- `sizes` matches the grid: 2 columns on mobile (each ~50vw), 3 columns on desktop (each ~33vw).
- `unoptimized` is now conditional — only true for `.gif` files. Next.js strips GIF animation during optimization, so GIFs must bypass it.

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build
```

Expected: build succeeds. `unoptimized` accepts `boolean`, and `photo.url.endsWith('.gif')` returns `boolean` — no type errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/PhotoGallery.tsx
git commit -m "feat: add responsive sizes, preserve GIF animation in gallery"
```

---

## Task 4: Default music to muted with first-visit toast

**Files:**
- Modify: `components/MusicToggle.tsx`

- [ ] **Step 1: Rewrite MusicToggle.tsx**

Replace the entire file with:

```tsx
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
```

**What changed vs. the original:**
- `useState(true)` — starts muted instead of unmuted.
- `showNudge` state — `true` only when there is no saved preference in `localStorage` (first visit). Returning users who consciously set a preference never see the toast.
- Auto-dismiss `useEffect` — clears the nudge after 4 seconds via a `setTimeout`, cleaned up on unmount.
- `toggleMusic` calls `setShowNudge(false)` — dismisses the toast immediately when the user interacts.
- `AnimatePresence` + `motion.div` toast — pill floating at `bottom-28 right-4`, fades in/out.
- `AnimatePresence` imported from `framer-motion` (already a project dependency).

- [ ] **Step 2: Clear localStorage and test in dev**

```bash
pnpm dev
```

Open `http://localhost:3000` in the browser. Open DevTools → Application → Local Storage → clear `music-muted` key if present.

Reload the page. Expected:
- Music button shows `VolumeX` (muted) icon.
- After ~1 second, a pink pill toast appears bottom-right: "🎵 Tap to play music".
- Toast auto-disappears after 4 seconds.
- Clicking the button before 4 seconds dismisses the toast immediately and toggles to `Volume2` (playing).

Reload a second time without clearing localStorage. Expected:
- Toast does NOT appear (preference already saved).
- Music state matches whatever was saved.

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm build
```

Expected: build succeeds with no type errors.

- [ ] **Step 4: Commit**

```bash
git add components/MusicToggle.tsx
git commit -m "feat: default music to muted, show first-visit unmute nudge"
```
