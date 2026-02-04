import { loveLetters } from './config.js';
import { clamp, restoreBodyScroll } from './utils.js';
import { heroCarouselLightboxTriggers, heroCarouselSetSlide, heroCarouselGetIndex, pauseHeroCarouselAutoplay, resumeHeroCarouselAutoplay } from './carousel.js';

// Lightbox selectors for body scroll management
const LIGHTBOX_SELECTORS = ['#loveLightbox', '#heroLightbox', '#aboutLightbox'];

// DOM Elements
const loveLightboxEl = document.getElementById('loveLightbox');
const lightboxImageEl = document.getElementById('lightboxImage');
const lightboxCaptionEl = document.getElementById('lightboxCaption');
const lightboxCloseBtn = document.getElementById('lightboxClose');
const lightboxPrevBtn = document.getElementById('lightboxPrev');
const lightboxNextBtn = document.getElementById('lightboxNext');
const lightboxStageEl = document.getElementById('lightboxStage');
const lightboxZoomOutBtn = document.getElementById('lightboxZoomOut');
const lightboxZoomResetBtn = document.getElementById('lightboxZoomReset');
const lightboxZoomInBtn = document.getElementById('lightboxZoomIn');

const heroLightboxEl = document.getElementById('heroLightbox');
const heroLightboxImageEl = document.getElementById('heroLightboxImage');
const heroLightboxCloseBtn = document.getElementById('heroLightboxClose');
const heroLightboxPrevBtn = document.getElementById('heroLightboxPrev');
const heroLightboxNextBtn = document.getElementById('heroLightboxNext');
const heroCarouselEl = document.querySelector('[data-hero-carousel]');

const aboutImageTriggers = document.querySelectorAll('.about-img-trigger');
const aboutLightboxEl = document.getElementById('aboutLightbox');
const aboutLightboxImageEl = document.getElementById('aboutLightboxImage');
const aboutLightboxCloseBtn = document.getElementById('aboutLightboxClose');

// State
let lastLetterTrigger = null;
let lastAboutTrigger = null;
let lastHeroLightboxTrigger = null;
let currentLetterIndex = -1;
let lightboxZoomLevel = 1;
let lightboxPanX = 0;
let lightboxPanY = 0;
let lightboxDragPointerId = null;
let isDraggingLightboxImage = false;
let dragStartX = 0;
let dragStartY = 0;
let heroLightboxIndex = 0;

const LIGHTBOX_MIN_ZOOM = 1;
const LIGHTBOX_MAX_ZOOM = 3.2;
const LIGHTBOX_ZOOM_STEP = 0.25;

// Helpers
function buildLetterCaption(letter) {
  return `${letter.chapter} - ${letter.flavor} - ${letter.date}`;
}

function updateLightboxNavButtons() {
  const shouldDisable = loveLetters.length <= 1 || currentLetterIndex < 0;
  if (lightboxPrevBtn) {
    lightboxPrevBtn.disabled = shouldDisable;
    lightboxPrevBtn.setAttribute('aria-hidden', shouldDisable ? 'true' : 'false');
  }
  if (lightboxNextBtn) {
    lightboxNextBtn.disabled = shouldDisable;
    lightboxNextBtn.setAttribute('aria-hidden', shouldDisable ? 'true' : 'false');
  }
}

function updateZoomButtonState() {
  const nearMin = lightboxZoomLevel <= LIGHTBOX_MIN_ZOOM + 0.01;
  const nearMax = lightboxZoomLevel >= LIGHTBOX_MAX_ZOOM - 0.01;
  if (lightboxZoomOutBtn) {
    lightboxZoomOutBtn.disabled = nearMin;
  }
  if (lightboxZoomResetBtn) {
    lightboxZoomResetBtn.disabled = nearMin;
  }
  if (lightboxZoomInBtn) {
    lightboxZoomInBtn.disabled = nearMax;
  }
}

