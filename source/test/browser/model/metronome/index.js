import test from 'tape-async';
import sleep from 'sleep-promise';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined

import {play} from '../../../../models/metronome';
import {initialize as initializeAudio} from '../../../../models/audio';
import {TICK_DURATION_RH_LH} from '../../../../constants/audio';
import {
  audioTestStart,
  audioTestEnd,
} from '../../../../models/audio/destination';
////////////////////////////////////

initializeAudio();
// todo redo all
test('Metronome model', nestOuter => {
  nestOuter.test('...onEnded should work for all 4 tick types', nestInner => {
    nestInner.test('......last tick isRH only', async(assert) => {
      audioTestStart();
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
      audioTestEnd();
    });
    nestInner.test('......last tick isLH only', async(assert) => {
      audioTestStart();
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
      audioTestEnd();
    });
    nestInner.test('......last tick isRH and isLH', async(assert) => {
      audioTestStart();
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
      audioTestEnd();
    });
    nestInner.test('......last tick is background', async(assert) => {
      audioTestStart();
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
      audioTestEnd();
    });
  });
  nestOuter.test('...OnEnded should only be called when last tick has ended', nestInner => {
    const delta_ms = 400; // leave room
    const TICK_DURATION_RH_LH_ms = TICK_DURATION_RH_LH * 1000; // The only ticks to be used here are RH_LH
    const waitOffset_ms = TICK_DURATION_RH_LH_ms + delta_ms;
    nestInner.test('......3 ticks, after 1st: do nothing', async(assert) => {
      audioTestStart();
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
      audioTestEnd();
    });
    nestInner.test('......3 ticks, after 2nd: do nothing', async(assert) => {
      audioTestStart();
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
      audioTestEnd();
    });
    nestInner.test('......3 ticks, after 3rd: do something', async(assert) => {
      audioTestStart();
      const msg = 'Should increment';

      const beat = {rh: 3, lh: 3};
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 3};
      let value = 0;
      const onEnded = () => value++;
      play({beat, metronomeSetting, onEnded});
      await sleep((1 * 1000) + 1000); // leave lots of room

      const expected = 1;
      const actual = await Promise.resolve(value);

      assert.equal(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
  });
  nestOuter.test('...onEnded should signal actual end of the beat itself, not necessarily the end of the last sound in the beat', async(assert) => {
    audioTestStart();
    const msg = 'Should not increment value until 2 seconds';

    // 1 tick, at 2 seconds per tick
    const beat = {rh: 1, lh: 1};
    const metronomeSetting = {classicTicksPerMinute: 30, classicTicksPerBeat: 1};

    let value = 0;
    const onEnded = () => value++;
    play({beat, metronomeSetting, onEnded});
    await sleep(1000);

    const expected = 0;
    const actual = await Promise.resolve(value);

    //assert.equal(actual, expected, msg);
    assert.end();
    audioTestEnd();
  });
});
