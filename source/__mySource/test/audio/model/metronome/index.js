// browserify -t babelify index.js | browser-run -p 3000

import test from 'tape-async';
import sleep from 'sleep-promise';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined

import {
  play,
//} from '/__mySource/models/metronome'; // todo
//} from '/home/nitrous/code/mrr/source/__mySource/models/metronome';
} from '../../../../models/metronome';

//import {initialize} from '/__mySource/models/audio'; // todo
//import {initialize as initializeAudio} from '/home/nitrous/code/mrr/source/__mySource/models/audio';
import {initialize as initializeAudio} from '../../../../models/audio';

import {RH_LH_TICK_DURATION
//} from '/__mySource/constants/audio'; // todo
} from '../../../../constants/audio';


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
    const RH_LH_TICK_DURATION_ms = RH_LH_TICK_DURATION * 1000; // The only ticks to be used here are RH_LH
    const waitOffset_ms = RH_LH_TICK_DURATION_ms + delta_ms;
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
