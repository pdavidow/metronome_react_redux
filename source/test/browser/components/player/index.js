import {sum} from 'lodash';
import test from 'tape-async';
import sleep from 'sleep-promise';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import {Simulate as simulate} from 'react-addons-test-utils';

import {
  getDomNode,
  getElementBySelector,
  setStore,
  waitInAudioTime,
  embeddedAudioTest,
  embeddedAudioTest_playTicks,
  embeddedAudioTest_playTick
} from '../../utils';
import {
  audioTestStart,
  audioTestEnd,
} from '../../../../models/audio/destination';
import {initializedAudioContext} from '../../../../models/audio';
////////////////////////////////////

// Careful: React may replace the element it is modifying, instead of changing it in place.
// So always retreive the element, instead of keeping a pointer to it.
const getPlayButton = ({domNode}) => getElementBySelector({domNode, selector: '#playButton'});
const getStopButton = ({domNode}) => getElementBySelector({domNode, selector: '#stopButton'});
const getLoopCount = ({domNode}) => getElementBySelector({domNode, selector: '#loopCount'});
const getLoopCountSpan = ({domNode}) => getElementBySelector({domNode, selector: '#loopCountSpan'});
const getLoopBreakStatusSpan = ({domNode}) => getElementBySelector({domNode, selector: '#loopBreakStatusSpan'});
const getAlert = ({domNode}) => getElementBySelector({domNode, selector: '#alert'});
const getAlertMessage = ({domNode}) => getElementBySelector({domNode, selector: '#alertMessage'});
const getAlertDismissButton = ({domNode}) => getElementBySelector({domNode, selector: '.narcissus_n3sdvf'}); // class-name retrieved via Chrome debugger inspection

