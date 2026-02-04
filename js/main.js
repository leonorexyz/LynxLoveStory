/**
 * LynxLoveStory - Main Entry Point
 * 
 * This file initializes all modules in the correct order.
 * Edit individual modules for specific functionality:
 * 
 * - config.js      → Data (PIN, playlist, love letters, timeline, quotes)
 * - utils.js       → Shared utility functions
 * - accessibility.js → Reduced motion preferences
 * - carousel.js    → Hero image carousel
 * - lightbox.js    → All lightbox systems (love letters, hero, about)
 * - gallery.js     → Love letters gallery
 * - player.js      → YouTube music player
 * - animations.js  → Typewriter, scroll reveal, particles
 * - lockscreen.js  → PIN lock screen
 * - timeline.js    → Timeline and quotes rendering
 */

import { initAccessibility } from './accessibility.js';
import { initCarousel } from './carousel.js';
import { openHeroLightbox, initLightbox } from './lightbox.js';
import { initGallery } from './gallery.js';
import { initPlayer } from './player.js';
import { initAnimations } from './animations.js';
import { initLockscreen } from './lockscreen.js';
import { initTimeline } from './timeline.js';

// Initialize modules in correct order
function init() {
  // 1. Setup accessibility preferences first
  initAccessibility();

  // 2. Initialize carousel (needs to be before lightbox for triggers)
  initCarousel(openHeroLightbox);

  // 3. Initialize lightbox systems
  initLightbox();

  // 4. Initialize gallery (depends on lightbox)
  initGallery();

  // 5. Initialize music player
  initPlayer();

  // 6. Initialize animations
  initAnimations();

  // 7. Initialize timeline and quotes
  initTimeline();

  // 8. Initialize lockscreen (triggers other initializations on unlock)
  initLockscreen();
}

// Start the app
init();
