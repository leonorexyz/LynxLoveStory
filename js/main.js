// Moved from index.html
// ======= CONFIG (edit these!) =======
const PIN_CODE = '200125'; // required 6-digit pin
const PLAYLIST = [
  // Add new songs or reorder existing ones here to adjust the playlist sequence.
  { id: '06-XXOTP3Gc', title: 'Shane Filan - Beautiful in White'},
  { id: 'OT5msu-dap8', title: 'Backstreet Boys - Shape of My Heart' },
  { id: 'Qy7z_oiN6nQ', title: 'George Benson - Nothing\'s Gonna Change My Love For You'},
  { id: 'DXvMT_mVbqw', title: 'K-Ci & JoJo - All My Life' },
  { id: 'Ip6cw8gfHHI', title: 'd4vd - Here With Me' },
  { id: 'KNZH-emehxA', title: 'Shania Twain - You\'re Still The One' },
  { id: 'HeK1zQFJtXE', title: 'Tamia - Officially Missing You' },
  { id: '8MG--WuNW1Y', title: 'Wei Bird - 如果可以' },
  { id: 'S_E2EHVxNAE', title: 'Richard Marx - Right Here Waiting' },
  { id: 'Ju8Hr50Ckwk', title: 'Alicia Keys - If I Ain\'t Got You' },
  { id: 'iBrOFd1wDuQ', title: '羅志祥 - 愛不單行' },
  { id: 'd4_QuMkOdCI', title: 'Eric Clapton - Wonderful Tonight' },
  { id: 'XJ1Jigjg1wo', title: 'Ardhito Pramono - Waking Up Together With You' },
  { id: 'Xct1EdyHMWw', title: 'Yahya - keepyousafe' },
  { id: '5W0UH4VbptE', title: 'PK Haeman - Evergreen Part 2' },
  { id: '7KVxjQUCyn0', title: 'Mariah Carey, Joe, 98 Degrees - Thank God I Found You' },
  { id: 'ulOb9gIGGd0', title: 'Westlife - My Love' },
  { id: '2VInZQdh1eY', title: 'M2M - Pretty Boy' },
  { id: 'psN0NH8IcbQ', title: 'Brian McKnight - Back At One' },
  { id: 'IlrXHkPvn8I', title: 'Celine Dion - Because You Loved Me' },
  { id: 'ZnOAK04tJhc', title: 'Westlife - I Lay My Love on You' },
  { id: 'K1uNjmxJQUo', title: 'The Pussycat Dolls - Stickwitu' },
  { id: '1WCIrw85zbQ', title: 'Westlife - I Wanna Grow Old with You' },
  { id: 'KnJfMzsyDS0', title: 'Inquisitive feat. Hannah Ying - 不得不爱' },
  { id: 'WCM_eSgaK6o', title: 'Vic Chou - Make a Wish' },
  { id: 'IvRQBrOY6Bk', title: '김동률 - 취중진담' },
];

