import {sum} from 'lodash';
import test from 'tape-async';
import sleep from 'sleep-promise';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import {Simulate as simulate} from 'react-addons-test-utils';

import {
  getDomNode,
  getElementBySelector,
  setStore,
  defaultStore
} from '../../utils';
import {
  audioTestStart,
  audioTestEnd,
  embeddedAudioTest
} from '../../../../models/audio/destination';
import {setIsLooping} from '../../../../actions'; // todo
////////////////////////////////////

// Careful: React may replace the element it is modifying, instead of changing it in place.
// So always retreive the element, instead of keeping a pointer to it.
const getPlayButton = ({domNode}) => getElementBySelector({domNode, selector: '#playButton'});
const getStopButton = ({domNode}) => getElementBySelector({domNode, selector: '#stopButton'});
const getLoopCheckbox = ({domNode}) => getElementBySelector({domNode, selector: '#loopCheckbox'}); // todo

test('Player component', nestOuter => {
  nestOuter.test('...Play button should disable during play', nestInner => {
    nestInner.test('......Should render an enabled Play button by default', assert => {
      audioTestStart();
      const msg = 'Should be enabled';

      const store = setStore({
        // 4 ticks spaced half-second apart, for a total of 2 seconds of play
        beat: {rh: 4, lh: 1},
        metronomeSetting: {classicTicksPerMinute: 120, classicTicksPerBeat: 4}
      });
      const domNode = getDomNode({store});

      const actual = getPlayButton({domNode}).hasAttribute('disabled');
      const expected = false;

      assert.equal(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
    nestInner.test('......Play button should be disabled during play', async(assert) => {
      audioTestStart();
      const msg = 'Should be disabled';

      const store = setStore({
        // 4 ticks spaced half-second apart, for a total of 2 seconds of play
        beat: {rh: 4, lh: 1},
        metronomeSetting: {classicTicksPerMinute: 120, classicTicksPerBeat: 4}
      });
      const domNode = getDomNode({store});

      simulate.click(getPlayButton({domNode}));

      await sleep(500);
      const actual = await Promise.resolve({then: (onFulfill) => onFulfill(getPlayButton({domNode}).hasAttribute('disabled'))});
      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
    nestInner.test('......Play button should be enabled after play', async(assert) => {
      audioTestStart();
      const msg = 'Should be enabled';

      const store = setStore({
        // 4 ticks spaced half-second apart, for a total of 2 seconds of play
        beat: {rh: 4, lh: 1},
        metronomeSetting: {classicTicksPerMinute: 120, classicTicksPerBeat: 4}
      });
      const domNode = getDomNode({store});

      simulate.click(getPlayButton({domNode}));

      await sleep(2500);
      const actual = await Promise.resolve({then: (onFulfill) => onFulfill(getPlayButton({domNode}).hasAttribute('disabled'))});
      const expected = false;

      assert.equal(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
  });
  nestOuter.test('...Stop button should enable during play', nestInner => {
    nestInner.test('......Should render a disabled Stop button by default', assert => {
      audioTestStart();
      const msg = 'Should be disabled';

      const store = setStore({
        // 4 ticks spaced half-second apart, for a total of 2 seconds of play
        beat: {rh: 4, lh: 1},
        metronomeSetting: {classicTicksPerMinute: 120, classicTicksPerBeat: 4}
      });
      const domNode = getDomNode({store});

      const actual = getStopButton({domNode}).hasAttribute('disabled');
      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
    nestInner.test('......Stop button should be enabled during play', async(assert) => {
      audioTestStart();
      const msg = 'Should be enabled';

      const store = setStore({
        // 4 ticks spaced half-second apart, for a total of 2 seconds of play
        beat: {rh: 4, lh: 1},
        metronomeSetting: {classicTicksPerMinute: 120, classicTicksPerBeat: 4}
      });
      const domNode = getDomNode({store});

      simulate.click(getPlayButton({domNode}));

      await sleep(500);
      const actual = await Promise.resolve({then: (onFulfill) => onFulfill(getStopButton({domNode}).hasAttribute('disabled'))});
      const expected = false;

      assert.equal(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
    nestInner.test('......Stop button should be disabled after play', async(assert) => {
      audioTestStart();
      const msg = 'Should be disabled';

      const store = setStore({
        // 4 ticks spaced half-second apart, for a total of 2 seconds of play
        beat: {rh: 4, lh: 1},
        metronomeSetting: {classicTicksPerMinute: 120, classicTicksPerBeat: 4}
      });
      const domNode = getDomNode({store});

      simulate.click(getPlayButton({domNode}));

      await sleep(2500);
      const actual = await Promise.resolve({then: (onFulfill) => onFulfill(getStopButton({domNode}).hasAttribute('disabled'))});
      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
  });
  /* // todo
  nestOuter.test('......Should set isLooping true upon checking loop', nestInner => {
    nestInner.test('......Should be unchecked by default', assert => {
      audioTestStart();
      const msg = 'Should be unchecked';

      const domNode = getDomNode();

      const actual = getLoopCheckbox({domNode}).hasAttribute('checked');
      const expected = false;

      assert.equal(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
    nestInner.test('......Should be checked because state so dictates', assert => {
      audioTestStart();
      const msg = 'Should be checked';

      const store = defaultStore();
      store.dispatch(setIsLooping({isLooping: true}));
      const domNode = getDomNode({store});

      const actual = getLoopCheckbox({domNode}).hasAttribute('checked');
      console.log("getLoopCheckbox({domNode})",getLoopCheckbox({domNode}));
      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
  });
  */
});

const isolate = async() => {
  const test0 = test('...Play button should re-enable if Stop button clicked mid-play', async(assert) => {
    audioTestStart();
    const msg = 'Should be enabled';

    const store = setStore({
      // 4 ticks spaced half-second apart, for a total of 2 seconds of play
      beat: {rh: 4, lh: 1},
      metronomeSetting: {classicTicksPerMinute: 120, classicTicksPerBeat: 4}
    });
    const domNode = getDomNode({store});

    simulate.click(getPlayButton({domNode}));

    await sleep(500);
    await Promise.resolve({then: (onFulfill) => onFulfill(simulate.click(getStopButton({domNode})))});
    const actual = getPlayButton({domNode}).hasAttribute('disabled');
    const expected = false;

    assert.equal(actual, expected, msg);
    assert.end();
    audioTestEnd();
  });
  const test1 = test('...Play button should actually start audio', async(assert) => {
    const msg = 'Should show non-zero analyzer data after start play, but not prior';

    const actual = {};
    const domNode = getDomNode();

    embeddedAudioTest.audioTestPlay = async({audioContext, oscillator}) => {
      embeddedAudioTest.audioTestPlay = null; // do this here (ASAP) to avoid confusing non-asynch code

      const startTime = audioContext.currentTime;

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
      actual.before = isAnySound();
      oscillator.start(startTime);
      oscillator.stop(startTime + 1);

      await sleep(500);
      actual.after = await Promise.resolve({then: (onFulfill) => onFulfill(isAnySound())});
    };

    simulate.click(getPlayButton({domNode}));

    const expected = {
      before: false,
      after: true
    };

    await sleep(1000);
    await Promise.resolve({then: (onFulfill) => onFulfill(assert.deepEqual(actual, expected, msg))});

    assert.end();
  });
  const test2 = test('...Stop button should actually stop audio', async(assert) => {
    const msg = 'currentTime when onended should be 1 second later than startTime';

    // Testing for absence of sound after playing is very unreliable, so take different approach

    const domNode = getDomNode();
    let startTime, endTime;

    embeddedAudioTest.audioTestStop = async({audioContext, oscillator}) => {
      embeddedAudioTest.audioTestStop = null; // do this here (ASAP) to avoid confusing non-asynch code

      const analyser = audioContext.createAnalyser();
      oscillator.onended = () => endTime = audioContext.currentTime;
      oscillator.connect(analyser);

      startTime = audioContext.currentTime;
      oscillator.start(startTime);
      oscillator.stop(startTime + 2);

      await sleep(1000);
      await Promise.resolve({then: (onFulfill) => onFulfill(simulate.click(getStopButton({domNode})))});

    };

    simulate.click(getPlayButton({domNode}));

    const handleFulfill = () => {
      const expected = true;
      const actual = endTime ? ((endTime - startTime) < 1.5) : false;
      assert.equal(actual, expected, msg);
    };

    await sleep(1500);
    await Promise.resolve({then: (onFulfill) => onFulfill(handleFulfill())});

    assert.end();
  });

  test0();

  await sleep(1000);
  await Promise.resolve({then: (onFulfill) => onFulfill(test1())});

  await sleep(3500);
  await Promise.resolve({then: (onFulfill) => onFulfill(test2())});
};
isolate();
