import {BufferLoader} from './buffer_loader';
import raw_tone_700hz from  '__mySource/assets/audio/tone_700hz.mp3';

const Audio = {
  initializeSound_onFinishedLoading: function(finishedLoadingFunction) {
    Audio.finishedLoadingFunction = finishedLoadingFunction;
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      window.context = new AudioContext();
    }
    catch (e) {
      alert('Web Audio API is not supported in Audio browser');
    }
    var bufferLoader = new BufferLoader(context, Audio.toneSounds, Audio.finishedLoading);
    bufferLoader.load();
  },
  get toneSounds() {
    return [
      raw_tone_700hz];
  },
  finishedLoading: function(buffers) {
    Audio.assignTones(buffers);
    if (Audio.finishedLoadingFunction) Audio.finishedLoadingFunction.apply();
  },
  assignTones: function(buffers) {
    Audio.tone_700hz = buffers[0];
  },
  startBufferAtTimeAtPosition: function(buffer, time, vector) {
    var source = context.createBufferSource();
    var panner = context.createPanner();
    source.buffer = buffer;
    panner.setPosition(vector[0], vector[1], vector[2]);
    panner.connect(context.destination);
    source.connect(panner);
    source.start(time);
    return source;
  },
  startBufferAtTime: function(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(time);
    return source;
  },
  playAudio: function() {
    console.log("...play");
    Audio.startBufferAtTime(Audio.tone_700hz, 0);
  },
};

export {Audio};

