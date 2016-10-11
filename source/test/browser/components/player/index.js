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
  embeddedAudioTest
} from '../../utils';
////////////////////////////////////

// Careful: React may replace the element it is modifying, instead of changing it in place.
// So always retreive the element, instead of keeping a pointer to it.
const getPlayButton = ({domNode}) => getElementBySelector({domNode, selector: '#playButton'});
const getStopButton = ({domNode}) => getElementBySelector({domNode, selector: '#stopButton'});

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
      const msg = 'Should be disabled';

      const store = setStore({beat: {rh: 1, lh: 1}});
      const domNode = getDomNode({store});

      embeddedAudioTest.playButtonDisabledDuringPlay = async({audioContext, oscillator}) => {
        embeddedAudioTest.playButtonDisabledDuringPlay = null;

        const startTime = audioContext.currentTime;
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.5); // sec

        const waitTime = 0.1; // sec
        waitInAudioTime({waitTime, audioContext, startTime});
        await sleep(1) /* msec */; // for some reason, must sleep something

        const actual = getPlayButton({domNode}).hasAttribute('disabled');
        const expected = true;

        assert.equal(actual, expected, msg);
        assert.end();
      };
      simulate.click(getPlayButton({domNode}));
    });
    nestInner.test('......Play button should be enabled after play', (assert) => {
      const msg = 'Should be enabled';

      const store = setStore({beat: {rh: 1, lh: 1}});
      const domNode = getDomNode({store});

      embeddedAudioTest.playButtonEnabledAfterPlay = async({audioContext, oscillator}) => {
        if (oscillator.onended == undefined) return; // want the spacer
        embeddedAudioTest.playButtonEnabledAfterPlay = null;

        oscillator.connect(audioContext.createAnalyser());
        const startTime = audioContext.currentTime;
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.5); // sec

        const waitTime = 0.6; // sec
        waitInAudioTime({waitTime, audioContext, startTime});
        await sleep(1) /* msec */; // for some reason, must sleep something

        const actual = getPlayButton({domNode}).hasAttribute('disabled');
        const expected = false;

        assert.equal(actual, expected, msg);
        assert.end();
      };
      simulate.click(getPlayButton({domNode}));
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
      const msg = 'Should be enabled';

      const store = setStore({beat: {rh: 1, lh: 1}});
      const domNode = getDomNode({store});

      embeddedAudioTest.stopButtonEnabledDuringPlay = async({audioContext, oscillator}) => {
        embeddedAudioTest.stopButtonEnabledDuringPlay = null;

        const startTime = audioContext.currentTime;
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.5); // sec

        const waitTime = 0.1; // sec
        waitInAudioTime({waitTime, audioContext, startTime});
        await sleep(1) /* msec */; // for some reason, must sleep something

        const actual = getStopButton({domNode}).hasAttribute('disabled');
        const expected = false;

        assert.equal(actual, expected, msg);
        assert.end();
      };
      simulate.click(getPlayButton({domNode}));
    });
    nestInner.test('......Stop button should be disabled after play', (assert) => {
      const msg = 'Should be disabled';

      const store = setStore({beat: {rh: 1, lh: 1}});
      const domNode = getDomNode({store});

      embeddedAudioTest.stopButtonDisabledAfterPlay = async({audioContext, oscillator}) => {
        if (oscillator.onended == undefined) return; // want the spacer
        embeddedAudioTest.stopButtonDisabledAfterPlay = null;

        oscillator.connect(audioContext.createAnalyser());
        const startTime = audioContext.currentTime;
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.5); // sec

        const waitTime = 0.6; // sec
        waitInAudioTime({waitTime, audioContext, startTime});
        await sleep(1) /* msec */; // for some reason, must sleep something

        const actual = getStopButton({domNode}).hasAttribute('disabled');
        const expected = true;

        assert.equal(actual, expected, msg);
        assert.end();
      };
      simulate.click(getPlayButton({domNode}));
    });
  });
  nestOuter.test('...Play button should re-enable if Stop button clicked mid-play', async(assert) => {
    const msg = 'Should be enabled';

    const store = setStore({beat: {rh: 1, lh: 1}}); // just 1 tick
    const domNode = getDomNode({store});

    embeddedAudioTest.playButtonReenableMidplay = async({audioContext, oscillator}) => {
      embeddedAudioTest.playButtonReenableMidplay = null;

      const startTime = audioContext.currentTime;
      oscillator.start(startTime);
      oscillator.stop(startTime + 2); // sec

      const waitTime = 0.5; // sec
      waitInAudioTime({waitTime, audioContext, startTime});
      await sleep(1) /* msec */; // for some reason, must sleep something

      simulate.click(getStopButton({domNode}));

      const actual = getPlayButton({domNode}).hasAttribute('disabled');
      const expected = false;

      assert.equal(actual, expected, msg);
      assert.end();
    };
    simulate.click(getPlayButton({domNode}));
  });
  nestOuter.test('...Play button should actually start audio', async(assert) => {
    const msg = 'Should show non-zero analyzer data during play, but not prior';

    const actual = {};

    const store = setStore({beat: {rh: 1, lh: 1}}); // just 1 tick
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
  });
  nestOuter.test('...Stop button should actually stop audio', (assert) => {
    const msg = 'currentTime when onended should be 1 second (approx) later than startTime';

    const store = setStore({beat: {rh: 1, lh: 1}}); // just 1 tick
    const domNode = getDomNode({store});

    embeddedAudioTest.stopButtonStopsAudio = async({audioContext, oscillator}) => {
      embeddedAudioTest.stopButtonStopsAudio = null;

      const analyser = audioContext.createAnalyser();
      oscillator.onended = () => {
        const endTime = audioContext.currentTime;
        const delta = endTime - startTime;
        const actual = (delta >= 1) && (delta <= 1.5);
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
  });
  // todo delete
  // nestOuter.test('...Stop button should actually stop audio', (assert) => {
  //   const msg = 'Should show non-zero analyzer data during play, but not after stopped';
  //
  //   const actual = {};
  //
  //   const store = setStore({beat: {rh: 1, lh: 1}}); // just 1 tick
  //   const domNode = getDomNode({store});
  //
  //   embeddedAudioTest.stopButtonStopsAudio = async({audioContext, oscillator}) => {
  //     embeddedAudioTest.stopButtonStopsAudio = null;
  //
  //     const analyser = audioContext.createAnalyser();
  //     analyser.smoothingTimeConstant = 0;
  //     analyser.fftSize = 2048;
  //     const bufferLength = analyser.frequencyBinCount;
  //
  //     const isAnySound = () => {
  //       const dataArray = new Uint8Array(bufferLength);
  //       analyser.getByteFrequencyData(dataArray);
  //       return sum(dataArray) > 0;
  //     };
  //
  //     oscillator.connect(analyser);
  //     const startTime = audioContext.currentTime;
  //     oscillator.start(startTime);
  //     oscillator.stop(startTime + 2); // sec
  //
  //     const waitTime_during = 0.5; // sec
  //     waitInAudioTime({waitTime_during, audioContext, startTime});
  //     await sleep(1) /* msec */; // for some reason, must sleep something
  //     actual.during = isAnySound();
  //
  //     simulate.click(getStopButton({domNode}));
  //
  //     const waitTime_after = 0.5; // sec
  //     waitInAudioTime({waitTime_after, audioContext, startTime});
  //     await sleep(1) /* msec */; // for some reason, must sleep something
  //     actual.after = isAnySound();
  //
  //     const expected = {
  //       during: true,
  //       after: false
  //     };
  //
  //     assert.deepEqual(actual, expected, msg);
  //     assert.end();
  //   };
  //   simulate.click(getPlayButton({domNode}));
  // });
});