test('Player component', nestOuter => {
  nestOuter.test('...Play button should disable during play', nestInner => {
    nestInner.test('......Should render an enabled Play button by default', assert => {
      const msg = 'Should be enabled';

      const domNode = getDomNode();

      const actual = getPlayButton({domNode}).hasAttribute('disabled');
      const expected = false;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Play button should be disabled during play', (assert) => {
      audioTestStart();
      const msg = 'Should be disabled';

      // 1 tick, at 1 second duration per tick
      const beats = [{rh: 1, lh: 1}];
      const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1};
      const store = setStore({beats, metronomeSetting});
      const domNode = getDomNode({store});

      embeddedAudioTest_playTicks.playButtonDisabledDuringPlay = async() => {
        embeddedAudioTest_playTicks.playButtonDisabledDuringPlay = null;
        await sleep(200); // msec

        const actual = getPlayButton({domNode}).hasAttribute('disabled');
        const expected = true;

        assert.equal(actual, expected, msg);
        assert.end();
      };
      simulate.click(getPlayButton({domNode}));
      audioTestEnd();
    });
    nestInner.test('......Play button should be enabled after play', (assert) => {
      audioTestStart();
      const msg = 'Should be enabled';

      // 1 tick, at 1/2 second duration per tick
      const beats = [{rh: 1, lh: 1}];
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 1};
      const store = setStore({beats, metronomeSetting});
      const domNode = getDomNode({store});

      embeddedAudioTest_playTicks.playButtonEnabledAfterPlay = async() => {
        embeddedAudioTest_playTicks.playButtonEnabledAfterPlay = null;
        await sleep(1000); // msec

        const actual = getPlayButton({domNode}).hasAttribute('disabled');
        const expected = false;

        assert.equal(actual, expected, msg);
        assert.end();
      };
      simulate.click(getPlayButton({domNode}));
      waitInAudioTime({waitTime: 2, audioContext: initializedAudioContext(), startTime: 0});
      audioTestEnd();
    });
  });
  nestOuter.test('...Stop button should enable during play', nestInner => {
    nestInner.test('......Should render a disabled Stop button by default', assert => {
      const msg = 'Should be disabled';

      const domNode = getDomNode();

      const actual = getStopButton({domNode}).hasAttribute('disabled');
      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Stop button should be enabled during play', (assert) => {
      audioTestStart();
      const msg = 'Should be enabled';

      // 1 tick, at 1 second duration per tick
      const beats = [{rh: 1, lh: 1}];
      const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1};
      const store = setStore({beats, metronomeSetting});
      const domNode = getDomNode({store});

      embeddedAudioTest_playTicks.stopButtonEnabledDuringPlay = async() => {
        embeddedAudioTest_playTicks.stopButtonEnabledDuringPlay = null;
        await sleep(500); // msec
        const actual = getStopButton({domNode}).hasAttribute('disabled');
        const expected = false;

        assert.equal(actual, expected, msg);
        await sleep(20000); // msec
        assert.end();
      };
      simulate.click(getPlayButton({domNode}));
      audioTestEnd();
    });
    nestInner.test('......Stop button should be disabled after play', async(assert) => {
      audioTestStart();
      const msg = 'Should be disabled';

      // 1 tick, at 1/2 second duration per tick
      const beats = [{rh: 1, lh: 1}];
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 1};
      const store = setStore({beats, metronomeSetting});
      const domNode = getDomNode({store});

      embeddedAudioTest_playTicks.stopButtonDisabledAfterPlay = async() => {
        embeddedAudioTest_playTicks.stopButtonDisabledAfterPlay = null;
        await sleep(1000); // msec        const actual = getStopButton({domNode}).hasAttribute('disabled');

        const expected = true;
        const actual = getStopButton({domNode}).hasAttribute('disabled');

        assert.equal(actual, expected, msg);
        assert.end();
      };
      simulate.click(getPlayButton({domNode}));
      await sleep(20000); // msec
      audioTestEnd();
    });
  });
  nestOuter.test('...Stop button should actually stop audio', async(assert) => {
    const msg = 'currentTime when onended should be 1 second (approx) later than startTime';

    const store = setStore({beats: [{rh: 1, lh: 1}]}); // just 1 tick
    const domNode = getDomNode({store});

    embeddedAudioTest.stopButtonStopsAudio = async({audioContext, oscillator}) => {
      embeddedAudioTest.stopButtonStopsAudio = null;

      const analyser = audioContext.createAnalyser();
      oscillator.onended = () => {
        const endTime = audioContext.currentTime;
        const delta = endTime - startTime;
        const actual = (delta >= 1) && (delta < 2); // todo really only need < 1.2, but there is some subtle problem with test interactions and timing
        const expected = true;
        assert.equal(actual, expected, msg);
        assert.end();
      };
      oscillator.connect(analyser);

      const startTime = audioContext.currentTime;
      oscillator.start(startTime);
      oscillator.stop(startTime + 3); // sec

      const waitTime = 1; // sec
      waitInAudioTime({waitTime, audioContext, startTime});
      await sleep(1) /* msec */; // for some reason, must sleep something

      simulate.click(getStopButton({domNode}));
    };
    simulate.click(getPlayButton({domNode}));
    await sleep(20000); // msec
  });
  nestOuter.test('...Play button should re-enable if Stop button clicked mid-play', async(assert) => {
    audioTestStart();
    const msg = 'Should be enabled';

    // 1 tick, at 1 second duration per tick
    const beats = [{rh: 1, lh: 1}];
    const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1};
    const store = setStore({beats, metronomeSetting});
    const domNode = getDomNode({store});

    embeddedAudioTest_playTicks.playButtonReenableMidplay = async() => {
      embeddedAudioTest_playTicks.playButtonReenableMidplay = null;
      await sleep(500); // msec
      simulate.click(getStopButton({domNode}));

      const actual = getPlayButton({domNode}).hasAttribute('disabled');
      const expected = false;

      assert.equal(actual, expected, msg);
      assert.end();
    };
    simulate.click(getPlayButton({domNode}));
    await sleep(20000); // msec
    audioTestEnd();
  });
  nestOuter.test('...Play button should actually start audio', async(assert) => {
    const msg = 'Should show non-zero analyzer data during play, but not prior';

    const actual = {};

    const store = setStore({beats: [{rh: 1, lh: 1}]}); // just 1 tick
    const domNode = getDomNode({store});

    embeddedAudioTest.playButtonStartsAudio = async({audioContext, oscillator}) => {
      embeddedAudioTest.playButtonStartsAudio = null;

      const analyser = audioContext.createAnalyser();
      analyser.smoothingTimeConstant = 0;
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;

      const isAnySound = () => {
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        return sum(dataArray) > 0;
      };

      oscillator.connect(analyser);
      actual.prior = isAnySound();
      const startTime = audioContext.currentTime;
      oscillator.start(startTime);
      oscillator.stop(startTime + 2); // sec

      const waitTime = 0.5; // sec
      waitInAudioTime({waitTime, audioContext, startTime});
      await sleep(1) /* msec */; // for some reason, must sleep something
      actual.during = isAnySound();

      const expected = {
        prior: false,
        during: true
      };

      assert.deepEqual(actual, expected, msg);
      assert.end();
    };
    simulate.click(getPlayButton({domNode}));
    await sleep(20000); // msec
  });
  nestOuter.test('...Show loop count', async(assert) => {
    audioTestStart();
    const msg = 'Should show 1 for first iteration, 2 for second, 3 for third, 0 after stop';

    const audioContext = initializedAudioContext();

    // 1 tick, at 1 second duration per tick
    const beats = [{rh: 1, lh: 1}];
    const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1};
    const isLooping = true;
    const store = setStore({beats, metronomeSetting, isLooping});
    const domNode = getDomNode({store});
    const counts = [];

    embeddedAudioTest_playTicks.loopCountThenReset = async() => {
      await sleep(10); // need delay
      const count = Number(getLoopCount({domNode}).innerHTML);
      counts.push(count);

      if (audioContext.currentTime >= endTime) {
        embeddedAudioTest_playTicks.loopCountThenReset = null;
        simulate.click(getStopButton({domNode}));

        await sleep(10); // need delay
        const count = Number(getLoopCount({domNode}).innerHTML);
        counts.push(count);

        const expected = [1, 2, 3, 1];
        const actual = counts;

        assert.deepEqual(actual, expected, msg);
        assert.end();
      };
    };
    const waitTime = 2; // sec
    const startTime = audioContext.currentTime; // approx
    const endTime = startTime + waitTime; // approx
    simulate.click(getPlayButton({domNode}));
    await sleep(20000) /* msec */; // slows down audio clock by about 1/3

    audioTestEnd();
  });
  nestOuter.test('...Do not increment loop count if not looping', async(assert) => {
    audioTestStart();
    const msg = 'Should not change loop count';

    // 1 tick, at 1 second duration per tick
    const beats = [{rh: 1, lh: 1}];
    const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1};
    const store = setStore({beats, metronomeSetting});
    const domNode = getDomNode({store});

    embeddedAudioTest_playTicks.loopCountUnchanged = () => {
      embeddedAudioTest_playTicks.loopCountUnchanged = null;

      const actual = store.getState().player.loopCount;
      const expected = 1;

      assert.equal(actual, expected, msg);
      assert.end();
    };
    simulate.click(getPlayButton({domNode}));
    await sleep(20000) /* msec */; // slows down audio clock by about 1/3

    audioTestEnd();
  });
  nestOuter.test('...Only show loop count if looping and playing', nestInner => {
    nestInner.test('......Hide if not playing', async(assert) => {
      const msg = 'Hide loop count if not playing';

      const domNode = getDomNode();

      const actual = getLoopCountSpan({domNode}).hidden;
      const expected = true;

      assert.equal(actual, expected, msg);
      await sleep(20000); // msec
      assert.end();
    });
    nestInner.test('......Hide if not looping', async(assert) => {
      audioTestStart();
      const msg = 'Hide loop count if playing but not looping';

      // 1 tick, at 1 second duration per tick
      const beats = [{rh: 1, lh: 1}];
      const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1};
      const store = setStore({beats, metronomeSetting});
      const domNode = getDomNode({store});

      simulate.click(getPlayButton({domNode}));
      await sleep(500) /* msec */; // slows down audio clock by about 1/3

      const actual = getLoopCountSpan({domNode}).hidden;
      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
      await sleep(20000); // msec
      audioTestEnd();
    });
    nestInner.test('......Show if playing and looping', async(assert) => {
      audioTestStart();
      const msg = 'Show if playing and looping';

      // 1 tick, at 1 second duration per tick
      const beats = [{rh: 1, lh: 1}];
      const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1};
      const isLooping = true;
      const store = setStore({beats, metronomeSetting, isLooping});
      const domNode = getDomNode({store});

      simulate.click(getPlayButton({domNode}));
      await sleep(500) /* msec */; // slows down audio clock by about 1/3

      const actual = getLoopCountSpan({domNode}).hidden;
      const expected = false;

      simulate.click(getStopButton({domNode}));

      assert.equal(actual, expected, msg);
      assert.end();
      await sleep(20000); // msec
      audioTestEnd();
    });
  });
});

