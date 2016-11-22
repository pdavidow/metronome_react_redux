import {
  oscillatorForTick,
  playDurationForTick,
  oscillator_Spacer
} from '../audioTick';

import {getDestination} from './destination';

import {
  audioTest,
  audioTest_playTicks,
  audioTest_playTick
} from '../../test/browser/utils';
////////////////////////////////////

let audioContext;
let oscillators = [];
let isStopped = true;

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

const initializedAudioContext = () => {
  initialize();
  return audioContext;
};

const playTicks = ({
  ticks = []
} = {}) => playTicksWithAudioContext({ticks, audioContext});

const playTicksWithAudioContext = ({
  ticks = [],
  audioContext
} = {}) => {
  isStopped = false;
  audioTest_playTicks({ticks, audioContext});

  oscillators = [];
  ticks.forEach((tick) => {
    if (isStopped) return;
    playTick({tick, audioContext});
    if (tick.isSpacer) playTickAsSpacer({tick, audioContext});
  })
};

const playTick = ({tick, audioContext}) => {
  audioTest_playTick({tick, audioContext});
  const {startOffset} = tick;
  const playDuration = playDurationForTick({tick});
  const oscillator = oscillatorForTick({tick, audioContext});
  playOscillator({oscillator, startOffset, playDuration, audioContext});
};

const playTickAsSpacer = ({tick, audioContext}) => {
  const {startOffset, duration, onSpaceEnded} = tick;
  const playDuration = duration;
  const oscillator = oscillator_Spacer({audioContext});
  const onEnded = onSpaceEnded;
  playOscillator({oscillator, startOffset, playDuration, onEnded, audioContext});
};

const playOscillator = ({oscillator, startOffset = 0, playDuration = 1, onEnded, audioContext}) => {
  oscillators.push(oscillator);
  if (onEnded != undefined) oscillator.onended = onEnded;

  if (audioTest({oscillator, startOffset, playDuration, audioContext})) return;

  const startTime = audioContext.currentTime + startOffset;
  const destination = getDestination({audioContext});

  oscillator.connect(destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + playDuration);
};

const stopTicks = () => {
  isStopped = true;
  oscillators.forEach((each) => each.stop());
};

export {
  initialize,
  initializedAudioContext,
  playTicks,
  stopTicks
};