function syncLightboxZoomClasses() {
  const zoomed = lightboxZoomLevel > LIGHTBOX_MIN_ZOOM + 0.01;
  if (lightboxStageEl) {
    lightboxStageEl.classList.toggle('is-zoomed', zoomed);
    if (!zoomed) {
      lightboxStageEl.classList.remove('is-grabbing');
    }
  }
  if (lightboxImageEl) {
    lightboxImageEl.classList.toggle('is-zoomed', zoomed);
  }
}

function applyLightboxTransform() {
  if (!lightboxImageEl) {
    return;
  }
  lightboxImageEl.style.transform = `translate(${lightboxPanX}px, ${lightboxPanY}px) scale(${lightboxZoomLevel})`;
  syncLightboxZoomClasses();
  updateZoomButtonState();
}

function constrainLightboxPan() {
  if (!lightboxStageEl || lightboxZoomLevel <= LIGHTBOX_MIN_ZOOM) {
    lightboxPanX = 0;
    lightboxPanY = 0;
    return;
  }
  const rect = lightboxStageEl.getBoundingClientRect();
  if (!rect.width || !rect.height) {
    return;
  }
  const limitX = (rect.width * lightboxZoomLevel - rect.width) / 2;
  const limitY = (rect.height * lightboxZoomLevel - rect.height) / 2;
  const maxX = Math.max(limitX, 0) + 24;
  const maxY = Math.max(limitY, 0) + 24;
  lightboxPanX = clamp(lightboxPanX, -maxX, maxX);
  lightboxPanY = clamp(lightboxPanY, -maxY, maxY);
}

function endLightboxDrag() {
  if (!isDraggingLightboxImage) {
    return;
  }
  isDraggingLightboxImage = false;
  if (lightboxStageEl && lightboxDragPointerId !== null) {
    lightboxStageEl.releasePointerCapture(lightboxDragPointerId);
    lightboxStageEl.classList.remove('is-grabbing');
  }
  lightboxDragPointerId = null;
}

function resetLightboxZoomState() {
  if (isDraggingLightboxImage) {
    endLightboxDrag();
  }
  lightboxZoomLevel = LIGHTBOX_MIN_ZOOM;
  lightboxPanX = 0;
  lightboxPanY = 0;
  lightboxDragPointerId = null;
  isDraggingLightboxImage = false;
  if (lightboxStageEl) {
    lightboxStageEl.classList.remove('is-grabbing');
  }
  applyLightboxTransform();
}

function setLightboxZoom(level, { focusX, focusY } = {}) {
  const newZoom = clamp(level, LIGHTBOX_MIN_ZOOM, LIGHTBOX_MAX_ZOOM);
  if (Math.abs(newZoom - lightboxZoomLevel) < 0.01) {
    return;
  }
  if (lightboxStageEl) {
    const rect = lightboxStageEl.getBoundingClientRect();
    if (rect.width && rect.height) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const originX = typeof focusX === 'number' ? focusX : centerX;
      const originY = typeof focusY === 'number' ? focusY : centerY;
      const offsetX = originX - centerX;
      const offsetY = originY - centerY;
      if (lightboxZoomLevel > LIGHTBOX_MIN_ZOOM || newZoom > LIGHTBOX_MIN_ZOOM) {
        const ratio = newZoom / lightboxZoomLevel;
        lightboxPanX = (lightboxPanX + offsetX) * ratio - offsetX;
        lightboxPanY = (lightboxPanY + offsetY) * ratio - offsetY;
      }
    }
  }
  lightboxZoomLevel = newZoom;
  if (lightboxZoomLevel === LIGHTBOX_MIN_ZOOM) {
    lightboxPanX = 0;
    lightboxPanY = 0;
  }
  constrainLightboxPan();
  applyLightboxTransform();
}

function changeLightboxZoom(delta, options) {
  setLightboxZoom(lightboxZoomLevel + delta, options);
}

function handleLightboxPointerDown(event) {
  if (event.pointerType === 'touch') {
    event.preventDefault();
  }
  if (lightboxZoomLevel <= LIGHTBOX_MIN_ZOOM || event.button === 1 || event.button === 2) {
    return;
  }
  isDraggingLightboxImage = true;
  lightboxDragPointerId = event.pointerId;
  dragStartX = event.clientX - lightboxPanX;
  dragStartY = event.clientY - lightboxPanY;
  if (lightboxStageEl) {
    lightboxStageEl.setPointerCapture(event.pointerId);
    lightboxStageEl.classList.add('is-grabbing');
  }
}

