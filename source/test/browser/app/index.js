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
} from '../utils';
////////////////////////////////////

// Careful: React may replace the element it is modifying, instead of changing it in place.
// So always retreive the element, instead of keeping a pointer to it.
const getPlayButton = ({domNode}) => getElementBySelector({domNode, selector: '#playButton'});
const getBeatComponent = ({domNode}) => getElementBySelector({domNode, selector: '#beatFieldset'});
const getMetronomeSettingComponent = ({domNode}) => getElementBySelector({domNode, selector: '#metronomeSettingFieldset'});
const getPlayerSettingComponent = ({domNode}) => getElementBySelector({domNode, selector: '.playerSetting'});


test('App', nestOuter => {
  nestOuter.test('...Beat Component, MetronomeSetting, PlayerSetting Components should disable during play', nestInner => {
    nestInner.test('......Should render an enabled Beat Component, MetronomeSetting, PlayerSetting Component by default', assert => {
      const msg = 'Should be enabled';

      const domNode = getDomNode();

      const actual = {
        beat: getBeatComponent({domNode}).hasAttribute('disabled'),
        metronomeSetting: getMetronomeSettingComponent({domNode}).hasAttribute('disabled'),
        playerSetting: getPlayerSettingComponent({domNode}).hasAttribute('disabled')
      };

      const expected = {
        beat: false,
        metronomeSetting: false,
        playerSetting: false
      };

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Beat Component, MetronomeSetting, PlayerSetting Components should be disabled during play', (assert) => {
      const msg = 'Should be disabled';

      const store = setStore({beat: {rh: 1, lh: 1}});
      const domNode = getDomNode({store});

      embeddedAudioTest.componentsDisabledDuringPlay = async({audioContext, oscillator}) => {
        embeddedAudioTest.componentsDisabledDuringPlay = null;

        const startTime = audioContext.currentTime;
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.5); // sec

        const waitTime = 0.1; // sec
        waitInAudioTime({waitTime, audioContext, startTime});
        await sleep(1) /* msec */; // for some reason, must sleep something

        const actual = {
          beat: getBeatComponent({domNode}).hasAttribute('disabled'),
          metronomeSetting: getMetronomeSettingComponent({domNode}).hasAttribute('disabled'),
          playerSetting: getPlayerSettingComponent({domNode}).hasAttribute('disabled')
        };

        const expected = {
          beat: true,
          metronomeSetting: true,
          playerSetting: true
        };

        assert.deepEqual(actual, expected, msg);
        assert.end();
      };
      simulate.click(getPlayButton({domNode}));
    });
    nestInner.test('......Beat Component, MetronomeSetting, PlayerSetting Components should be enabled after play', (assert) => {
      const msg = 'Should be enabled';

      const store = setStore({beat: {rh: 1, lh: 1}});
      const domNode = getDomNode({store});

      embeddedAudioTest.componentsDisabledDuringPlay = async({audioContext, oscillator}) => {
        if (oscillator.onended == undefined) return; // want the spacer
        embeddedAudioTest.componentsDisabledDuringPlay = null;

        oscillator.connect(audioContext.createAnalyser());
        const startTime = audioContext.currentTime;
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.5); // sec

        const waitTime = 0.6; // sec
        waitInAudioTime({waitTime, audioContext, startTime});
        await sleep(1) /* msec */; // for some reason, must sleep something

        const actual = {
          beat: getBeatComponent({domNode}).hasAttribute('disabled'),
          metronomeSetting: getMetronomeSettingComponent({domNode}).hasAttribute('disabled'),
          playerSetting: getPlayerSettingComponent({domNode}).hasAttribute('disabled')
        };

        const expected = {
          beat: false,
          metronomeSetting: false,
          playerSetting: false
        };

        assert.deepEqual(actual, expected, msg);
        assert.end();
      };
      simulate.click(getPlayButton({domNode}));
    });
  });
});
