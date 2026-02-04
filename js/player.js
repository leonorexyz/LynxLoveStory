import { PLAYLIST } from './config.js';
import { escapeHtml } from './utils.js';

const yt = document.getElementById('yt');
const playerEl = document.getElementById('player');
const playerStatus = document.getElementById('playerStatus');
const playerTitle = document.getElementById('playerTitle');
const toggleBtn = document.getElementById('toggleMusic');
const prevBtn = document.getElementById('prevTrack');
const nextBtn = document.getElementById('nextTrack');
const playlistEl = document.getElementById('playlist');
const playlistToggleBtn = document.getElementById('playlistToggle');
const playlistPanelEl = document.getElementById('playlistPanel');

let isPlaying = false;
let currentTrackIndex = 0;
const unavailableTrackIndexes = new Set();
let isPlaylistExpanded = true;

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

function setPlaylistExpanded(expanded) {
  isPlaylistExpanded = Boolean(expanded);
  if (!playerEl || !playlistToggleBtn || !playlistPanelEl) {
    return;
  }
  playerEl.classList.toggle('player--playlist-collapsed', !isPlaylistExpanded);
  playlistToggleBtn.setAttribute('aria-expanded', isPlaylistExpanded ? 'true' : 'false');
  playlistPanelEl.setAttribute('aria-hidden', isPlaylistExpanded ? 'false' : 'true');
  if (isPlaylistExpanded) {
    playlistPanelEl.removeAttribute('inert');
  } else {
    playlistPanelEl.setAttribute('inert', '');
  }
  if (playlistEl) {
    const trackButtons = playlistEl.querySelectorAll('button');
    trackButtons.forEach((button) => {
      if (button.disabled) {
        button.tabIndex = -1;
        return;
      }
      button.tabIndex = isPlaylistExpanded ? 0 : -1;
    });
  }
}

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

function markTrackUnavailable(index) {
  if (!PLAYLIST[index]) {
    return;
  }
  unavailableTrackIndexes.add(index);
  updateUnavailableTrackUI(index);
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
  setPlaylistExpanded(isPlaylistExpanded);
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

export function initMusicAfterGesture() {
  if (!PLAYLIST.length) {
    return;
  }
  selectTrack(currentTrackIndex, { autoplay: true });
}

export function showPlayer() {
  if (playerEl) {
    playerEl.style.display = 'flex';
  }
}

export function initPlayer() {
  setPlaylistExpanded(isPlaylistExpanded);
  updatePlayerUI();

  // Set up YouTube API callback
  window.onYouTubeIframeAPIReady = () => {
    if (!yt) {
      if (typeof youTubePlayerReadyResolve === 'function') {
        youTubePlayerReadyResolve(null);
      }
      return;
    }
    createYouTubePlayer();
  };

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

  if (playlistToggleBtn) {
    playlistToggleBtn.addEventListener('click', () => {
      setPlaylistExpanded(!isPlaylistExpanded);
    });
  }
}
