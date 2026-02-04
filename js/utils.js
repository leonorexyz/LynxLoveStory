/**
 * Clamp a value between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Escape HTML special characters
 */
export function escapeHtml(text = '') {
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

/**
 * Format ISO date string to localized date
 */
export function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
}

/**
 * Restore body scroll if no lightboxes are open
 */
export function restoreBodyScroll(lightboxSelectors = []) {
  const anyOpen = lightboxSelectors.some((selector) => {
    const el = document.querySelector(selector);
    return el?.classList.contains('is-visible');
  });
  if (!anyOpen) {
    document.body.style.overflow = '';
  }
}