const loveLetters = [
  {
    ring: 'images/Ring/ring_01-ayodance-sugar.png',
    letter: 'images/LP Love Letter ♡/Chapter 0 - Sugar - 20.01.2025.jpg',
    chapter: 'Chapter 0',
    flavor: 'Sugar',
    date: '20.01.2025',
  },
  {
    ring: 'images/Ring/ring_02-ayodance-sweet.png',
    letter: 'images/LP Love Letter ♡/Chapter 1 - Sweet - 20.01.2025.jpg',
    chapter: 'Chapter 1',
    flavor: 'Sweet',
    date: '20.01.2025',
  },
  {
    ring: 'images/Ring/ring_03-ayodance-candy.png',
    letter: 'images/LP Love Letter ♡/Chapter 2 - Candy - 21.01.2025.jpg',
    chapter: 'Chapter 2',
    flavor: 'Candy',
    date: '21.01.2025',
  },
  {
    ring: 'images/Ring/ring_04-ayodance-cherry.png',
    letter: 'images/LP Love Letter ♡/Chapter 3 - Cherry - 21.01.2025.jpg',
    chapter: 'Chapter 3',
    flavor: 'Cherry',
    date: '21.01.2025',
  },
  {
    ring: 'images/Ring/ring_05-ayodance-strawberry.png',
    letter: 'images/LP Love Letter ♡/Chapter 4 - Strawberry - 22.01.2025.jpg',
    chapter: 'Chapter 4',
    flavor: 'Strawberry',
    date: '22.01.2025',
  },
  {
    ring: 'images/Ring/ring_06-ayodance-honey.png',
    letter: 'images/LP Love Letter ♡/Chapter 5 - Honey - 23.01.2025.jpg',
    chapter: 'Chapter 5',
    flavor: 'Honey',
    date: '23.01.2025',
  },
  {
    ring: 'images/Ring/ring_07-ayodance-chocholate.png',
    letter: 'images/LP Love Letter ♡/Chapter 6 - Chocolate - 24.01.2025.jpg',
    chapter: 'Chapter 6',
    flavor: 'Chocolate',
    date: '24.01.2025',
  },
  {
    ring: 'images/Ring/ring_08-ayodance-cupcake.png',
    letter: 'images/LP Love Letter ♡/Chapter 7 - Cupcake - 25.01.2025.jpg',
    chapter: 'Chapter 7',
    flavor: 'Cupcake',
    date: '25.01.2025',
  },
  {
    ring: 'images/Ring/ring_09-ayodance-brownies.png',
    letter: 'images/LP Love Letter ♡/Chapter 8 - Brownies - 30.01.2025.jpg',
    chapter: 'Chapter 8',
    flavor: 'Brownies',
    date: '30.01.2025',
  },
  {
    ring: 'images/Ring/ring_10-ayodance-tiramisu.png',
    letter: 'images/LP Love Letter ♡/Chapter 9 - Tiramisu - 30.01.2025.jpg',
    chapter: 'Chapter 9',
    flavor: 'Tiramisu',
    date: '30.01.2025',
  },
  {
    ring: 'images/Ring/ring_11-ayodance-sakura.png',
    letter: 'images/LP Love Letter ♡/Chapter 10 - Sakura - 01.02.2025.jpg',
    chapter: 'Chapter 10',
    flavor: 'Sakura',
    date: '01.02.2025',
  },
  {
    ring: 'images/Ring/ring_12-ayodance-roses.png',
    letter: 'images/LP Love Letter ♡/Chapter 11 - Roses - 03.02.2025.jpg',
    chapter: 'Chapter 11',
    flavor: 'Roses',
    date: '03.02.2025',
  },
  {
    ring: 'images/Ring/ring_13-ayodance-edelweiss.png',
    letter: 'images/LP Love Letter ♡/Chapter 12 - Edelweiss - 14.02.2025.jpg',
    chapter: 'Chapter 12',
    flavor: 'Edelweiss',
    date: '14.02.2025',
  },
  {
    ring: 'images/Ring/ring_14-ayodance-lobelia.png',
    letter: 'images/LP Love Letter ♡/Chapter 13 - Lobelia - 21.03.2025.jpg',
    chapter: 'Chapter 13',
    flavor: 'Lobelia',
    date: '21.03.2025',
  },
  {
    ring: 'images/Ring/ring_15-ayodance-peppermint.png',
    letter: 'images/LP Love Letter ♡/Chapter 14 - Peppermint - 22.04.2025.jpg',
    chapter: 'Chapter 14',
    flavor: 'Peppermint',
    date: '22.04.2025',
  },
  {
    ring: 'images/Ring/ring_16-ayodance-iris.png',
    letter: 'images/LP Love Letter ♡/Chapter 15 - Iris - 29.09.2025.jpg',
    chapter: 'Chapter 15',
    flavor: 'Iris',
    date: '29.09.2025',
  },
];

const letterGalleryEl = document.getElementById('letterGallery');
const heroCarouselEl = document.querySelector('[data-hero-carousel]');
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
const aboutImageTriggers = document.querySelectorAll('.about-img-trigger');
const aboutLightboxEl = document.getElementById('aboutLightbox');
const aboutLightboxImageEl = document.getElementById('aboutLightboxImage');
const aboutLightboxCloseBtn = document.getElementById('aboutLightboxClose');
const scrollTopBtn = document.getElementById('scrollTopBtn');

