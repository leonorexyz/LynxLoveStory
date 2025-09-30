// Moved from index.html
// ======= CONFIG (edit these!) =======
const PIN_CODE = '200125'; // required 6-digit pin
const PLAYLIST = [
  // Add new songs or reorder existing ones here to adjust the playlist sequence.
  { id: 'OT5msu-dap8', title: 'Backstreet Boys - Shape of My Heart' },
  { id: '8MG--WuNW1Y', title: 'Wei Bird - Red Scarf' },
  { id: '5W0UH4VbptE', title: 'PK Haeman - Evergreen Part 2' },
];

const loveLetters = [
  {
    ring: 'images/Ring/ring_01-ayodance-sugar.png',
    letter: "images/LP Love Letter ♡/Chapter 0 - Sugar - 20.01.2025.jpg",
    chapter: 'Chapter 0',
    flavor: 'Sugar',
    date: '20.01.2025',
  },
  {
    ring: 'images/Ring/ring_02-ayodance-sweet.png',
    letter: "images/LP Love Letter ♡/Chapter 1 - Sweet - 20.01.2025.jpg",
    chapter: 'Chapter 1',
    flavor: 'Sweet',
    date: '20.01.2025',
  },
  {
    ring: 'images/Ring/ring_03-ayodance-candy.png',
    letter: "images/LP Love Letter ♡/Chapter 2 - Candy - 21.01.2025.jpg",
    chapter: 'Chapter 2',
    flavor: 'Candy',
    date: '21.01.2025',
  },
  {
    ring: 'images/Ring/ring_04-ayodance-cherry.png',
    letter: "images/LP Love Letter ♡/Chapter 3 - Cherry - 21.01.2025.jpg",
    chapter: 'Chapter 3',
    flavor: 'Cherry',
    date: '21.01.2025',
  },
  {
    ring: 'images/Ring/ring_05-ayodance-strawberry.png',
    letter: "images/LP Love Letter ♡/Chapter 4 - Strawberry - 22.01.2025.jpg",
    chapter: 'Chapter 4',
    flavor: 'Strawberry',
    date: '22.01.2025',
  },
  {
    ring: 'images/Ring/ring_06-ayodance-honey.png',
    letter: "images/LP Love Letter ♡/Chapter 5 - Honey - 23.01.2025.jpg",
    chapter: 'Chapter 5',
    flavor: 'Honey',
    date: '23.01.2025',
  },
  {
    ring: 'images/Ring/ring_07-ayodance-chocholate.png',
    letter: "images/LP Love Letter ♡/Chapter 6 - Chocolate - 24.01.2025.jpg",
    chapter: 'Chapter 6',
    flavor: 'Chocolate',
    date: '24.01.2025',
  },
  {
    ring: 'images/Ring/ring_08-ayodance-cupcake.png',
    letter: "images/LP Love Letter ♡/Chapter 7 - Cupcake - 25.01.2025.jpg",
    chapter: 'Chapter 7',
    flavor: 'Cupcake',
    date: '25.01.2025',
  },
  {
    ring: 'images/Ring/ring_09-ayodance-brownies.png',
    letter: "images/LP Love Letter ♡/Chapter 8 - Brownies - 30.01.2025.jpg",
    chapter: 'Chapter 8',
    flavor: 'Brownies',
    date: '30.01.2025',
  },
  {
    ring: 'images/Ring/ring_10-ayodance-tiramisu.png',
    letter: "images/LP Love Letter ♡/Chapter 9 - Tiramisu - 30.01.2025.jpg",
    chapter: 'Chapter 9',
    flavor: 'Tiramisu',
    date: '30.01.2025',
  },
  {
    ring: 'images/Ring/ring_11-ayodance-sakura.png',
    letter: "images/LP Love Letter ♡/Chapter 10 - Sakura - 01.02.2025.jpg",
    chapter: 'Chapter 10',
    flavor: 'Sakura',
    date: '01.02.2025',
  },
  {
    ring: 'images/Ring/ring_12-ayodance-roses.png',
    letter: "images/LP Love Letter ♡/Chapter 11 - Roses - 03.02.2025.jpg",
    chapter: 'Chapter 11',
    flavor: 'Roses',
    date: '03.02.2025',
  },
  {
    ring: 'images/Ring/ring_13-ayodance-edelweiss.png',
    letter: "images/LP Love Letter ♡/Chapter 12 - Edelweiss - 14.02.2025.jpg",
    chapter: 'Chapter 12',
    flavor: 'Edelweiss',
    date: '14.02.2025',
  },
  {
    ring: 'images/Ring/ring_14-ayodance-lobelia.png',
    letter: "images/LP Love Letter ♡/Chapter 13 - Lobelia - 21.03.2025.jpg",
    chapter: 'Chapter 13',
    flavor: 'Lobelia',
    date: '21.03.2025',
  },
  {
    ring: 'images/Ring/ring_15-ayodance-peppermint.png',
    letter: "images/LP Love Letter ♡/Chapter 14 - Peppermint - 22.04.2025.jpg",
    chapter: 'Chapter 14',
    flavor: 'Peppermint',
    date: '22.04.2025',
  },
  {
    ring: 'images/Ring/ring_16-ayodance-iris.png',
    letter: "images/LP Love Letter ♡/Chapter 15 - Iris - 29.09.2025.jpg",
    chapter: 'Chapter 15',
    flavor: 'Iris',
    date: '29.09.2025',
  },
];

