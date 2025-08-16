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
const YT_ID = '5W0UH4VbptE'; // placeholder: "Falling In Love" acoustic style (example). Replace with your song.

// Timeline data (edit dates/labels)
const timelineData = [
  { title: 'The day our hearts connected', date: '2024-10-15', note: 'Our story started here.' },
  { title: 'First commitment', date: '2025-01-20', note: 'Nerves, laughter, and butterflies.' },
  { title: 'First breakup', date: '2025-05-22', note: 'We learned, healed, and chose love again.' },
  { title: 'Final commitment', date: '2025-05-26', note: 'Together, stronger, softer.' },
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
  document.getElementById('player').style.display = 'flex';
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
const playerStatus = document.getElementById('playerStatus');
const toggleBtn = document.getElementById('toggleMusic');

let isPlaying = false;

function setYT(src) {
  yt.src = src;
}

function initMusicAfterGesture() {
  const base = `https://www.youtube.com/embed/${YT_ID}`;
  const params = `?autoplay=1&loop=1&playlist=${YT_ID}&controls=0&modestbranding=1&rel=0&mute=0`;
  setYT(base + params);
  isPlaying = true;
  updatePlayerUI();
}

function updatePlayerUI() {
  playerStatus.textContent = `Music: ${isPlaying ? '🎵 Playing: PK Haeman - Evergreen Part 2' : 'Stopped'}`;
  toggleBtn.textContent = isPlaying ? 'Stop' : 'Play';
}

toggleBtn.addEventListener('click', () => {
  if (!yt.src) {
    return;
  }
  if (isPlaying) {
    const base = `https://www.youtube.com/embed/${YT_ID}`;
    const params = `?autoplay=0&loop=1&playlist=${YT_ID}&controls=0&modestbranding=1&rel=0&mute=1`;
    setYT(base + params);
    isPlaying = false;
  } else {
    const base = `https://www.youtube.com/embed/${YT_ID}`;
    const params = `?autoplay=1&loop=1&playlist=${YT_ID}&controls=0&modestbranding=1&rel=0&mute=0`;
    setYT(base + params);
    isPlaying = true;
  }
  updatePlayerUI();
});

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
