import {sum} from 'lodash';
import test from 'tape-async';
import sleep from 'sleep-promise';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import {Simulate as simulate} from 'react-addons-test-utils';

import {
  getDomNode,
  getElementBySelector,
  setStore
} from '../utils';
import {
  audioTestStart,
  audioTestEnd,
} from '../../../models/audio/destination';
////////////////////////////////////

const getPlayButton = ({domNode}) => getElementBySelector({domNode, selector: '#playButton'});
const getBeatsComponent = ({domNode}) => getElementBySelector({domNode, selector: '#beatsFieldset'});
const getMetronomeSettingComponent = ({domNode}) => getElementBySelector({domNode, selector: '#metronomeSettingFieldset'});
const getPlayerSettingComponent = ({domNode}) => getElementBySelector({domNode, selector: '.playerSetting'});

test('App', nestOuter => {
  nestOuter.test('...Beats Component, MetronomeSetting, PlayerSetting Components should disable during play', nestInner => {
    nestInner.test('......Should render an enabled Beats Component, MetronomeSetting, PlayerSetting Component by default', assert => {
      const msg = 'Should be enabled';

      const domNode = getDomNode();

      const actual = {
        beats: getBeatsComponent({domNode}).hasAttribute('disabled'),
        metronomeSetting: getMetronomeSettingComponent({domNode}).hasAttribute('disabled'),
        playerSetting: getPlayerSettingComponent({domNode}).hasAttribute('disabled')
      };

      const expected = {
        beats: false,
        metronomeSetting: false,
        playerSetting: false
      };

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Beats Component, MetronomeSetting, PlayerSetting Components should be disabled during play', async(assert) => {
      audioTestStart();
      const msg = 'Should be disabled';

      const beats = [{rh: 1, lh: 1}];
      const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1};
      const isLooping = false;
      const store = setStore({beats, metronomeSetting, isLooping});
      const domNode = getDomNode({store});

      simulate.click(getPlayButton({domNode}));
      await sleep(250) /* msec */;

      const actual = {
        beats: getBeatsComponent({domNode}).hasAttribute('disabled'),
        metronomeSetting: getMetronomeSettingComponent({domNode}).hasAttribute('disabled'),
        playerSetting: getPlayerSettingComponent({domNode}).hasAttribute('disabled')
      };

      const expected = {
        beats: true,
        metronomeSetting: true,
        playerSetting: true
      };

      assert.deepEqual(actual, expected, msg);
      assert.end();

      await sleep(3000) /* msec */;
      audioTestEnd();
    });
    nestInner.test('......Beats Component, MetronomeSetting, PlayerSetting Components should be enabled after play', async(assert) => {
      audioTestStart();
      const msg = 'Should be enabled';

      const beats = [{rh: 1, lh: 1}];
      const metronomeSetting = {classicTicksPerMinute: 240, classicTicksPerBeat: 1};
      const isLooping = false;
      const store = setStore({beats, metronomeSetting, isLooping});
      const domNode = getDomNode({store});

      simulate.click(getPlayButton({domNode}));
      await sleep(3000) /* msec */;

      const actual = {
        beats: getBeatsComponent({domNode}).hasAttribute('disabled'),
        metronomeSetting: getMetronomeSettingComponent({domNode}).hasAttribute('disabled'),
        playerSetting: getPlayerSettingComponent({domNode}).hasAttribute('disabled')
      };

      const expected = {
        beats: false,
        metronomeSetting: false,
        playerSetting: false
      };

      assert.deepEqual(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
  });
});
