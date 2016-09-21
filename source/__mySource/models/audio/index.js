import {
  RH_AUDIO_FREQ,
  LH_AUDIO_FREQ,
  BACKGROUND_AUDIO_FREQ,
  RH_TICK_DURATION,
  LH_TICK_DURATION,
  BACKGROUND_TICK_DURATION
//} from '__mySource/constants/audio'; todo
} from '/home/nitrous/code/mrr/source/__mySource/constants/audio';

let audioContext;

const initialize = () => {
  try {
  // NOTE: THIS RELIES ON THE MONKEYPATCH LIBRARY BEING LOADED FROM
  // Http://cwilso.github.io/AudioContext-MonkeyPatch/AudioContextMonkeyPatch.js
  // TO WORK ON CURRENT CHROME!!  But this means our code can be properly
  // spec-compliant, and work on Chrome, Safari and Firefox.
    audioContext = new AudioContext();
  }
  catch (e) {
    alert('Web Audio API is not supported in current browser');
  };
};

const playTicks = ({
  ticks = []
} = {}) => {
  ticks.forEach(({isRH, isLH, startOffset, onEnded}) => {
    if (isRH) playRhTick({startOffset, onEnded});
    if (isLH) playLhTick({startOffset, onEnded});
    if (!isRH && !isLH) playBackgroundTick({startOffset, onEnded});
    }
  )
};

const playRhTick = ({startOffset, onEnded}) => {
  const oscillator = rhOscillator();
  const duration = RH_TICK_DURATION;
  playOscillator({oscillator, startOffset, duration, onEnded});
};
const playLhTick = ({startOffset, onEnded}) => {
  const oscillator = lhOscillator();
  const duration = LH_TICK_DURATION;
  playOscillator({oscillator, startOffset, duration, onEnded});
};
const playBackgroundTick = ({startOffset, onEnded}) => {
  const oscillator = backgroundOscillator();
  const duration = BACKGROUND_TICK_DURATION;
  playOscillator({oscillator, startOffset, duration, onEnded});
};

const playOscillator = ({oscillator, startOffset = 0, duration = 1, onEnded}) => {
  const startTime = audioContext.currentTime + startOffset;
  oscillator.connect(audioContext.destination);
  if (onEnded != undefined) oscillator.onended = onEnded;
  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
};

const rhOscillator = () => {
  const freq = RH_AUDIO_FREQ;
  return oscillator({freq});
};
const lhOscillator = () => {
  const freq = LH_AUDIO_FREQ;
  return oscillator({freq});
};
const backgroundOscillator = () => {
  const freq = BACKGROUND_AUDIO_FREQ;
  return oscillator({freq});
};

const oscillator = ({freq = 0} = {}) => {
  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = freq;
  return oscillator;
};

export {
  initialize,
  playTicks
};



