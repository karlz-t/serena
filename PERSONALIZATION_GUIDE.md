# 💕 Our Little Journey - Personalization Guide

Welcome to your romantic proposal website! This guide will help you customize it perfectly for your special someone.

## Quick Start

### 1. **Edit Her Information**

Open `config/content.ts` and update the following:

```typescript
herName: "Sarah",           // Change to her name
yourName: "You",            // Your name (optional)
```

### 2. **Customize the Content**

All text, messages, and memories are in `config/content.ts`. Simply find the section you want to edit and update the strings:

#### Opening Scene
- `openingGreeting` - The welcome message
- `openingSubtitle` - The subtitle
- `openingButtonText` - Button text

#### Garden of Memories (Section 1)
Edit the `memories` array with your personal memories:

```typescript
memories: [
  {
    title: "The Day We Met",
    description: "Your story here...",
    image: "/images/memory-1.jpg",  // Add image URL when ready
  },
  // ... more memories
]
```

#### Constellation of Qualities (Section 2)
Update the `qualities` array with what you admire about her:

```typescript
qualities: [
  {
    label: "Your Smile",
    description: "Why this quality makes you special...",
  },
  // ... more qualities
]
```

#### Heart Collection Game (Section 3)
Customize the messages revealed when hearts are collected:

```typescript
heartMessages: [
  "You make my days brighter.",
  "I always look forward to talking to you.",
  // ... more messages
]
```

#### Bible Verse (Section 4)
```typescript
bibleVerse: "1 Corinthians 13:4-7",
bibleMessage: "Your meaningful message here...",
```

#### Proposal & Final Screens
```typescript
proposalName: "Sarah",
proposalText: "Will you be my girlfriend? ❤️",
yesButtonText: "YES 💖",
absolutelyButtonText: "ABSOLUTELY YES 💕",
successMessage: "You just made me the happiest guy in the world ❤️",
finalScreenTitle: "Thank you for being part of this journey.",
finalScreenMessage: "I can't wait to create many more memories with you.",
```

### 3. **Add Photos**

In `config/content.ts`, find the `galleryPhotos` array and add your photos:

```typescript
galleryPhotos: [
  { 
    url: "/images/photo-1.jpg", 
    caption: "Our first date at the coffee shop" 
  },
  { 
    url: "/images/photo-2.jpg", 
    caption: "That perfect sunset moment" 
  },
  // Add more photos...
]
```

**To add photos:**
1. Place your image files in the `/public/images/` folder
2. Update the `url` paths in `galleryPhotos` array
3. Add optional captions for each photo

### 4. **Add Background Music**

1. Add your romantic audio file to `/public/audio/` (MP3, WAV, or OGG)
2. In `config/content.ts`, update:

```typescript
backgroundMusicUrl: "/audio/your-song.mp3",
```

The music will:
- Start muted (user can toggle with the button)
- Loop continuously
- Remember the user's preference

### 5. **Adjust Animation Performance**

If the site feels slow on mobile, adjust particle counts in `config/content.ts`:

```typescript
particleCount: {
  mobile: 20,    // Lower = fewer particles, faster performance
  desktop: 50,
}
```

## File Structure

```
/config/content.ts              ← ALL EDITABLE CONTENT (edit this!)
/components/sections/
  ├── OpeningScene.tsx          ← Intro scene
  ├── GardenOfMemories.tsx       ← Memory cards
  ├── ConstellationOfQualities.tsx ← Clickable stars
  ├── HeartCollectionGame.tsx    ← Interactive game
  ├── BibleScripture.tsx         ← Verse section
  ├── FinalMoment.tsx            ← Proposal moment
  ├── SuccessCelebration.tsx     ← Celebration screen
  ├── PhotoGallery.tsx           ← Photo display
  └── FinalScreen.tsx            ← Closing screen
/components/MusicToggle.tsx     ← Background music control
/lib/animations.tsx             ← Reusable animations
/public/images/                 ← Add your photos here
/public/audio/                  ← Add your music here
```

## Deployment

When you're ready to share:

1. **Finalize all content** in `config/content.ts`
2. **Add photos and music** to `/public/`
3. **Push to GitHub** (if connected)
4. **Deploy to Vercel** with the "Publish" button

The site will be live at your Vercel URL!

## Pro Tips

### Colors
The site uses romantic pinks, purples, and gold. To change the color theme, edit the Tailwind classes in the component files:
- `from-pink-500` → Change pink shades
- `from-purple-900` → Change purple shades
- `from-yellow-300` → Change gold accents

### Fonts
The site uses the default Next.js fonts. Both titles and body text are elegant and modern.

### Mobile Experience
- The site is fully responsive
- Test on mobile before sharing
- Touch interactions work smoothly
- Animations adapt to smaller screens

### Development Mode
When running `pnpm dev`, there's a section navigator on the left (bottom left). Use it to jump between sections while testing.

## Customization Ideas

- Add more memories (up to 10)
- Include inside jokes in heart messages
- Create custom qualities list
- Add a personal poem to the bible section
- Include more photos in the gallery
- Change emoji and decorative elements

## Need Help?

If anything breaks:
1. Check that all file paths are correct
2. Make sure image URLs in `config/content.ts` point to files in `/public/`
3. Verify syntax (especially commas in arrays)
4. Use the development section navigator to test each page

---

**Made with ❤️ for someone special.** This experience is fully customizable and ready to make her smile, laugh, and say yes! 💕
