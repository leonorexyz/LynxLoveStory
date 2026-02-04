const reduceMotionQuery = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

export let prefersReducedMotion = Boolean(reduceMotionQuery?.matches);

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

export function onReduceMotionPreferenceChange(callback) {
  if (typeof callback === 'function') {
    reduceMotionSubscribers.push(callback);
  }
}

export function initAccessibility() {
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
}
