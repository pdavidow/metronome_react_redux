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
  playoOcillator({oscillator, startTime = Audio.audioContext.currentTime, duration = 1} = {}) {
    oscillator.connect(Audio.audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  },
  beepNow() {
    const oscillator = Audio.audioContext.createOscillator();
    oscillator.frequency.value = 800;
    Audio.playoOcillator({oscillator, duration: 0.05});
  }
};

export default Audio;


