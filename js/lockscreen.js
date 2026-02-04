import { PIN_CODE } from './config.js';
import { startTypewriterAnimations, reveal, updateScrollTopButton } from './animations.js';
import { initMusicAfterGesture, showPlayer } from './player.js';

const lock = document.getElementById('lockscreen');
const pin = document.getElementById('pin');
const unlockBtn = document.getElementById('unlockBtn');
const errorEl = document.getElementById('error');

function wrongPin() {
  if (errorEl) {
    errorEl.style.display = 'block';
  }
  const lockCard = lock?.querySelector('.lock-card');
  if (lockCard) {
    lockCard.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 300, easing: 'ease-in-out' });
  }
}

function unlockSite() {
  if (lock) {
    lock.style.display = 'none';
  }
  startTypewriterAnimations();
  initMusicAfterGesture();
  reveal();
  updateScrollTopButton();
  showPlayer();
}

function checkPin() {
  if (pin?.value === PIN_CODE) {
    unlockSite();
  } else {
    wrongPin();
    setTimeout(() => location.reload(), 1000);
  }
}

export function initLockscreen() {
  if (unlockBtn) {
    unlockBtn.addEventListener('click', checkPin);
  }

  if (pin) {
    pin.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkPin();
    });
  }

  // If lock screen is not visible, start animations
  if (!lock || window.getComputedStyle(lock).display === 'none') {
    startTypewriterAnimations();
  }
}