// isolate, otherwise doesn't work for some as yet undetermined reason
test('Player component', nestOuter => {
  nestOuter.test('...Only increment loop count after loop break has finished', async(assert) => {
    audioTestStart();
    const msg = 'Only increment loop count after loop break has finished';

    // 2 ticks, at 1/2 second duration per tick
    const beats = [{rh: 2, lh: 1}];
    const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 2};
    const isLooping = true;
    const isLoopBreak = true;
    const store = setStore({beats, metronomeSetting, isLooping, isLoopBreak});
    const domNode = getDomNode({store});
    let iterationCount = 0;
    const expected = [
      1, 1, // 1st iteration
      1, 1, // loop break
      2, 2  // 2nd iteration
    ];
    const iterationCountLimit = expected.length - 1;
    const actual = [];

    embeddedAudioTest_playTick.loopCountUpdateAfterBreak = () => {
      const loopCount = store.getState().player.loopCount;
      actual.push(loopCount);
      if (iterationCount == iterationCountLimit) embeddedAudioTest_playTick.loopCountUpdateAfterBreak = null;
      iterationCount++;
    };

    simulate.click(getPlayButton({domNode}));
    await sleep(10000) /* msec */; // slows down audio clock by about 1/3
    simulate.click(getStopButton({domNode}));

    assert.deepEqual(actual, expected, msg);
    assert.end();
    audioTestEnd();
  });
});

