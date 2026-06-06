# Design: Image Optimization & Music Default Muted

**Date:** 2026-06-06
**Status:** Approved

---

## Overview

Two independent improvements to the romantic proposal website:

1. **Image optimization** — images are currently served unoptimized (full size, original format). Enable Next.js image optimization on Netlify to get WebP/AVIF serving, responsive sizing, and CDN caching.
2. **Music default muted** — music currently tries to autoplay on load (browsers block this anyway). Default to muted and show a first-visit toast nudge above the music button so the user knows music is available.

---

## Part 1: Image Optimization

### Problem

`next.config.mjs` has `images: { unoptimized: true }` globally, and both `GardenOfMemories.tsx` and `PhotoGallery.tsx` pass `unoptimized` to their `Image` components. This means full-size JPGs/PNGs are served to every device with no compression, no format conversion, and no CDN caching — causing slow load times especially on mobile.

### Approach

Enable Next.js Image Optimization by removing `unoptimized: true` from the global config and individual components. Netlify's Next.js adapter supports this natively — it serves images as WebP/AVIF, resizes per device, and caches at the CDN edge.

**Exception:** `bear-love.gif` must keep `unoptimized` because Next.js strips GIF animation during optimization. The `PhotoGallery` component will detect `.gif` files by extension and pass `unoptimized` only for those.

### Changes

**`next.config.mjs`**
- Remove `images: { unoptimized: true }` from the config object.

**`components/sections/GardenOfMemories.tsx`**
- Remove `unoptimized` prop from the `Image` component.
- Add `sizes="(max-width: 768px) 100vw, 500px"` so the browser requests the right resolution per device.
- Add `priority` to the image when `activeIndex === 0` (first card is above the fold).

**`components/sections/PhotoGallery.tsx`**
- Remove the blanket `unoptimized` prop from the `Image` component.
- Add per-image `unoptimized` check: `photo.url.endsWith('.gif')`.
- Add `sizes="(max-width: 768px) 50vw, 33vw"` matching the 2-col mobile / 3-col desktop grid.

---

## Part 2: Music — Default Muted + Toast Nudge

### Problem

`MusicToggle.tsx` initializes `isMuted` to `false`, meaning music is intended to autoplay. Browsers block autoplay for unmuted audio, so in practice the button shows a "mute" icon even though nothing is playing — confusing. There is also no signal to the user that music is available.

### Approach

Default `isMuted` to `true`. On first visit (no saved preference in `localStorage`), show a small floating toast above the music button: "🎵 Tap to play music". The toast auto-fades after 4 seconds and also dismisses immediately when the user clicks the music button.

On subsequent visits the user's saved preference is restored as before — no toast is shown since they've already seen it.

### Changes

**`components/MusicToggle.tsx`**

- Change `useState(false)` → `useState(true)` for `isMuted`.
- Add `showNudge` state (`boolean`), defaulting to `false`.
- In the existing `useEffect` that reads `localStorage`: if `savedMuted === null` (first visit), set `showNudge(true)`.
- In `toggleMusic`: call `setShowNudge(false)` to dismiss the toast on interaction.
- Add a `useEffect` that sets a 4-second timeout to hide the nudge automatically.
- Render the toast as a `motion.div` positioned `fixed bottom-28 right-4` (above the music button, enough clearance above `bottom-8` button + its padding), animated with `framer-motion` fade-in/out. Text: "🎵 Tap to play music". Small pill style matching the button's pink gradient.

---

## Constraints & Non-Goals

- No changes to audio file, music URL, or loop behavior.
- No changes to localStorage key names or preference persistence logic beyond adding the first-visit check.
- No external image CDN or build-time image processing scripts.
- GIF animation must be preserved.

---

## Files Affected

| File | Change |
|---|---|
| `next.config.mjs` | Remove `images: { unoptimized: true }` |
| `components/sections/GardenOfMemories.tsx` | Remove `unoptimized`, add `sizes`, conditional `priority` |
| `components/sections/PhotoGallery.tsx` | Conditional `unoptimized` for GIFs, add `sizes` |
| `components/MusicToggle.tsx` | Default muted, first-visit toast nudge |