let lastLetterTrigger = null;
let lastAboutTrigger = null;
let currentLetterIndex = -1;
let lightboxZoomLevel = 1;
let lightboxPanX = 0;
let lightboxPanY = 0;
let lightboxDragPointerId = null;
let isDraggingLightboxImage = false;
let dragStartX = 0;
let dragStartY = 0;
const LIGHTBOX_MIN_ZOOM = 1;
const LIGHTBOX_MAX_ZOOM = 3.2;
const LIGHTBOX_ZOOM_STEP = 0.25;
const reduceMotionQuery = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
let prefersReducedMotion = Boolean(reduceMotionQuery?.matches);

const reduceMotionSubscribers = [];

function emitReduceMotionPreferenceChange(matches) {
  reduceMotionSubscribers.forEach((callback) => {
    try {
      callback(matches);
    } catch (error) {
      console.error('Error in reduce motion subscriber', error);
    }
  });
}

function onReduceMotionPreferenceChange(callback) {
  if (typeof callback === 'function') {
    reduceMotionSubscribers.push(callback);
  }
}

if (reduceMotionQuery) {
  const handleReduceMotionChange = (event) => {
    const matches = typeof event === 'boolean' ? event : Boolean(event.matches);
    prefersReducedMotion = matches;
    emitReduceMotionPreferenceChange(matches);
  };
  if (typeof reduceMotionQuery.addEventListener === 'function') {
    reduceMotionQuery.addEventListener('change', handleReduceMotionChange);
  } else if (typeof reduceMotionQuery.addListener === 'function') {
    reduceMotionQuery.addListener(handleReduceMotionChange);
  }
}

if (heroCarouselEl) {
  const heroCarouselTrackEl = heroCarouselEl.querySelector('[data-hero-track]');
  const heroCarouselSlides = heroCarouselTrackEl ? Array.from(heroCarouselTrackEl.children) : [];
  const heroCarouselDots = Array.from(heroCarouselEl.querySelectorAll('[data-hero-dot]'));
  let heroCarouselIndex = 0;
  let heroCarouselTimer = null;
  const HERO_CAROUSEL_INTERVAL = 6000;

  const setHeroCarouselSlide = (targetIndex, options = {}) => {
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
  };

  const stopHeroCarouselAutoplay = () => {
    if (heroCarouselTimer !== null) {
      window.clearInterval(heroCarouselTimer);
      heroCarouselTimer = null;
    }
  };

  const startHeroCarouselAutoplay = () => {
    if (prefersReducedMotion || heroCarouselSlides.length < 2) {
      stopHeroCarouselAutoplay();
      return;
    }
    stopHeroCarouselAutoplay();
    heroCarouselTimer = window.setInterval(() => {
      setHeroCarouselSlide(heroCarouselIndex + 1);
    }, HERO_CAROUSEL_INTERVAL);
  };

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

  const applyMotionPreferenceToHero = (matches) => {
    heroCarouselEl.classList.toggle('hero-carousel--reduced', matches);
    if (matches) {
      stopHeroCarouselAutoplay();
      setHeroCarouselSlide(heroCarouselIndex, { immediate: true });
    } else {
      startHeroCarouselAutoplay();
    }
  };

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

function restoreBodyScroll() {
  const loveOpen = loveLightboxEl?.classList.contains('is-visible');
  const aboutOpen = aboutLightboxEl?.classList.contains('is-visible');
  if (!loveOpen && !aboutOpen) {
    document.body.style.overflow = '';
  }
}

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

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
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
  const limitX = ((rect.width * lightboxZoomLevel) - rect.width) / 2;
  const limitY = ((rect.height * lightboxZoomLevel) - rect.height) / 2;
  const maxX = Math.max(limitX, 0) + 24;
  const maxY = Math.max(limitY, 0) + 24;
  lightboxPanX = clamp(lightboxPanX, -maxX, maxX);
  lightboxPanY = clamp(lightboxPanY, -maxY, maxY);
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

function openLoveLetter(index, trigger) {
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
  restoreBodyScroll();
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
  restoreBodyScroll();
  if (lastAboutTrigger) {
    lastAboutTrigger.focus();
  }
  lastAboutTrigger = null;
}

function renderLoveLetters() {
  if (!letterGalleryEl) {
    return;
  }
  letterGalleryEl.innerHTML = loveLetters
    .map((letter, index) => {
      const ringNumber = String(index + 1).padStart(2, '0');
      const ringLabel = `Ring ${ringNumber} — ${letter.flavor}`;
      return `
        <article class="love-card" role="listitem" data-letter-index="${index}" tabindex="0" aria-label="Open ${ringLabel} love letter">
          <div class="love-card__ring">
            <img src="${letter.ring}" alt="${ringLabel}" loading="lazy" />
          </div>
          <div class="love-card__meta">
            <div class="love-card__title">${ringLabel}</div>
            <div class="love-card__subtitle">${letter.chapter} • ${letter.date}</div>
          </div>
          <button type="button" class="love-card__button" data-letter-index="${index}" aria-haspopup="dialog">
            Read Chapter
          </button>
        </article>
      `;
    })
    .join('');
}

function findLetterTrigger(eventTarget) {
  if (!(eventTarget instanceof HTMLElement)) {
    return null;
  }
  const trigger = eventTarget.closest('[data-letter-index]');
  if (!trigger) {
    return null;
  }
  const index = Number.parseInt(trigger.dataset.letterIndex || '', 10);
  if (Number.isNaN(index)) {
    return null;
  }
  return { index, trigger };
}

if (letterGalleryEl) {
  letterGalleryEl.addEventListener('click', (event) => {
    const found = findLetterTrigger(event.target);
    if (!found) {
      return;
    }
    openLoveLetter(found.index, found.trigger);
  });

  letterGalleryEl.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    const card = event.target instanceof HTMLElement ? event.target.closest('.love-card') : null;
    if (!card) {
      return;
    }
    const index = Number.parseInt(card.dataset.letterIndex || '', 10);
    if (Number.isNaN(index)) {
      return;
    }
    event.preventDefault();
    openLoveLetter(index, card);
  });
}

