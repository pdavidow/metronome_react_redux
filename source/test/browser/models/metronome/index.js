import test from 'tape-async';
import sleep from 'sleep-promise';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import {last} from 'lodash';
import {Simulate as simulate} from 'react-addons-test-utils';

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
import {
  getDomNode,
  getElementBySelector,
  setStore,
  waitInAudioTime,
  embeddedAudioTest_playTicks
} from '../../../browser/utils';
////////////////////////////////////

const audioContext = initializedAudioContext();

// Careful: React may replace the element it is modifying, instead of changing it in place.
// So always retreive the element, instead of keeping a pointer to it.
const getPlayButton = ({domNode}) => getElementBySelector({domNode, selector: '#playButton'});
const getStopButton = ({domNode}) => getElementBySelector({domNode, selector: '#stopButton'});

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

      const ticks = calc_ticks({beats: [beat], metronomeSetting, onEndedWithLoop: onEnded});
      const startTime = audioContext.currentTime; // approx
      playTicks({ticks, onLoopCounting: ()=>{}});

      const waitTime = 0.6 ; // sec
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

      const ticks = calc_ticks({beats: [beat], metronomeSetting, onEndedWithLoop: onEnded});
      const startTime = audioContext.currentTime; // approx
      playTicks({ticks, onLoopCounting: ()=>{}});

      const waitTime = 0.6 ; // sec
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

      const ticks = calc_ticks({beats: [beat], metronomeSetting, onEndedWithLoop: onEnded});
      const startTime = audioContext.currentTime; // approx
      playTicks({ticks, onLoopCounting: ()=>{}});

      const waitTime = 0.6 ; // sec
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

      const ticks = calc_ticks({beats: [beat], metronomeSetting, onEndedWithLoop: onEnded});
      const startTime = audioContext.currentTime; // approx
      playTicks({ticks, onLoopCounting: ()=>{}});

      const waitTime = 3.2 ; // sec
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
      play({beats: [beat], metronomeSetting, isLooping: false, onLoopCounting: ()=>{}, onEnded});

      const waitTime = 0.2 ; // sec
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
      play({beats: [beat], metronomeSetting, isLooping: false, onLoopCounting: ()=>{}, onEnded});

      const waitTime = 0.7 ; // sec
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
      play({beats: [beat], metronomeSetting, isLooping: false, onLoopCounting: ()=>{}, onEnded});

      const waitTime = 1.7 ; // sec
      waitInAudioTime({waitTime, audioContext, startTime});
      await sleep(1) /* msec */; // for some reason, must sleep something

      const expected = 1;
      const actual = value;

      assert.equal(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
  });
  nestOuter.test('...onEnded should signal actual end of the beat itself, not necessarily the end of the last sound in the beat', (nestInner) => {
    nestInner.test('......Should yes increment value if beat is finished', async(assert) => {
      audioTestStart();
      const msg = 'Should increment value at 2 seconds';

      // 1 tick, at 2 seconds per tick
      const beat = {rh: 1, lh: 1};
      const metronomeSetting = {classicTicksPerMinute: 30, classicTicksPerBeat: 1};

      let value = 0;
      const onEnded = () => value++;

      const startTime = audioContext.currentTime;
      play({beats: [beat], metronomeSetting, isLooping: false, onLoopCounting: ()=>{}, onEnded});

      const waitTime = 2.2; // sec
      waitInAudioTime({waitTime, audioContext, startTime});
      await sleep(1) /* msec */; // for some reason, must sleep something

      const expected = true;
      const actual = (value == 1);

      assert.equal(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
  });
  nestOuter.test('...Loop should repeat ticks, until stopped', async(assert) => {
    // don't want to test store.player.loopCount here
    audioTestStart();
    const msg = 'Should have 5 iterations';

    // 1 tick, at 1 second duration per tick
    const beat = {rh: 1, lh: 1};
    const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1};
    const playerSetting = {isLooping: true};
    const store = setStore({beat, metronomeSetting, playerSetting});
    const domNode = getDomNode({store});
    let iterationCount = -1; // offset extra final count
    const expected = 5;

    embeddedAudioTest_playTicks.loopRepeatTicksUntilStopped = () => {
      iterationCount++;
      if (audioContext.currentTime > endTime) {
        embeddedAudioTest_playTicks.loopRepeatTicksUntilStopped = null;
        simulate.click(getStopButton({domNode}));
        const actual = iterationCount;
        assert.equal(actual, expected, msg);
        assert.end();
      };
    };
    const waitTime = expected - 0.5; // sec
    const startTime = audioContext.currentTime; // approx
    const endTime = startTime + waitTime; // approx
    simulate.click(getPlayButton({domNode}));
    await sleep(16000) /* msec */; // slows down audio clock by about 1/3
    audioTestEnd();
  });
});
