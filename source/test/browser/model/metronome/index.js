import test from 'tape-async';
import sleep from 'sleep-promise';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined

import {play} from '../../../../models/metronome';
import {initialize as initializeAudio} from '../../../../models/audio';
import {TICK_DURATION_RH_LH} from '../../../../constants/audio';
////////////////////////////////////

initializeAudio();

test('Metronome model', nestOuter => {
  nestOuter.test('...onEnded should work for all 4 tick types', nestInner => {
    nestInner.test('......last tick isRH only', async(assert) => {
      const msg = 'Should increment by 1';

      const beat = {rh: 2, lh: 1};
      const metronomeSetting = {classicTicksPerMinute: 240, classicTicksPerBeat: 2};
      let value = 0;
      const onEnded = () => value++;
      play({beat, metronomeSetting, onEnded});
      await sleep(1000);

      const expected = 1;
      const actual = await Promise.resolve(value);

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......last tick isLH only', async(assert) => {
      const msg = 'Should increment by 1';

      const beat = {rh: 1, lh: 2};
      const metronomeSetting = {classicTicksPerMinute: 240, classicTicksPerBeat: 2};
      let value = 0;
      const onEnded = () => value++;
      play({beat, metronomeSetting, onEnded});
      await sleep(1000);

      const expected = 1;
      const actual = await Promise.resolve(value);

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......last tick isRH and isLH', async(assert) => {
      const msg = 'Should increment by 1';

      const beat = {rh: 1, lh: 1};
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 1};
      let value = 0;
      const onEnded = () => value++;
      play({beat, metronomeSetting, onEnded});
      await sleep(1000);

      const expected = 1;
      const actual = await Promise.resolve(value);

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......last tick is background', async(assert) => {
      const msg = 'Should increment by 1';

      const beat = {rh: 2, lh: 3};
      const metronomeSetting = {classicTicksPerMinute: 480, classicTicksPerBeat: 6};
      let value = 0;
      const onEnded = () => value++;
      play({beat, metronomeSetting, onEnded});
      await sleep(1000);

      const expected = 1;
      const actual = await Promise.resolve(value);

      assert.equal(actual, expected, msg);
      assert.end();
    });
  });
  nestOuter.test('...OnEnded should only be called when last tick has ended', nestInner => {
    const delta_ms = 1; // want to wait until just after tone ends
    const TICK_DURATION_RH_LH_ms = TICK_DURATION_RH_LH * 1000; // The only ticks to be used here are RH_LH
    const waitOffset_ms = TICK_DURATION_RH_LH_ms + delta_ms;
    nestInner.test('......3 ticks, after 1st: do nothing', async(assert) => {
      const msg = 'Should not increment';

      const beat = {rh: 3, lh: 3};
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 3};
      let value = 0;
      const onEnded = () => value++;
      play({beat, metronomeSetting, onEnded});
      await sleep((0 * 1000) + waitOffset_ms);

      const expected = 0;
      const actual = await Promise.resolve(value);

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......3 ticks, after 2nd: do nothing', async(assert) => {
      const msg = 'Should not increment';

      const beat = {rh: 3, lh: 3};
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 3};
      let value = 0;
      const onEnded = () => value++;
      play({beat, metronomeSetting, onEnded});
      await sleep((0.5 * 1000) + waitOffset_ms);

      const expected = 0;
      const actual = await Promise.resolve(value);

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......3 ticks, after 3rd: do something', async(assert) => {
      const msg = 'Should increment';

      const beat = {rh: 3, lh: 3};
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 3};
      let value = 0;
      const onEnded = () => value++;
      play({beat, metronomeSetting, onEnded});
      await sleep((1 * 1000) + waitOffset_ms);

      const expected = 1;
      const actual = await Promise.resolve(value);

      assert.equal(actual, expected, msg);
      assert.end();
    });
  });
});


// todo
/*
 nest.test('audio', assert => {
 const msg = 'Should detect something';
 //https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4#.jq102o9wc
 //browserify -t babelify index.js | browser-run -p 3000

 //https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
 //https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
 //https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteTimeDomainData
 var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
 var analyser = audioCtx.createAnalyser();
 var oscillator = audioCtx.createOscillator();
 oscillator.frequency.value = 800;
 oscillator.connect(analyser);
 var t= audioCtx.currentTime;
 oscillator.start(t);
 oscillator.stop(t + 0.05);

 analyser.fftSize = 2048;
 var bufferLength = analyser.frequencyBinCount;
 var dataArray = new Uint8Array(bufferLength);
 analyser.getByteTimeDomainData(dataArray);

 const expected = true;
 const actual = dataArray.length > 0;
 console.log(dataArray);

 assert.equal(actual, expected, msg);
 assert.end();
 });
 */