renderLoveLetters();

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

document.addEventListener('keydown', (event) => {
  const loveLightboxVisible = loveLightboxEl && loveLightboxEl.classList.contains('is-visible');
  const aboutLightboxVisible = aboutLightboxEl && aboutLightboxEl.classList.contains('is-visible');
  if (event.key === 'Escape') {
    if (loveLightboxVisible) {
      closeLoveLetter();
    }
    if (aboutLightboxVisible) {
      closeAboutLightbox();
    }
    return;
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

const typewriterEls = document.querySelectorAll('[data-typewriter]');
let typewriterStarted = false;

function getTypewriterText(el) {
  if (!(el instanceof HTMLElement)) {
    return '';
  }
  const raw = typeof el.dataset.typewriter === 'string' ? el.dataset.typewriter : '';
  const trimmed = raw.trim();
  if (trimmed) {
    el.dataset.typewriter = trimmed;
    return trimmed;
  }
  const fallback = el.textContent.trim();
  el.dataset.typewriter = fallback;
  return fallback;
}

function animateTypewriter(el) {
  if (!(el instanceof HTMLElement)) {
    return;
  }
  const text = getTypewriterText(el);
  if (!text) {
    el.classList.add('is-complete');
    return;
  }
  const speedValue = Number.parseInt(el.dataset.typewriterSpeed || '', 10);
  const delayValue = Number.parseInt(el.dataset.typewriterDelay || '', 10) || 0;
  const step = Number.isFinite(speedValue) && speedValue > 0 ? speedValue : 90;
  const loopDelayValue = Number.parseInt(el.dataset.typewriterLoopDelay || '', 10);
  const fallbackLoopDelay = Math.max(1600, Math.round(text.length * step * 0.8));
  const loopDelay = Number.isFinite(loopDelayValue) && loopDelayValue >= 0 ? loopDelayValue : fallbackLoopDelay;
  const shouldLoop = el.dataset.typewriterLoop !== 'false';
  el.classList.remove('is-complete');
  const startTyping = () => {
    let index = 0;
    el.textContent = '';
    const typeNext = () => {
      el.textContent = text.slice(0, index + 1);
      index += 1;
      if (index < text.length) {
        setTimeout(typeNext, step);
      } else {
        el.textContent = text;
        el.classList.add('is-complete');
        if (shouldLoop) {
          setTimeout(() => {
            if (!document.body.contains(el)) {
              return;
            }
            animateTypewriter(el);
          }, loopDelay);
        }
      }
    };
    typeNext();
  };
  if (delayValue > 0) {
    setTimeout(startTyping, delayValue);
  } else {
    startTyping();
  }
}

function startTypewriterAnimations() {
  if (typewriterStarted) {
    return;
  }
  typewriterStarted = true;
  typewriterEls.forEach((el) => animateTypewriter(el));
}

// Timeline data (edit dates/labels)
const timelineData = [
  { title: 'The day our hearts connected', date: '2024-10-15', note: 'Our story started here.' },
  { title: 'First commitment', date: '2025-01-20', note: 'Nerves, laughter, and butterflies.' },
  { title: 'First breakup', date: '2025-05-22', note: 'We learned, healed, and chose love again.' },
  { title: 'Final commitment', date: '2025-06-26', note: 'Together, stronger, softer.' },
];

// Quotes rotation (customize freely)
const quotes = [
  'You are my today and all of my tomorrows.',
  'In your smile, I see something more beautiful than the stars.',
  'I love you more than words can express.',
  'Every love story is beautiful, but ours is my favorite.',
  'I choose you. And I will choose you, over and over.',
];

// ======= Lock Screen Logic =======
const lock = document.getElementById('lockscreen');
const pin = document.getElementById('pin');
const unlockBtn = document.getElementById('unlockBtn');
const errorEl = document.getElementById('error');

function wrongPin() {
  errorEl.style.display = 'block';
  lock.querySelector('.lock-card').animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 300, easing: 'ease-in-out' });
}

function unlockSite() {
  lock.style.display = 'none';
  startTypewriterAnimations();
  initMusicAfterGesture();
  reveal();
  updateScrollTopButton();
  if (playerEl) {
    playerEl.style.display = 'flex';
  }
}

function checkPin() {
  if (pin.value === PIN_CODE) {
    unlockSite();
  } else {
    wrongPin();
    setTimeout(() => location.reload(), 1000);
  }
}

unlockBtn.addEventListener('click', checkPin);
pin.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkPin();
});

