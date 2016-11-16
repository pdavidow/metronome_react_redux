import {
  AUDIO_FREQ_RH,
  AUDIO_FREQ_LH,
  AUDIO_FREQ_RH_LH,
  AUDIO_FREQ_BACKGROUND,
  AUDIO_FREQ_SILENT,

  TICK_DURATION_RH,
  TICK_DURATION_LH,
  TICK_DURATION_RH_LH,
  TICK_DURATION_BACKGROUND
} from '../../constants/audio';

import {
  isTick_Rh,
  isTick_Lh,
  isTick_RhLh,
  isTick_Background,
  isTick_Spacer
} from '../tick';

import {getDestination} from './destination';

import {
  audioTest,
  audioTest_playTicks
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
} = {}) => {
  isStopped = false;
  audioTest_playTicks({audioContext, ticks});

  oscillators = [];
  ticks.forEach((tick) => {
    if (isStopped) return;
    playTick({tick});
    if (tick.isSpacer) playTickAsSpacer({tick});
  })
};

const playTick = ({tick}) => {
  const {startOffset} = tick;
  const playDuration = playDurationForTick({tick});
  const oscillator = oscillatorForTick({tick});
  playOscillator({oscillator, startOffset, playDuration});
};

const playTickAsSpacer = ({tick}) => {
  const {startOffset, duration, spaceOnEnded} = tick;
  const playDuration = duration;
  const oscillator = oscillator_Spacer();
  const onEnded = spaceOnEnded;
  playOscillator({oscillator, startOffset, playDuration, onEnded});
};

const oscillatorForTick = ({tick}) => {
  if (isTick_Rh({...tick})) return oscillator_Rh();
  if (isTick_Lh({...tick})) return oscillator_Lh();
  if (isTick_RhLh({...tick})) return oscillator_RhLh();
  if (isTick_Background({...tick})) return oscillator_Background();
};

const playDurationForTick = ({tick}) => {
  if (isTick_Rh({...tick})) return TICK_DURATION_RH;
  if (isTick_Lh({...tick})) return TICK_DURATION_LH;
  if (isTick_RhLh({...tick})) return TICK_DURATION_RH_LH;
  if (isTick_Background({...tick})) return TICK_DURATION_BACKGROUND;
};

const playOscillator = ({oscillator, startOffset = 0, playDuration = 1, onEnded}) => {
  oscillators.push(oscillator);
  if (onEnded != undefined) oscillator.onended = onEnded;

  if (audioTest({audioContext, oscillator, startOffset, playDuration})) return;

  const startTime = audioContext.currentTime + startOffset;
  const destination = getDestination({audioContext});

  oscillator.connect(destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + playDuration);
};

const oscillator_Spacer     = () => oscillator({freq: AUDIO_FREQ_SILENT});
const oscillator_Rh         = () => oscillator({freq: AUDIO_FREQ_RH});
const oscillator_Lh         = () => oscillator({freq: AUDIO_FREQ_LH});
const oscillator_RhLh       = () => oscillator({freq: AUDIO_FREQ_RH_LH});
const oscillator_Background = () => oscillator({freq: AUDIO_FREQ_BACKGROUND});

const oscillator = ({
  freq = 0
} = {}) => {
  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = freq;
  return oscillator;
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



