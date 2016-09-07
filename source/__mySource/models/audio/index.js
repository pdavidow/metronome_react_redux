import {BufferLoader} from './buffer_loader';

let audioContext, onFinishedLoading;
const tones = {};

const initializeSound = (callback) => {
  onFinishedLoading = callback;

  // http://chimera.labs.oreilly.com/books/1234000001552/ch01.html#s01_2
  const contextClass = (
    window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.oAudioContext ||
    window.msAudioContext
  );
  if (contextClass) {
    audioContext = contextClass();
  } else {
    alert('Web Audio API is not supported in current browser (try Chrome).');
  };

  const bufferLoader = BufferLoader(audioContext, toneSounds(), finishedLoading);
  bufferLoader.load();
};

const finishedLoading = (buffers) => {
  assignTones(buffers);
  if (onFinishedLoading) onFinishedLoading();
};

const assignTones = (buffers) => {
  tones.hz_1000 = buffers[0];
};

const startBufferAtTime = (buffer, time) => {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start(time);
  return source;
};

const play = () => {
  console.log("...play");
  startBufferAtTime(tones.hz_1000, 0);
};

const currentTime = () => audioContext.currentTime;