if (!lock || window.getComputedStyle(lock).display === 'none') {
  startTypewriterAnimations();
}

// ======= YouTube background music =======
const yt = document.getElementById('yt');
const playerEl = document.getElementById('player');
const playerStatus = document.getElementById('playerStatus');
const playerTitle = document.getElementById('playerTitle');
const toggleBtn = document.getElementById('toggleMusic');
const prevBtn = document.getElementById('prevTrack');
const nextBtn = document.getElementById('nextTrack');
const playlistEl = document.getElementById('playlist');

let isPlaying = false;
let currentTrackIndex = 0;
const unavailableTrackIndexes = new Set();

let ytPlayer = null;
let youTubeScriptRequested = false;
let youTubePlayerReadyResolved = false;
let youTubePlayerReadyResolve;
let pendingTrackSelection = null;

const youTubePlayerReadyPromise = new Promise((resolve) => {
  youTubePlayerReadyResolve = (player) => {
    if (!youTubePlayerReadyResolved) {
      youTubePlayerReadyResolved = true;
      resolve(player);
    }
  };
});

function ensureYouTubeIframeAPIScript() {
  if (window.YT && typeof window.YT.Player === 'function') {
    return;
  }
  if (youTubeScriptRequested) {
    return;
  }
  youTubeScriptRequested = true;
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  tag.async = true;
  document.head.append(tag);
}

function handlePlayerStateChange(event) {
  if (!event || typeof event.data !== 'number' || !PLAYLIST.length) {
    return;
  }
  const PlayerState = window.YT?.PlayerState;
  const playerTarget = event?.target;
  switch (event.data) {
    case PlayerState?.ENDED: {
      const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
      selectTrack(nextIndex, { autoplay: true });
      break;
    }
    case PlayerState?.PLAYING: {
      if (!isPlaying) {
        isPlaying = true;
      }
      updatePlayerUI();
      break;
    }
    case PlayerState?.PAUSED: {
      if (isPlaying) {
        isPlaying = false;
      }
      updatePlayerUI();
      break;
    }
    case PlayerState?.CUED: {
      if (isPlaying && playerTarget && typeof playerTarget.playVideo === 'function') {
        playerTarget.playVideo();
      }
      break;
    }
    default:
  }
}

function createYouTubePlayer() {
  if (!yt || ytPlayer) {
    return;
  }
  ytPlayer = new YT.Player('yt', {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
    },
    events: {
      onReady: (event) => {
        ytPlayer = event.target;
        if (typeof youTubePlayerReadyResolve === 'function') {
          youTubePlayerReadyResolve(event.target);
        }
      },
      onStateChange: handlePlayerStateChange,
      onError: handlePlayerError,
    },
  });
}

