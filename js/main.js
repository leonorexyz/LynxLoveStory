// Moved from index.html
// ======= Lightbox for Letter 1 Image =======
document.addEventListener('DOMContentLoaded', function () {
  var link = document.getElementById('letter1-img-link');
  var lightbox = document.getElementById('lightbox-letter1');
  if (link && lightbox) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      lightbox.style.display = 'flex';
    });
    lightbox.addEventListener('click', function () {
      lightbox.style.display = 'none';
    });
  }
});

// ======= CONFIG (edit these!) =======
const PIN_CODE = '200125'; // required 6-digit pin
const PLAYLIST = [
  // Add new songs or reorder existing ones here to adjust the playlist sequence.
  { id: 'OT5msu-dap8', title: 'Backstreet Boys - Shape of My Heart' },
  { id: '8MG--WuNW1Y', title: 'Wei Bird - Red Scarf' },
  { id: '5W0UH4VbptE', title: 'PK Haeman - Evergreen Part 2' },
];

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
