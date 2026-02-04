import { loveLetters } from './config.js';
import { openLoveLetter } from './lightbox.js';

const letterGalleryEl = document.getElementById('letterGallery');

function buildLetterCaption(letter) {
  return `${letter.chapter} - ${letter.flavor} - ${letter.date}`;
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

export function renderLoveLetters() {
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

export function initGallery() {
  renderLoveLetters();

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
}
