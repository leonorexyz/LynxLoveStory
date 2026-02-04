import { prefersReducedMotion, onReduceMotionPreferenceChange } from './accessibility.js';

const typewriterEls = document.querySelectorAll('[data-typewriter]');
const revealEls = document.querySelectorAll('.reveal');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const canvas = document.getElementById('particles');

let typewriterStarted = false;
let revealObserver = null;

// ======= Typewriter Animation =======
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

export function startTypewriterAnimations() {
  if (typewriterStarted) {
    return;
  }
  typewriterStarted = true;
  typewriterEls.forEach((el) => animateTypewriter(el));
}

// ======= Scroll Reveal =======
export function reveal() {
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

export function initReveal() {
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
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' },
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
}

// ======= Scroll Top Button =======
export function updateScrollTopButton() {
  if (!scrollTopBtn) {
    return;
  }
  const threshold = Math.max(window.innerHeight * 0.35, 260);
  const shouldShow = window.scrollY > threshold;
  scrollTopBtn.classList.toggle('is-visible', shouldShow);
}

export function initScrollTopButton() {
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }
}

// ======= Heart Particles =======
let w, h, hearts;
let ctx = null;

function resize() {
  if (!canvas) return;
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
}

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
  if (!ctx) return;
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

export function initParticles() {
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  addEventListener('resize', resize);
  resize();
  hearts = Array.from({ length: 80 }, makeHeart);
  tick();
}

// ======= Initialize All Animations =======
export function initAnimations() {
  initReveal();
  initScrollTopButton();
  initParticles();

  window.addEventListener(
    'scroll',
    () => {
      updateScrollTopButton();
      if (!revealObserver) {
        reveal();
      }
    },
    { passive: true },
  );

  window.addEventListener('resize', () => {
    updateScrollTopButton();
    if (!revealObserver) {
      reveal();
    }
  });

  updateScrollTopButton();
  reveal();
}
