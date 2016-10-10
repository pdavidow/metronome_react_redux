import test from 'tape-async';
import sleep from 'sleep-promise';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import {last} from 'lodash';

import {
  calc_ticks,
  play,
  playTicks
} from '../../../../models/metronome';
import {
  isTick_Rh,
  isTick_Lh,
  isTick_RhLh,
  isTick_Background
} from '../../../../models/tick';
import {initializedAudioContext} from '../../../../models/audio';
import {
  audioTestStart,
  audioTestEnd,
} from '../../../../models/audio/destination';
import {waitInAudioTime} from '../../../browser/utils';
////////////////////////////////////

const audioContext = initializedAudioContext();

test('Metronome model', nestOuter => {
  nestOuter.test('...onEnded should work for all 4 tick types', nestInner => {
    nestInner.test('......last tick isRh only', async(assert) => {
      audioTestStart();
      const msg = 'Should increment by 1';

      // 2 ticks at 1/4 second each, for total of 1/2 second
      const beat = {rh: 2, lh: 1};
      const metronomeSetting = {classicTicksPerMinute: 240, classicTicksPerBeat: 2};
      let value = 0;
      const onEnded = () => value++;

      const ticks = calc_ticks({beat, metronomeSetting, onEnded});
      const startTime = audioContext.currentTime; // approx
      playTicks({ticks});

      const waitTime = 0.4 /* sec */; // Tick sound itself is very short ~ 50 msec
      waitInAudioTime({waitTime, audioContext, startTime});
      await sleep(1) /* msec */; // for some reason, must sleep something

      const expected = {
        typeMatch: true,
        value: 1
      };

      const actual = {
        typeMatch: isTick_Rh(last(ticks)),
        value
      };

      assert.deepEqual(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
    nestInner.test('......last tick isLh only', async(assert) => {
      audioTestStart();
      const msg = 'Should increment by 1';

      // 2 ticks at 1/4 second each, for total of 1/2 second
      const beat = {rh: 1, lh: 2};
      const metronomeSetting = {classicTicksPerMinute: 240, classicTicksPerBeat: 2};
      let value = 0;
      const onEnded = () => value++;

      const ticks = calc_ticks({beat, metronomeSetting, onEnded});
      const startTime = audioContext.currentTime; // approx
      playTicks({ticks});

      const waitTime = 0.4 /* sec */; // Tick sound itself is very short ~ 50 msec
      waitInAudioTime({waitTime, audioContext, startTime});
      await sleep(1) /* msec */; // for some reason, must sleep something

      const expected = {
        typeMatch: true,
        value: 1
      };

      const actual = {
        typeMatch: isTick_Lh(last(ticks)),
        value
      };

      assert.deepEqual(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
    nestInner.test('......last tick isRh and isLh', async(assert) => {
      audioTestStart();
      const msg = 'Should increment by 1';

      // 2 ticks at 1/4 second each, for total of 1/2 second
      const beat = {rh: 2, lh: 2};
      const metronomeSetting = {classicTicksPerMinute: 240, classicTicksPerBeat: 2};
      let value = 0;
      const onEnded = () => value++;

      const ticks = calc_ticks({beat, metronomeSetting, onEnded});
      const startTime = audioContext.currentTime; // approx
      playTicks({ticks});

      const waitTime = 0.4 /* sec */; // Tick sound itself is very short ~ 50 msec
      waitInAudioTime({waitTime, audioContext, startTime});
      await sleep(1) /* msec */; // for some reason, must sleep something

      const expected = {
        typeMatch: true,
        value: 1
      };

      const actual = {
        typeMatch: isTick_RhLh(last(ticks)),
        value
      };

      assert.deepEqual(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
    nestInner.test('......last tick is background', async(assert) => {
      audioTestStart();
      const msg = 'Should increment by 1';

      // 6 ticks at 1/2 second each, for total of 3 second
      const beat = {rh: 2, lh: 3};
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 6};
      let value = 0;
      const onEnded = () => value++;

      const ticks = calc_ticks({beat, metronomeSetting, onEnded});
      const startTime = audioContext.currentTime; // approx
      playTicks({ticks});

      const waitTime = 2.8 /* sec */; // Tick sound itself is very short ~ 50 msec
      waitInAudioTime({waitTime, audioContext, startTime});
      await sleep(1) /* msec */; // for some reason, must sleep something

      const expected = {
        typeMatch: true,
        value: 1
      };

      const actual = {
        typeMatch: isTick_Background(last(ticks)),
        value
      };

      assert.deepEqual(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
  });
  nestOuter.test('...onEnded should only be called when last tick has ended', nestInner => {
    nestInner.test('......3 ticks, after 1st: do nothing', async(assert) => {
      audioTestStart();
      const msg = 'Should not increment';

      // 3 ticks at 1/2 second each, for total of 1.5 sec
      const beat = {rh: 3, lh: 3};
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 3};

      let value = 0;
      const onEnded = () => value++;
      const startTime = audioContext.currentTime; // approx
      play({beat, metronomeSetting, onEnded});

      const waitTime = 0.2 /* sec */; // Tick sound itself is very short ~ 50 msec
      waitInAudioTime({waitTime, audioContext, startTime});
      await sleep(1) /* msec */; // for some reason, must sleep something

      const expected = 0;
      const actual = value;

      assert.equal(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
    nestInner.test('......3 ticks, after 2nd: do nothing', async(assert) => {
      audioTestStart();
      const msg = 'Should not increment';

      // 3 ticks at 1/2 second each, for total of 1.5 sec
      const beat = {rh: 3, lh: 3};
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 3};

      let value = 0;
      const onEnded = () => value++;
      const startTime = audioContext.currentTime; // approx
      play({beat, metronomeSetting, onEnded});

      const waitTime = 0.7 /* sec */; // Tick sound itself is very short ~ 50 msec
      waitInAudioTime({waitTime, audioContext, startTime});
      await sleep(1) /* msec */; // for some reason, must sleep something

      const expected = 0;
      const actual = value;

      assert.equal(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
    nestInner.test('......3 ticks, after 3rd: do something', async(assert) => {
      audioTestStart();
      const msg = 'Should increment';

      // 3 ticks at 1/2 second each, for total of 1.5 sec
      const beat = {rh: 3, lh: 3};
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 3};

      let value = 0;
      const onEnded = () => value++;
      const startTime = audioContext.currentTime; // approx
      play({beat, metronomeSetting, onEnded});

      const waitTime = 1.2 /* sec */; // Tick sound itself is very short ~ 50 msec
      waitInAudioTime({waitTime, audioContext, startTime});
      await sleep(1) /* msec */; // for some reason, must sleep something

      const expected = 1;
      const actual = value;

      assert.equal(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
  });
  nestOuter.test('...onEnded should signal actual end of the beat itself, not necessarily the end of the last sound in the beat', async(assert) => {
    audioTestStart();
    const msg = 'Should not increment value until 2 seconds';

    const expected = {};
    const actual = {};

    // 1 tick, at 2 seconds per tick
    const beat = {rh: 1, lh: 1};
    const metronomeSetting = {classicTicksPerMinute: 30, classicTicksPerBeat: 1};

    let value = 0;
    const onEnded = () => value++;
    const startTime = audioContext.currentTime; // approx
    play({beat, metronomeSetting, onEnded});

    const waitTime = 0.3; // sec
    waitInAudioTime({waitTime, audioContext, startTime});
    await sleep(1) /* msec */; // for some reason, must sleep something

    expected.during = 0;
    actual.during = value;

    const waitTime_more = 2; // sec
    waitInAudioTime({waitTime_more, audioContext, startTime});
    await sleep(1) /* msec */; // for some reason, must sleep something

    expected.after = 1;
    actual.after = value;

    assert.deepEqual(actual, expected, msg);
    assert.end();
    audioTestEnd();
  });
});