function handleLightboxPointerMove(event) {
  if (!isDraggingLightboxImage || event.pointerId !== lightboxDragPointerId) {
    return;
  }
  lightboxPanX = event.clientX - dragStartX;
  lightboxPanY = event.clientY - dragStartY;
  constrainLightboxPan();
  applyLightboxTransform();
}

function handleLightboxWheel(event) {
  if (!lightboxStageEl || event.ctrlKey) {
    return;
  }
  if (lightboxStageEl.contains(event.target)) {
    event.preventDefault();
    const direction = event.deltaY < 0 ? 1 : -1;
    const rect = lightboxStageEl.getBoundingClientRect();
    const focusX = event.clientX - rect.left;
    const focusY = event.clientY - rect.top;
    changeLightboxZoom(direction * LIGHTBOX_ZOOM_STEP, { focusX, focusY });
  }
}

function toggleLightboxZoom(event) {
  if (lightboxZoomLevel > LIGHTBOX_MIN_ZOOM + 0.01) {
    resetLightboxZoomState();
  } else if (lightboxStageEl) {
    const rect = lightboxStageEl.getBoundingClientRect();
    const focusX = event ? event.clientX - rect.left : rect.width / 2;
    const focusY = event ? event.clientY - rect.top : rect.height / 2;
    setLightboxZoom(Math.min(2, LIGHTBOX_MAX_ZOOM), { focusX, focusY });
  }
}

// Love Letter Lightbox
function setLoveLightboxContent(index) {
  const letter = loveLetters[index];
  if (!letter) {
    return false;
  }
  resetLightboxZoomState();
  if (lightboxImageEl) {
    lightboxImageEl.src = letter.letter;
    lightboxImageEl.alt = `${buildLetterCaption(letter)} love letter`;
  }
  if (lightboxCaptionEl) {
    lightboxCaptionEl.textContent = buildLetterCaption(letter);
  }
  currentLetterIndex = index;
  updateLightboxNavButtons();
  return true;
}

export function openLoveLetter(index, trigger) {
  if (!loveLightboxEl) {
    return;
  }
  if (!setLoveLightboxContent(index)) {
    return;
  }
  lastLetterTrigger = trigger || null;
  loveLightboxEl.classList.add('is-visible');
  loveLightboxEl.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (lightboxCloseBtn) {
    lightboxCloseBtn.focus();
  }
}

function closeLoveLetter() {
  if (!loveLightboxEl) {
    return;
  }
  loveLightboxEl.classList.remove('is-visible');
  loveLightboxEl.setAttribute('aria-hidden', 'true');
  restoreBodyScroll(LIGHTBOX_SELECTORS);
  if (lightboxImageEl) {
    lightboxImageEl.src = '';
    lightboxImageEl.alt = '';
  }
  if (lightboxCaptionEl) {
    lightboxCaptionEl.textContent = '';
  }
  currentLetterIndex = -1;
  updateLightboxNavButtons();
  resetLightboxZoomState();
  if (lastLetterTrigger) {
    lastLetterTrigger.focus();
  }
  lastLetterTrigger = null;
}

function moveLoveLetter(step) {
  if (currentLetterIndex < 0 || !loveLetters.length) {
    return;
  }
  const total = loveLetters.length;
  const nextIndex = (currentLetterIndex + step + total) % total;
  setLoveLightboxContent(nextIndex);
}

