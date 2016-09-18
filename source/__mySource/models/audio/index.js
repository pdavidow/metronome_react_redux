import {
  RH_AUDIO_FREQ,
  LH_AUDIO_FREQ,
  BACKGROUND_AUDIO_FREQ,
  RH_TICK_DURATION,
  LH_TICK_DURATION,
  BACKGROUND_TICK_DURATION
} from '__mySource/constants/audio';

const Audio = {
  initialize() {
    try {
    // NOTE: THIS RELIES ON THE MONKEYPATCH LIBRARY BEING LOADED FROM
    // Http://cwilso.github.io/AudioContext-MonkeyPatch/AudioContextMonkeyPatch.js
    // TO WORK ON CURRENT CHROME!!  But this means our code can be properly
    // spec-compliant, and work on Chrome, Safari and Firefox.
    Audio.audioContext = new AudioContext();
    }
    catch (e) {
      alert('Web Audio API is not supported in current browser');
    };
  },
  playOcillator({oscillator, startTime = Audio.audioContext.currentTime, duration = 1} = {}) {
    oscillator.connect(Audio.audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  },
  beepNow() {
    const oscillator = Audio.audioContext.createOscillator();
    oscillator.frequency.value = 800;
    Audio.playOcillator({oscillator, duration: 0.05});
  },
  playTicks({ticks = []}) {
    ticks.forEach(({isRH, isLH, startOffset}) => {
      if (isRH) playRhTick({startOffset});
      if (isLH) playLhTick({startOffset});
      if (!isRH && !isLH) playBackgroundTick({startOffset});
      }
    )
  },
  playRhTick({startOffset}) {
    const oscillator = rhOscillator();
    const startTime = Audio.audioContext.currentTime + startOffset;
    const duration = RH_TICK_DURATION;
    playOcillator({oscillator, startTime, duration});
  },
  playLhTick({startOffset}) {
    const oscillator = lhOscillator();
    const startTime = Audio.audioContext.currentTime + startOffset;
    const duration = LH_TICK_DURATION;
    playOcillator({oscillator, startTime, duration});
  },
  playBackgroundTick({startOffset}) {
    const oscillator = backgroundOscillator();
    const startTime = Audio.audioContext.currentTime + startOffset;
    const duration = BACKGROUND_TICK_DURATION;
    playOcillator({oscillator, startTime, duration});
  },
  rhOscillator() {
    const oscillator = Audio.audioContext.createOscillator();
    oscillator.frequency.value = RH_AUDIO_FREQ;
    return oscillator;
  },
  lhOscillator() {
    const oscillator = Audio.audioContext.createOscillator();
    oscillator.frequency.value = LH_AUDIO_FREQ;
    return oscillator;
  },
  backgroundOscillator() {
    const oscillator = Audio.audioContext.createOscillator();
    oscillator.frequency.value = BACKGROUND_AUDIO_FREQ;
    return oscillator;
  },
};

export default Audio;


