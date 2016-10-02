import test from 'tape-async';
import sleep from 'sleep-promise';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import {Simulate as simulate} from 'react-addons-test-utils';

import {
  getDomNode,
  getElementBySelector,
  setStore
} from '../../utils';
import {
  audioTestStart,
  audioTestEnd,
} from '../../../../models/audio/destination';
////////////////////////////////////

// Careful: React may replace the element it is modifying, instead of changing it in place.
// So always retreive the element, instead of keeping a pointer to it.
const getPlayButton = ({domNode}) => getElementBySelector({domNode, selector: '#playButton'});
const getStopButton = ({domNode}) => getElementBySelector({domNode, selector: '#stopButton'});


test('BeatPlayer component', nestOuter => {
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

      const actual = await Promise.resolve({
        then: function(onFulfill, onReject) {
          onFulfill(getPlayButton({domNode}).hasAttribute('disabled'));
        }
      });
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

      const actual = await Promise.resolve({
        then: function(onFulfill, onReject) {
          onFulfill(getPlayButton({domNode}).hasAttribute('disabled'));
        }
      });
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

      const actual = await Promise.resolve({
        then: function(onFulfill, onReject) {
          onFulfill(getStopButton({domNode}).hasAttribute('disabled'));
        }
      });
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

      const actual = await Promise.resolve({
        then: function(onFulfill, onReject) {
          onFulfill(getStopButton({domNode}).hasAttribute('disabled'));
        }
      });
      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
  });
  nestOuter.test('...Play button should re-enable if Stop button clicked mid-play', async(assert) => {
    audioTestStart();
    const msg = 'Should be enabled';

    const store = setStore({
      // 4 ticks spaced half-second apart, for a total of 3 seconds of play
      beat: {rh: 4, lh: 1},
      metronomeSetting: {classicTicksPerMinute: 120, classicTicksPerBeat: 4}
    });
    const domNode = getDomNode({store});

    simulate.click(getPlayButton({domNode}));
    await sleep(500);

    await Promise.resolve({
      then: function(onFulfill, onReject) {
        onFulfill(simulate.click(getStopButton({domNode})));
      }
    });

    const actual = getPlayButton({domNode}).hasAttribute('disabled');
    const expected = false;

    assert.equal(actual, expected, msg);
    assert.end();
    audioTestEnd();
  });
  nestOuter.test('...Play button should actually start audio', async(assert) => {
// todo
  });
  nestOuter.test('...Stop button should actually stop audio', async(assert) => {
// todo
  });
});
