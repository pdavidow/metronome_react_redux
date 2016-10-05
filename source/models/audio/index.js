import {sum} from 'lodash'; // todo temp

import {
  AUDIO_FREQ_RH,
  AUDIO_FREQ_LH,
  AUDIO_FREQ_RH_LH,
  AUDIO_FREQ_BACKGROUND,
  TICK_DURATION_RH,
  TICK_DURATION_LH,
  TICK_DURATION_RH_LH,
  TICK_DURATION_BACKGROUND
} from '../../constants/audio';

import {
  isTick_Rh,
  isTick_Lh,
  isTick_RhLh,
  isTick_Background
} from '../tick';

import {
  getDestination,
  embeddedAudioTest
} from './destination';
////////////////////////////////////

let audioContext;

const initialize = () => {
  try {
  // NOTE: THIS RELIES ON THE MONKEYPATCH LIBRARY BEING LOADED FROM
  // Http://cwilso.github.io/AudioContext-MonkeyPatch/AudioContextMonkeyPatch.js
  // TO WORK ON CURRENT CHROME!!  But this means our code can be properly
  // spec-compliant, and work on Chrome, Safari and Firefox.
    if (audioContext == undefined) audioContext = new AudioContext();
  }
  catch (e) {
    alert('Web Audio API is not supported in current browser');
  };
};

const playTicks = ({
  ticks = []
} = {}) => {
  ticks.forEach((tick) => {
    const {startOffset, onEnded} = tick;

    if (isTick_Background(tick)) return playTick_Background({startOffset, onEnded});
    if (isTick_Rh(tick)) return playTick_Rh({startOffset, onEnded});
    if (isTick_Lh(tick)) return playTick_Lh({startOffset, onEnded});
    if (isTick_RhLh(tick)) return playTick_RhLh({startOffset, onEnded});
    }
  )
};

const playTick_Rh = ({startOffset, onEnded}) => {
  const oscillator = oscillator_Rh();
  const duration = TICK_DURATION_RH;
  playOscillator({oscillator, startOffset, duration, onEnded});
};
const playTick_Lh = ({startOffset, onEnded}) => {
  const oscillator = oscillator_Lh();
  const duration = TICK_DURATION_LH;
  playOscillator({oscillator, startOffset, duration, onEnded});
};
const playTick_RhLh = ({startOffset, onEnded}) => {
  const oscillator = oscillator_RhLh();
  const duration = TICK_DURATION_RH_LH;
  playOscillator({oscillator, startOffset, duration, onEnded});
};
const playTick_Background = ({startOffset, onEnded}) => {
  const oscillator = oscillator_Background();
  const duration = TICK_DURATION_BACKGROUND;
  playOscillator({oscillator, startOffset, duration, onEnded});
};

const playOscillator = ({oscillator, startOffset = 0, duration = 1, onEnded}) => {
  if (embeddedAudioTest.audioTestPlay) return embeddedAudioTest.audioTestPlay({audioContext, oscillator}); // todo somehow remove in production
  if (embeddedAudioTest.audioTestStop) return embeddedAudioTest.audioTestStop({audioContext, oscillator}); // todo somehow remove in production

  const startTime = audioContext.currentTime + startOffset;
  const destination = getDestination({audioContext});

  oscillator.connect(destination);
  if (onEnded != undefined) oscillator.onended = onEnded;
  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
};

const oscillator_Rh = () => {
  const freq = AUDIO_FREQ_RH;
  return oscillator({freq});
};
const oscillator_Lh = () => {
  const freq = AUDIO_FREQ_LH;
  return oscillator({freq});
};
const oscillator_RhLh = () => {
  const freq = AUDIO_FREQ_RH_LH;
  return oscillator({freq});
};
const oscillator_Background = () => {
  const freq = AUDIO_FREQ_BACKGROUND;
  return oscillator({freq});
};

const oscillator = ({
  freq = 0
} = {}) => {
  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = freq;
  return oscillator;
};

export {
  initialize,
  playTicks
};



