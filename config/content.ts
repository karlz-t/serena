/**
 * PERSONALIZATION CONFIG
 * Edit all the content here before deploying to customize the experience for her
 */

export const config = {
  // === PERSONAL INFO ===
  herName: "Serena",
  yourName: "Karol",

  // === OPENING SCENE ===
  openingGreeting: "Hi Serena ❤️",
  openingSubtitle: "I made something special for you...",
  openingButtonText: "Begin Our Journey",

  // === SECTION 1: GARDEN OF MEMORIES ===
  memories: [
    {
      title: "The Day We Met",
      description:
        "I remember seeing you for the first time. You had this warm smile that just made everything feel right.",
      image: "/images/memory-1.jpg",
      emoji: "🍧",
    },
    {
      title: "Our Funniest Moment",
      description:
        "When we dance together. Forgetting ourselves and just having fun. I love how you can make me laugh like that.",
      image: "/images/memory-2.jpg",
      emoji: "💃🏽🪩",
    },
    {
      title: "My Favorite Thing About You",
      description:
        "The way you light up my space. Just having you around makes everything better.",
      image: "/images/memory-3.jpg",
      emoji: "👫🏾",
    },
    {
      title: "Moments I Never Want To Forget",
      description:
        "Those late night calls when we just talked for hours. Time seemed to stop and all that mattered was you.",
      image: "/images/memory-4.jpg",
      emoji: "📹📲",
    },
  ],

  // === SECTION 2: CONSTELLATION OF QUALITIES ===
  qualities: [
    {
      label: "Your Smile",
      description: "It lights up every room and makes my heart skip a beat",
    },
    {
      label: "Your Kindness",
      description: "The way you care for others shows your beautiful soul",
    },
    {
      label: "Your Intelligence",
      description: "I love how you see the world with such depth and clarity",
    },
    {
      label: "Your Sense of Humor",
      description: "You make me laugh in ways I never expected",
    },
    {
      label: "The Way You Make Me Feel",
      description: "Like I can be completely myself around you",
    },
  ],

  // === SECTION 3: HEART COLLECTION GAME ===
  heartMessages: [
    "You make my days brighter.",
    "I always look forward to talking to you.",
    "You make ordinary moments special.",
    "Being with you feels easy.",
    "You inspire me to be better.",
    "Every moment with you is precious.",
  ],
  gameCompleteMessage: "One more thing...",

  // === SECTION 4: BIBLE VERSE ===
  bibleVerse: "1 Corinthians 13:4-7",
  bibleMessage: "Love is patient, love is kind...",

  // === SECTION 5: FINAL MOMENT ===
  finalMessages: [
    "Every moment with you has meant more to me than you know.",
    "You make me smile.",
    "You make me happy.",
    "You make me excited about what comes next.",
  ],

  // === SECTION 6: THE PROPOSAL ===
  proposalName: "Serena",
  proposalText: "Will you be my girlfriend?",
  yesButtonText: "YES 💖",
  absolutelyButtonText: "ABSOLUTELY YES 💕",
  successMessage: "Thank you for being My Love ❤️",

  // === FINAL SCREEN ===
  finalScreenTitle: "Thank you for being part of this journey.",
  finalScreenMessage: "I can't wait to create many more memories with you.",

  // === PHOTO GALLERY ===
  galleryPhotos: [
    { url: "/images/photo-1.jpg", caption: "Us Cuddling - 1" },
    { url: "/images/photo-2.jpg", caption: "Us Cuddling - 2" },
    { url: "/images/photo-3.jpg", caption: "Us Cuddling - 3" },
    { url: "/images/bear-love.gif", caption: "Us Cuddling - 4" }
    // Add your photos here: { url: "/images/photo-1.jpg", caption: "Optional caption" }
    // { url: "/images/photo-1.jpg", caption: "Us at the coffee shop" },
    // { url: "/images/photo-2.jpg", caption: "That perfect sunset" },
  ],

  // === AUDIO ===
  backgroundMusicUrl: "/music.mp3", // Add your music file URL here (MP3, WAV, etc.)

  // === ANIMATION SETTINGS ===
  particleCount: {
    mobile: 20,
    desktop: 50,
  },
};