function ensureYouTubePlayer() {
  if (!yt) {
    return Promise.resolve(null);
  }
  if (ytPlayer && youTubePlayerReadyResolved && typeof ytPlayer.loadVideoById === 'function') {
    return Promise.resolve(ytPlayer);
  }
  ensureYouTubeIframeAPIScript();
  if (window.YT && typeof window.YT.Player === 'function' && !ytPlayer) {
    createYouTubePlayer();
  }
  return youTubePlayerReadyPromise;
}

function applyTrackSelectionToPlayer(player, selection) {
  if (!player || !PLAYLIST.length || !selection) {
    return;
  }
  const { index, autoplay } = selection;
  const track = PLAYLIST[index];
  if (!track) {
    return;
  }
  if (autoplay) {
    player.loadVideoById(track.id);
    if (typeof player.playVideo === 'function') {
      player.playVideo();
    }
  } else if (typeof player.cueVideoById === 'function') {
    player.cueVideoById(track.id);
  } else {
    player.loadVideoById(track.id);
    if (typeof player.pauseVideo === 'function') {
      player.pauseVideo();
    }
  }
}

function flushPendingTrackSelection(player) {
  if (!player || !PLAYLIST.length) {
    return;
  }
  const selection = pendingTrackSelection || { index: currentTrackIndex, autoplay: isPlaying };
  pendingTrackSelection = null;
  applyTrackSelectionToPlayer(player, selection);
}

window.onYouTubeIframeAPIReady = () => {
  if (!yt) {
    if (typeof youTubePlayerReadyResolve === 'function') {
      youTubePlayerReadyResolve(null);
    }
    return;
  }
  createYouTubePlayer();
};

function highlightActiveTrack() {
  if (!playlistEl) {
    return;
  }
  const tracks = playlistEl.querySelectorAll('.player-track');
  tracks.forEach((item, index) => {
    item.classList.toggle('is-active', index === currentTrackIndex);
  });
}

function updateUnavailableTrackUI(index) {
  if (!playlistEl) {
    return;
  }
  const button = playlistEl.querySelector(`button[data-index="${index}"]`);
  if (!button) {
    return;
  }
  const listItem = button.closest('.player-track');
  const isUnavailable = unavailableTrackIndexes.has(index);
  button.disabled = isUnavailable;
  if (listItem) {
    listItem.classList.toggle('is-unavailable', isUnavailable);
  }
}

function findNextPlayableIndex(startIndex, direction = 1) {
  if (!PLAYLIST.length) {
    return null;
  }
  for (let step = 1; step <= PLAYLIST.length; step += 1) {
    const nextIndex = (startIndex + direction * step + PLAYLIST.length) % PLAYLIST.length;
    if (!unavailableTrackIndexes.has(nextIndex)) {
      return nextIndex;
    }
  }
  return null;
}

function escapeHtml(text = '') {
  return text.replace(/[&<>"']/g, (char) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return map[char] || char;
  });
}

function updatePlayerUI({ refreshPlaylist = true } = {}) {
  const activeTrack = PLAYLIST[currentTrackIndex];
  if (playerTitle) {
    playerTitle.textContent = activeTrack ? activeTrack.title : 'Select a song';
  }
  if (playerStatus) {
    playerStatus.textContent = isPlaying ? 'Now Playing' : 'Paused';
  }
  if (toggleBtn) {
    toggleBtn.textContent = isPlaying ? 'Pause' : 'Play';
    toggleBtn.setAttribute('aria-pressed', String(isPlaying));
  }
  if (playerEl) {
    playerEl.classList.toggle('is-playing', isPlaying);
  }
  if (refreshPlaylist) {
    renderPlaylist({ preserveScroll: true, preserveFocus: true });
  }
  highlightActiveTrack();
}

