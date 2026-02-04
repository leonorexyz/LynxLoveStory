import { prefersReducedMotion, onReduceMotionPreferenceChange } from './accessibility.js';

const heroCarouselEl = document.querySelector('[data-hero-carousel]');
let heroCarouselTrackEl = null;
let heroCarouselSlides = [];
let heroCarouselDots = [];
let heroCarouselPrevBtn = null;
let heroCarouselNextBtn = null;
let heroCarouselIndex = 0;
let heroCarouselTimer = null;
const HERO_CAROUSEL_INTERVAL = 6000;

export let heroCarouselLightboxTriggers = [];
export let pauseHeroCarouselAutoplay = null;
export let resumeHeroCarouselAutoplay = null;

let heroCarouselSetSlideInternal = null;

export function heroCarouselSetSlide(targetIndex, options = {}) {
  if (heroCarouselSetSlideInternal) {
    heroCarouselSetSlideInternal(targetIndex, options);
  }
}

export function heroCarouselGetIndex() {
  return heroCarouselIndex;
}

function setHeroCarouselSlide(targetIndex, options = {}) {
  if (!heroCarouselTrackEl || !heroCarouselSlides.length) {
    return;
  }
  const total = heroCarouselSlides.length;
  const { immediate = false } = options;
  heroCarouselIndex = ((targetIndex % total) + total) % total;
  const offset = heroCarouselIndex * -100;
  if (immediate) {
    heroCarouselTrackEl.classList.add('hero-carousel__track--no-transition');
  }
  heroCarouselTrackEl.style.transform = `translateX(${offset}%)`;
  if (immediate) {
    requestAnimationFrame(() => {
      heroCarouselTrackEl.classList.remove('hero-carousel__track--no-transition');
    });
  }
  heroCarouselSlides.forEach((slide, index) => {
    slide.classList.toggle('is-active', index === heroCarouselIndex);
  });
  heroCarouselDots.forEach((dot, index) => {
    const isActive = index === heroCarouselIndex;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

function stopHeroCarouselAutoplay() {
  if (heroCarouselTimer !== null) {
    window.clearInterval(heroCarouselTimer);
    heroCarouselTimer = null;
  }
}

function startHeroCarouselAutoplay() {
  if (prefersReducedMotion || heroCarouselSlides.length < 2) {
    stopHeroCarouselAutoplay();
    return;
  }
  stopHeroCarouselAutoplay();
  heroCarouselTimer = window.setInterval(() => {
    setHeroCarouselSlide(heroCarouselIndex + 1);
  }, HERO_CAROUSEL_INTERVAL);
}

function applyMotionPreferenceToHero(matches) {
  if (!heroCarouselEl) return;
  heroCarouselEl.classList.toggle('hero-carousel--reduced', matches);
  if (matches) {
    stopHeroCarouselAutoplay();
    setHeroCarouselSlide(heroCarouselIndex, { immediate: true });
  } else {
    startHeroCarouselAutoplay();
  }
}

export function initCarousel(onLightboxTriggerClick) {
  if (!heroCarouselEl) {
    return;
  }

  heroCarouselTrackEl = heroCarouselEl.querySelector('[data-hero-track]');
  heroCarouselSlides = heroCarouselTrackEl ? Array.from(heroCarouselTrackEl.children) : [];
  heroCarouselDots = Array.from(heroCarouselEl.querySelectorAll('[data-hero-dot]'));
  heroCarouselPrevBtn = heroCarouselEl.querySelector('[data-hero-prev]');
  heroCarouselNextBtn = heroCarouselEl.querySelector('[data-hero-next]');
  heroCarouselLightboxTriggers = Array.from(heroCarouselEl.querySelectorAll('[data-hero-lightbox]'));

  heroCarouselSetSlideInternal = setHeroCarouselSlide;
  pauseHeroCarouselAutoplay = stopHeroCarouselAutoplay;
  resumeHeroCarouselAutoplay = startHeroCarouselAutoplay;

  heroCarouselDots.forEach((dot) => {
    const targetIndex = Number.parseInt(dot.dataset.heroDot || '', 10);
    if (Number.isNaN(targetIndex)) {
      return;
    }
    dot.addEventListener('click', () => {
      setHeroCarouselSlide(targetIndex);
      startHeroCarouselAutoplay();
    });
  });

  if (heroCarouselPrevBtn) {
    heroCarouselPrevBtn.addEventListener('click', () => {
      setHeroCarouselSlide(heroCarouselIndex - 1);
      startHeroCarouselAutoplay();
    });
  }

  if (heroCarouselNextBtn) {
    heroCarouselNextBtn.addEventListener('click', () => {
      setHeroCarouselSlide(heroCarouselIndex + 1);
      startHeroCarouselAutoplay();
    });
  }

  if (onLightboxTriggerClick) {
    heroCarouselLightboxTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        onLightboxTriggerClick(trigger);
      });
    });
  }

  heroCarouselEl.addEventListener('mouseenter', stopHeroCarouselAutoplay);
  heroCarouselEl.addEventListener('mouseleave', startHeroCarouselAutoplay);
  heroCarouselEl.addEventListener('focusin', stopHeroCarouselAutoplay);
  heroCarouselEl.addEventListener('focusout', (event) => {
    if (!heroCarouselEl.contains(event.relatedTarget)) {
      startHeroCarouselAutoplay();
    }
  });

  setHeroCarouselSlide(heroCarouselIndex, { immediate: true });
  applyMotionPreferenceToHero(prefersReducedMotion);
  onReduceMotionPreferenceChange(applyMotionPreferenceToHero);
}
