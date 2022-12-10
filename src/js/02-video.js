import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const iframePlayer = new Player(iframe);

const KEY_LOCAL_STORAGE = 'videoplayer-current-time';

// * Handler Events
function eventTimeUpdate(event) {
  writeToLocalStorage(event);
}

// * function works with player
function addEventTimeUpdate() {
  iframePlayer.on('timeupdate', throttle(eventTimeUpdate, 1000));
}

function setCurentPosition(seconds) {
  iframePlayer.setCurrentTime(seconds);
}

// * function works with Local Storage
function readFromLocalStorage() {
  const seconds = localStorage.getItem('KEY_LOCAL_STORAGE');
  return !seconds ? 0 : Number(seconds);
}

function writeToLocalStorage({ seconds } = {}) {
  localStorage.setItem('KEY_LOCAL_STORAGE', seconds);
}

function initializeScript() {
  setCurentPosition(readFromLocalStorage());

  addEventTimeUpdate();
}

initializeScript();