function renderPlaylist({ preserveScroll = false, preserveFocus = false } = {}) {
  if (!playlistEl) {
    return;
  }
  const previousScrollTop = preserveScroll ? playlistEl.scrollTop : 0;
  let focusedIndex = null;
  if (preserveFocus) {
    const activeButton = document.activeElement;
    const focusTarget = activeButton?.closest?.('.player-track button');
    if (focusTarget && playlistEl.contains(focusTarget)) {
      const focusIndex = Number.parseInt(focusTarget.dataset.index, 10);
      if (!Number.isNaN(focusIndex)) {
        focusedIndex = focusIndex;
      }
    }
  }
  playlistEl.innerHTML = PLAYLIST.map((track, index) => {
    const number = String(index + 1).padStart(2, '0');
    const isActive = index === currentTrackIndex;
    const isUnavailable = unavailableTrackIndexes.has(index);
    return `
      <li class="player-track${isActive ? ' is-active' : ''}${isUnavailable ? ' is-unavailable' : ''}">
        <button type="button" data-index="${index}"${isUnavailable ? ' disabled' : ''}>
          <span class="track-index">${number}</span>
          <span class="track-title">${escapeHtml(track.title)}</span>
        </button>
      </li>
    `;
  }).join('');
  if (preserveScroll) {
    playlistEl.scrollTop = previousScrollTop;
  }
  if (preserveFocus && focusedIndex !== null) {
    const newFocusTarget = playlistEl.querySelector(`button[data-index="${focusedIndex}"]`);
    if (newFocusTarget) {
      newFocusTarget.focus();
    }
  }
}

function playMusic() {
  if (!PLAYLIST.length) {
    return;
  }
  if (!ytPlayer) {
    selectTrack(currentTrackIndex, { autoplay: true });
    return;
  }
  isPlaying = true;
  updatePlayerUI();
  ensureYouTubePlayer().then((player) => {
    if (player && typeof player.playVideo === 'function') {
      player.playVideo();
    }
  });
}

function pauseMusic() {
  if (!PLAYLIST.length) {
    return;
  }
  isPlaying = false;
  updatePlayerUI();
  ensureYouTubePlayer().then((player) => {
    if (player && typeof player.pauseVideo === 'function') {
      player.pauseVideo();
    }
  });
}

function selectTrack(index, { autoplay = true } = {}) {
  if (!PLAYLIST[index]) {
    return;
  }
  let targetIndex = index;
  if (unavailableTrackIndexes.has(targetIndex)) {
    const fallbackIndex = findNextPlayableIndex(targetIndex, 1);
    if (fallbackIndex === null) {
      isPlaying = false;
      updatePlayerUI();
      if (playerStatus) {
        playerStatus.textContent = 'No playable tracks available';
      }
      return;
    }
    targetIndex = fallbackIndex;
  }
  currentTrackIndex = targetIndex;
  isPlaying = Boolean(autoplay);
  updatePlayerUI();
  pendingTrackSelection = { index: currentTrackIndex, autoplay: isPlaying };
  ensureYouTubePlayer().then((player) => {
    flushPendingTrackSelection(player);
  });
}

function initMusicAfterGesture() {
  if (!PLAYLIST.length) {
    return;
  }
  selectTrack(currentTrackIndex, { autoplay: true });
}

function markTrackUnavailable(index) {
  if (!PLAYLIST[index]) {
    return;
  }
  unavailableTrackIndexes.add(index);
  updateUnavailableTrackUI(index);
}

function handlePlayerError() {
  if (!PLAYLIST.length) {
    return;
  }
  markTrackUnavailable(currentTrackIndex);
  const nextIndex = findNextPlayableIndex(currentTrackIndex, 1);
  if (nextIndex === null) {
    isPlaying = false;
    updatePlayerUI();
    if (playerStatus) {
      playerStatus.textContent = 'No playable tracks available';
    }
    return;
  }
  if (playerStatus) {
    playerStatus.textContent = 'Skipping unavailable song…';
  }
  selectTrack(nextIndex, { autoplay: true });
}

updatePlayerUI();

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    if (!PLAYLIST.length) {
      return;
    }
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    if (!PLAYLIST.length) {
      return;
    }
    const nextIndex = findNextPlayableIndex(currentTrackIndex, -1);
    if (nextIndex === null) {
      return;
    }
    const shouldAutoplay = isPlaying;
    selectTrack(nextIndex, { autoplay: shouldAutoplay });
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (!PLAYLIST.length) {
      return;
    }
    const nextIndex = findNextPlayableIndex(currentTrackIndex, 1);
    if (nextIndex === null) {
      return;
    }
    const shouldAutoplay = isPlaying;
    selectTrack(nextIndex, { autoplay: shouldAutoplay });
  });
}