// isolate, otherwise doesn't work for some as yet undetermined reason
test('Player component', nestOuter => {
  nestOuter.test('...Display loop break in progress', async(assert) => {
    audioTestStart();
    const msg = 'During loop break, should display as such';

    // 3 ticks, at 1/2 second duration per tick
    const beats = [{rh: 3, lh: 1}];
    const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 3};
    const isLooping = true;
    const isLoopBreak = true;
    const store = setStore({beats, metronomeSetting, isLooping, isLoopBreak});
    const domNode = getDomNode({store});
    //////////////////////////////getLoopBreakStatusSpan
    let iterationCount = 0;
    const expected = [
      true, true, true,     // 1st iteration
      false, false, false,  // loop break
      true, true, true      // 2nd iteration
    ];
    const iterationCountLimit = expected.length - 1;
    const actual = [];

    embeddedAudioTest_playTick.loopBreakStatus = () => {
      const span = getLoopBreakStatusSpan({domNode});
      actual.push(span.hidden);
      if (iterationCount == iterationCountLimit) embeddedAudioTest_playTick.loopBreakStatus = null;
      iterationCount++;
    };

    simulate.click(getPlayButton({domNode}));
    await sleep(10000) /* msec */; // slows down audio clock by about 1/3
    simulate.click(getStopButton({domNode}));

    assert.deepEqual(actual, expected, msg);
    assert.end();
    audioTestEnd();
  });
});

test('Player component', nestOuter => {
  nestOuter.test('...No Alert for Validation of Tick-count with classic-ticks-per-beat', async(assert) => {
    audioTestStart();
    const msg = 'Do not show Alert';

    const beats = [{rh: 2, lh: 1}];
    const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 2};
    const store = setStore({beats, metronomeSetting});
    const domNode = getDomNode({store});

    simulate.click(getPlayButton({domNode}));
    await sleep(500) /* msec */;

    const actual = Boolean(getAlert({domNode: window.document}));
    const expected = false;

    assert.equal(actual, expected, msg);
    assert.end();
    audioTestEnd();
  });
  nestOuter.test('...Alert for Validation of Tick-count with classic-ticks-per-beat', async(assert) => {
    const msg = 'Show Alert';

    const beats = [{rh: 2, lh: 1}];
    const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 3};
    const store = setStore({beats, metronomeSetting});
    const domNode = getDomNode({store});

    simulate.click(getPlayButton({domNode}));
    await sleep(500) /* msec */;
    const actual = (getAlertMessage({domNode: window.document})).innerHTML;
    const expected = 'Beat #1: Tick count of 2 is not cleanly divisible by Classic Ticks Per Beat of 3';

    assert.equal(actual, expected, msg);
    assert.end();
  });
  // nestOuter.test('...Alert -- then dismiss -- for Validation of Tick-count with classic-ticks-per-beat', async(assert) => {
  // todo simulating click for dialog close (simulate.click(getAlertDismissButton...) doesn't work...
  //   audioTestStart();
  //   const msg = 'Dismiss Alert';
  //
  //   const beats = [{rh: 2, lh: 1}];
  //   const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 3};
  //   const store = setStore({beats, metronomeSetting});
  //   const domNode = getDomNode({store});
  //   const actual = {};
  //
  //   simulate.click(getPlayButton({domNode}));
  //   await sleep(500) /* msec */;
  //   actual.before = Boolean(getAlert({domNode: window.document}));
  //#######   simulate.click(getAlertDismissButton({domNode: window.document}));
  //   await sleep(500) /* msec */;
  //   actual.after = Boolean(getAlert({domNode: window.document}));
  //
  //   const expected = {
  //     before: true,
  //     after: false
  //   };
  //
  //   assert.equal(actual, expected, msg);
  //   assert.end();
  //   audioTestEnd();
  // });
});