const letterGalleryEl = document.getElementById('letterGallery');
const loveLightboxEl = document.getElementById('loveLightbox');
const lightboxImageEl = document.getElementById('lightboxImage');
const lightboxCaptionEl = document.getElementById('lightboxCaption');
const lightboxCloseBtn = document.getElementById('lightboxClose');

let lastLetterTrigger = null;

function buildLetterCaption(letter) {
  return `${letter.chapter} - ${letter.flavor} - ${letter.date}`;
}

function openLoveLetter(index, trigger) {
  const letter = loveLetters[index];
  if (!letter || !loveLightboxEl) {
    return;
  }
  lastLetterTrigger = trigger || null;
  if (lightboxImageEl) {
    lightboxImageEl.src = letter.letter;
    lightboxImageEl.alt = `${buildLetterCaption(letter)} love letter`;
  }
  if (lightboxCaptionEl) {
    lightboxCaptionEl.textContent = buildLetterCaption(letter);
  }
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
  document.body.style.overflow = '';
  if (lightboxImageEl) {
    lightboxImageEl.src = '';
    lightboxImageEl.alt = '';
  }
  if (lightboxCaptionEl) {
    lightboxCaptionEl.textContent = '';
  }
  if (lastLetterTrigger) {
    lastLetterTrigger.focus();
  }
  lastLetterTrigger = null;
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

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && loveLightboxEl && loveLightboxEl.classList.contains('is-visible')) {
    closeLoveLetter();
  }
});

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
  initMusicAfterGesture();
  reveal();
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

function buildPlaylistSrc(activeIndex, { autoplay = true, mute = false } = {}) {
  const track = PLAYLIST[activeIndex];
  if (!track) {
    return '';
  }
  const playlistIds = PLAYLIST.map((item) => item.id).join(',');
  const base = `https://www.youtube.com/embed/${track.id}`;
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    loop: '1',
    playlist: playlistIds,
    controls: '0',
    modestbranding: '1',
    rel: '0',
    mute: mute ? '1' : '0',
  });
  return `${base}?${params.toString()}`;
}

function setYT(src) {
  if (yt) {
    yt.src = src;
  }
}

function highlightActiveTrack() {
  if (!playlistEl) {
    return;
  }
  const tracks = playlistEl.querySelectorAll('.player-track');
  tracks.forEach((item, index) => {
    item.classList.toggle('is-active', index === currentTrackIndex);
  });
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

function updatePlayerUI() {
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
  highlightActiveTrack();
}

function renderPlaylist() {
  if (!playlistEl) {
    return;
  }
  playlistEl.innerHTML = PLAYLIST.map((track, index) => {
    const number = String(index + 1).padStart(2, '0');
    return `
      <li class="player-track${index === currentTrackIndex ? ' is-active' : ''}">
        <button type="button" data-index="${index}">
          <span class="track-index">${number}</span>
          <span class="track-title">${escapeHtml(track.title)}</span>
        </button>
      </li>
    `;
  }).join('');
}

function buildAndSetSrc(options) {
  const src = buildPlaylistSrc(currentTrackIndex, options);
  if (src) {
    setYT(src);
  }
}

function playMusic() {
  if (!PLAYLIST.length) {
    return;
  }
  buildAndSetSrc({ autoplay: true, mute: false });
  isPlaying = true;
  updatePlayerUI();
}

function pauseMusic() {
  if (!PLAYLIST.length) {
    return;
  }
  if (!yt || !yt.src) {
    isPlaying = false;
    updatePlayerUI();
    return;
  }
  buildAndSetSrc({ autoplay: false, mute: true });
  isPlaying = false;
  updatePlayerUI();
}

function selectTrack(index, { autoplay = true } = {}) {
  if (!PLAYLIST[index]) {
    return;
  }
  currentTrackIndex = index;
  if (autoplay) {
    playMusic();
  } else {
    buildAndSetSrc({ autoplay: false, mute: true });
    isPlaying = false;
    updatePlayerUI();
  }
}

function initMusicAfterGesture() {
  if (!PLAYLIST.length) {
    return;
  }
  selectTrack(currentTrackIndex, { autoplay: true });
}

renderPlaylist();
updatePlayerUI();

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    if (!PLAYLIST.length) {
      return;
    }
    if (!yt || !yt.src) {
      selectTrack(currentTrackIndex, { autoplay: true });
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
    const nextIndex = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    const shouldAutoplay = isPlaying;
    selectTrack(nextIndex, { autoplay: shouldAutoplay });
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (!PLAYLIST.length) {
      return;
    }
    const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
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
    selectTrack(index, { autoplay: true });
  });
}

// ======= Smooth reveal on scroll =======
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((ent) => {
      if (ent.isIntersecting) {
        ent.target.classList.add('show');
        io.unobserve(ent.target);
      }
    });
  },
  { threshold: 0.2 }
);
revealEls.forEach((el) => io.observe(el));

function reveal() {
  revealEls.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight - 80) {
      el.classList.add('show');
    }
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
