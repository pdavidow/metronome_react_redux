import {
  RH_AUDIO_FREQ,
  LH_AUDIO_FREQ,
  BACKGROUND_AUDIO_FREQ,
  RH_TICK_DURATION,
  LH_TICK_DURATION,
  BACKGROUND_TICK_DURATION
} from '__mySource/constants/audio';
// todo refactor
const Audio = { // todo: only expose public API (see what I did alot in meteor code)
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
    console.log("ticks", ticks);
    ticks.forEach(({isRH, isLH, startOffset}) => {
      if (isRH) Audio.playRhTick({startOffset});
      if (isLH) Audio.playLhTick({startOffset});
      if (!isRH && !isLH) Audio.playBackgroundTick({startOffset});
      }
    )
  },
  playRhTick({startOffset}) {
    const oscillator = Audio.rhOscillator();
    const startTime = Audio.audioContext.currentTime + startOffset;
    const duration = RH_TICK_DURATION;
    Audio.playOcillator({oscillator, startTime, duration});
  },
  playLhTick({startOffset}) {
    const oscillator = Audio.lhOscillator();
    const startTime = Audio.audioContext.currentTime + startOffset;
    const duration = LH_TICK_DURATION;
    Audio.playOcillator({oscillator, startTime, duration});
  },
  playBackgroundTick({startOffset}) {
    const oscillator = Audio.backgroundOscillator();
    const startTime = Audio.audioContext.currentTime + startOffset;
    const duration = BACKGROUND_TICK_DURATION;
    Audio.playOcillator({oscillator, startTime, duration});
  },
  rhOscillator() {
    const freq = RH_AUDIO_FREQ;
    return Audio.oscillator({freq});
  },
  lhOscillator() {
    const freq = LH_AUDIO_FREQ;
    return Audio.oscillator({freq});
  },
  backgroundOscillator() {
    const freq = BACKGROUND_AUDIO_FREQ;
    return Audio.oscillator({freq});
  },
  oscillator({freq = 0}) {
    const oscillator = Audio.audioContext.createOscillator();
    oscillator.frequency.value = freq;
    return oscillator;
  },
};

export default Audio;