// About Lightbox
function openAboutLightbox(trigger) {
  if (!aboutLightboxEl || !aboutLightboxImageEl) {
    return;
  }
  const button = trigger instanceof HTMLElement ? trigger : null;
  const innerImage = button ? button.querySelector('img') : null;
  const fullSrc = button?.dataset.fullImage || innerImage?.currentSrc || innerImage?.src || '';
  const altText = innerImage?.alt || 'Full size photo';
  lastAboutTrigger = button;
  if (fullSrc) {
    aboutLightboxImageEl.src = fullSrc;
  }
  aboutLightboxImageEl.alt = altText;
  aboutLightboxEl.classList.add('is-visible');
  aboutLightboxEl.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (aboutLightboxCloseBtn) {
    aboutLightboxCloseBtn.focus();
  }
}

function closeAboutLightbox() {
  if (!aboutLightboxEl) {
    return;
  }
  aboutLightboxEl.classList.remove('is-visible');
  aboutLightboxEl.setAttribute('aria-hidden', 'true');
  if (aboutLightboxImageEl) {
    aboutLightboxImageEl.src = '';
    aboutLightboxImageEl.alt = 'Our full size photo';
  }
  restoreBodyScroll(LIGHTBOX_SELECTORS);
  if (lastAboutTrigger) {
    lastAboutTrigger.focus();
  }
  lastAboutTrigger = null;
}

// Hero Lightbox
function updateHeroLightboxNavState() {
  const shouldDisable = heroCarouselLightboxTriggers.length <= 1;
  if (heroLightboxPrevBtn) {
    heroLightboxPrevBtn.disabled = shouldDisable;
    heroLightboxPrevBtn.setAttribute('aria-hidden', shouldDisable ? 'true' : 'false');
  }
  if (heroLightboxNextBtn) {
    heroLightboxNextBtn.disabled = shouldDisable;
    heroLightboxNextBtn.setAttribute('aria-hidden', shouldDisable ? 'true' : 'false');
  }
}

function setHeroLightboxSlide(targetIndex, { syncCarousel = true, sourceImage = null } = {}) {
  if (!heroLightboxImageEl || !heroCarouselLightboxTriggers.length) {
    return;
  }
  const total = heroCarouselLightboxTriggers.length;
  if (total === 0) {
    return;
  }
  const normalizedIndex = ((targetIndex % total) + total) % total;
  heroLightboxIndex = normalizedIndex;
  const trigger = heroCarouselLightboxTriggers[normalizedIndex];
  const innerImage = sourceImage || trigger?.querySelector('img');
  const fullSrc = trigger?.dataset.heroLightbox || innerImage?.currentSrc || innerImage?.src || '';
  const altText = innerImage?.alt || 'Memory from our scrapbook';
  if (fullSrc) {
    heroLightboxImageEl.src = fullSrc;
  }
  heroLightboxImageEl.alt = altText;
  if (syncCarousel) {
    heroCarouselSetSlide(normalizedIndex);
  }
  updateHeroLightboxNavState();
}

export function openHeroLightbox(trigger) {
  if (!heroLightboxEl || !heroLightboxImageEl) {
    return;
  }
  const button = trigger instanceof HTMLElement ? trigger : null;
  const innerImage = button ? button.querySelector('img') : null;
  const triggerIndex = button ? heroCarouselLightboxTriggers.indexOf(button) : -1;
  const fallbackIndex = heroCarouselGetIndex();
  const targetIndex = triggerIndex >= 0 ? triggerIndex : fallbackIndex;
  lastHeroLightboxTrigger = button;
  setHeroLightboxSlide(targetIndex, { syncCarousel: false, sourceImage: innerImage });
  heroLightboxEl.classList.add('is-visible');
  heroLightboxEl.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  pauseHeroCarouselAutoplay?.();
  if (heroLightboxCloseBtn) {
    heroLightboxCloseBtn.focus();
  }
}

function closeHeroLightbox() {
  if (!heroLightboxEl) {
    return;
  }
  heroLightboxEl.classList.remove('is-visible');
  heroLightboxEl.setAttribute('aria-hidden', 'true');
  if (heroLightboxImageEl) {
    heroLightboxImageEl.src = '';
    heroLightboxImageEl.alt = '';
  }
  restoreBodyScroll(LIGHTBOX_SELECTORS);
  if (lastHeroLightboxTrigger) {
    lastHeroLightboxTrigger.focus();
  }
  lastHeroLightboxTrigger = null;
  if (heroCarouselEl?.matches(':hover')) {
    pauseHeroCarouselAutoplay?.();
  } else {
    resumeHeroCarouselAutoplay?.();
  }
}