if (playlistEl) {
  playlistEl.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-index]');
    if (!button) {
      return;
    }
    const index = Number.parseInt(button.dataset.index, 10);
    if (Number.isNaN(index)) {
      return;
    }
    if (unavailableTrackIndexes.has(index)) {
      return;
    }
    selectTrack(index, { autoplay: true });
  });
}

// ======= Smooth reveal on scroll =======
const revealEls = document.querySelectorAll('.reveal');
let revealObserver = null;

function reveal() {
  if (prefersReducedMotion) {
    return;
  }
  if (!revealObserver) {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < viewportHeight * 0.9 && rect.bottom > viewportHeight * 0.08;
      el.classList.toggle('is-visible', isVisible);
      el.classList.toggle('is-hidden', !isVisible);
    });
  }
}

if (!prefersReducedMotion && typeof IntersectionObserver === 'function') {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entry.target.classList.remove('is-hidden');
        } else {
          entry.target.classList.remove('is-visible');
          entry.target.classList.add('is-hidden');
        }
      });
    },
    { threshold: 0.25, rootMargin: '0px 0px -10% 0px' }
  );
  revealEls.forEach((el) => {
    el.classList.add('is-hidden');
    revealObserver.observe(el);
  });
} else {
  revealEls.forEach((el) => {
    el.classList.add('is-visible');
    el.classList.remove('is-hidden');
  });
}

function updateScrollTopButton() {
  if (!scrollTopBtn) {
    return;
  }
  const threshold = Math.max(window.innerHeight * 0.35, 260);
  const shouldShow = window.scrollY > threshold;
  scrollTopBtn.classList.toggle('is-visible', shouldShow);
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}

// ======= Timeline render =======
const tList = document.getElementById('timelineList');
function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
}
function renderTimeline() {
  tList.innerHTML = timelineData
    .map(
      (item) => `
        <div class="t-item">
          <div class="t-title">${item.title}</div>
          <div class="t-date">${formatDate(item.date)}</div>
          ${item.note ? `<div style="margin-top:6px">${item.note}</div>` : ''}
        </div>
      `
    )
    .join('');
}
renderTimeline();

// ======= Quotes rotation =======
const quoteBox = document.getElementById('quoteBox');
let qIndex = 0;
setInterval(() => {
  qIndex = (qIndex + 1) % quotes.length;
  quoteBox.animate(
    [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 0, transform: 'translateY(-6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 800, easing: 'ease' }
  );
  setTimeout(() => {
    quoteBox.textContent = `"${quotes[qIndex]}"`;
  }, 350);
}, 5000);

window.addEventListener(
  'scroll',
  () => {
    updateScrollTopButton();
    if (!revealObserver) {
      reveal();
    }
  },
  { passive: true }
);

window.addEventListener('resize', () => {
  updateScrollTopButton();
  if (!revealObserver) {
    reveal();
  }
});

updateScrollTopButton();
reveal();

// ======= Heart particles =======
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let w, h, hearts;

function resize() {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
}
addEventListener('resize', resize);
resize();

function makeHeart() {
  const size = Math.random() * 10 + 6;
  return {
    x: Math.random() * w,
    y: h + Math.random() * h * 0.2,
    size,
    alpha: Math.random() * 0.7 + 0.25,
    speed: Math.random() * 0.6 + 0.25,
    drift: (Math.random() - 0.5) * 0.6,
  };
}
hearts = Array.from({ length: 80 }, makeHeart);

function drawHeart(x, y, s, a) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s / 16, s / 16);
  ctx.globalAlpha = a;
  ctx.fillStyle = '#ff9ac4';
  ctx.beginPath();
  ctx.moveTo(0, 6);
  ctx.bezierCurveTo(0, 0, -8, -4, -8, -10);
  ctx.bezierCurveTo(-8, -16, -2, -16, 0, -12);
  ctx.bezierCurveTo(2, -16, 8, -16, 8, -10);
  ctx.bezierCurveTo(8, -4, 0, 0, 0, 6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function tick() {
  ctx.clearRect(0, 0, w, h);
  for (const p of hearts) {
    p.y -= p.speed;
    p.x += p.drift;
    p.alpha -= 0.0009;
    drawHeart(p.x, p.y, p.size, Math.max(p.alpha, 0));
    if (p.y < -20 || p.alpha <= 0) {
      Object.assign(p, makeHeart());
    }
  }
  requestAnimationFrame(tick);
}
tick();
