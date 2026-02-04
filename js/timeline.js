import { timelineData, quotes } from './config.js';
import { formatDate } from './utils.js';

const tList = document.getElementById('timelineList');
const quoteBox = document.getElementById('quoteBox');

export function renderTimeline() {
  if (!tList) return;
  tList.innerHTML = timelineData
    .map(
      (item) => `
        <div class="t-item">
          <div class="t-title">${item.title}</div>
          <div class="t-date">${formatDate(item.date)}</div>
          ${item.note ? `<div style="margin-top:6px">${item.note}</div>` : ''}
        </div>
      `,
    )
    .join('');
}

export function initQuotes() {
  if (!quoteBox || !quotes.length) return;

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
      { duration: 800, easing: 'ease' },
    );
    setTimeout(() => {
      quoteBox.textContent = `"${quotes[qIndex]}"`;
    }, 350);
  }, 5000);
}

export function initTimeline() {
  renderTimeline();
  initQuotes();
}