function moveHeroLightbox(delta) {
  if (!heroCarouselLightboxTriggers.length) {
    return;
  }
  setHeroLightboxSlide(heroLightboxIndex + delta);
}

// Initialize
export function initLightbox() {
  // Love Letter Lightbox events
  if (loveLightboxEl) {
    loveLightboxEl.addEventListener('click', (event) => {
      if (event.target === loveLightboxEl) {
        closeLoveLetter();
      }
    });
  }

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLoveLetter);
  }

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', () => moveLoveLetter(-1));
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', () => moveLoveLetter(1));
  }

  if (lightboxZoomInBtn) {
    lightboxZoomInBtn.addEventListener('click', () => changeLightboxZoom(LIGHTBOX_ZOOM_STEP));
  }

  if (lightboxZoomOutBtn) {
    lightboxZoomOutBtn.addEventListener('click', () => changeLightboxZoom(-LIGHTBOX_ZOOM_STEP));
  }

  if (lightboxZoomResetBtn) {
    lightboxZoomResetBtn.addEventListener('click', () => resetLightboxZoomState());
  }

  if (lightboxStageEl) {
    lightboxStageEl.addEventListener('pointerdown', handleLightboxPointerDown);
    lightboxStageEl.addEventListener('pointermove', handleLightboxPointerMove);
    lightboxStageEl.addEventListener('pointerup', endLightboxDrag);
    lightboxStageEl.addEventListener('pointercancel', endLightboxDrag);
    lightboxStageEl.addEventListener('pointerleave', endLightboxDrag);
    lightboxStageEl.addEventListener('wheel', handleLightboxWheel, { passive: false });
    lightboxStageEl.addEventListener('dblclick', (event) => {
      event.preventDefault();
      toggleLightboxZoom(event);
    });
  }

  updateZoomButtonState();

  // About Lightbox events
  if (aboutImageTriggers.length) {
    aboutImageTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => openAboutLightbox(trigger));
    });
  }

  if (aboutLightboxEl) {
    aboutLightboxEl.addEventListener('click', (event) => {
      if (event.target === aboutLightboxEl) {
        closeAboutLightbox();
      }
    });
  }

  if (aboutLightboxCloseBtn) {
    aboutLightboxCloseBtn.addEventListener('click', closeAboutLightbox);
  }

  // Hero Lightbox events
  if (heroLightboxEl) {
    heroLightboxEl.addEventListener('click', (event) => {
      if (event.target === heroLightboxEl) {
        closeHeroLightbox();
      }
    });
  }

  if (heroLightboxCloseBtn) {
    heroLightboxCloseBtn.addEventListener('click', closeHeroLightbox);
  }

  if (heroLightboxPrevBtn) {
    heroLightboxPrevBtn.addEventListener('click', () => moveHeroLightbox(-1));
  }

  if (heroLightboxNextBtn) {
    heroLightboxNextBtn.addEventListener('click', () => moveHeroLightbox(1));
  }

  // Keyboard navigation
  document.addEventListener('keydown', (event) => {
    const loveLightboxVisible = loveLightboxEl?.classList.contains('is-visible');
    const aboutLightboxVisible = aboutLightboxEl?.classList.contains('is-visible');
    const heroLightboxVisible = heroLightboxEl?.classList.contains('is-visible');

    if (event.key === 'Escape') {
      if (loveLightboxVisible) closeLoveLetter();
      if (aboutLightboxVisible) closeAboutLightbox();
      if (heroLightboxVisible) closeHeroLightbox();
      return;
    }

    if (heroLightboxVisible) {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        moveHeroLightbox(1);
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveHeroLightbox(-1);
        return;
      }
    }

    if (!loveLightboxVisible) {
      return;
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveLoveLetter(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveLoveLetter(-1);
    }
  });

  updateLightboxNavButtons();
  updateHeroLightboxNavState();
}
