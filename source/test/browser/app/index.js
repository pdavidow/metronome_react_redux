import {omit, sum} from 'lodash';
import test from 'tape-async';
import sleep from 'sleep-promise';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import {Simulate as simulate} from 'react-addons-test-utils';

import {
  getDomNode,
  getElementBySelector,
  setStore,
  defaultStore,
  embeddedAudioTest_playTicks
} from '../utils';
import {
  audioTestStart,
  audioTestEnd,
} from '../../../models/audio/destination';
////////////////////////////////////

const getBeatsComponent = ({domNode}) => getElementBySelector({domNode, selector: '#beatsFieldset'});
const getMetronomeSettingComponent = ({domNode}) => getElementBySelector({domNode, selector: '#metronomeSettingFieldset'});
const getPlayerSettingComponent = ({domNode}) => getElementBySelector({domNode, selector: '.playerSetting'});

const getBeat_AddButton = ({domNode}) => getElementBySelector({domNode, selector: '#addBeatButton'});
const getBeat_RhInputField0 = ({domNode}) => getElementBySelector({domNode, selector: '[name="beats[0].rh"]'});
const getBeat_LhInputField0 = ({domNode}) => getElementBySelector({domNode, selector: '[name="beats[0].lh"]'});
const getBeat_RhInputField1 = ({domNode}) => getElementBySelector({domNode, selector: '[name="beats[1].rh"]'});
const getBeat_LhInputField1 = ({domNode}) => getElementBySelector({domNode, selector: '[name="beats[1].lh"]'});
const getBeat_Form = ({domNode}) => getElementBySelector({domNode, selector: '.beats'});

const getMetronomeSetting_ClassicTicksPerMinuteInputField = ({domNode}) => getElementBySelector({domNode, selector: '#classicTicksPerMinuteInputField'});
const getMetronomeSetting_ClassicTicksPerBeatInputField = ({domNode}) => getElementBySelector({domNode, selector: '#classicTicksPerBeatInputField'});
const getMetronomeSetting_Form = ({domNode}) => getElementBySelector({domNode, selector: '.metronomeSetting'});

const getPlayerSetting_LoopCheckbox = ({domNode}) => getElementBySelector({domNode, selector: '#loopCheckbox'});
const getPlayerSetting_LoopBreakCheckbox = ({domNode}) => getElementBySelector({domNode, selector: '#loopBreakCheckbox'});
const getPlayerSetting_Form = ({domNode}) => getElementBySelector({domNode, selector: '.playerSetting'});

const getPlayButton = ({domNode}) => getElementBySelector({domNode, selector: '#playButton'});
const getStopButton = ({domNode}) => getElementBySelector({domNode, selector: '#stopButton'});

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
  nestOuter.test('...End-to-end', nestInner => {
    nestInner.test('......should loop thrice: 5 iterations with 2 breaks of 6 rhLh ticks', async(assert) => {
      audioTestStart();
      const msg = 'Should loop thrice: 5 iterations with 2 breaks of 6 rhLh ticks';

      const store = defaultStore();
      const domNode = getDomNode({store});

      const beat0 = {rh: 2, lh: 3};
      const beat1 = {rh: 3, lh: 4};
      simulate.click(getBeat_AddButton({domNode}));
      simulate.change(getBeat_RhInputField0({domNode}), {target: {value: beat0.rh}});
      simulate.change(getBeat_LhInputField0({domNode}), {target: {value: beat0.lh}});
      simulate.change(getBeat_RhInputField1({domNode}), {target: {value: beat1.rh}});
      simulate.change(getBeat_LhInputField1({domNode}), {target: {value: beat1.lh}});
      simulate.submit(getBeat_Form({domNode}));
      await sleep(250);

      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 6};
      simulate.change(getMetronomeSetting_ClassicTicksPerMinuteInputField({domNode}), {target: {value: metronomeSetting.classicTicksPerMinute}});
      simulate.change(getMetronomeSetting_ClassicTicksPerBeatInputField({domNode}), {target: {value: metronomeSetting.classicTicksPerBeat}});
      simulate.submit(getMetronomeSetting_Form({domNode}));
      await sleep(250);

      const isLooping = true;
      const isLoopBreak = true;
      simulate.change(getPlayerSetting_LoopCheckbox({domNode}), {target: {value: isLooping}});
      simulate.change(getPlayerSetting_LoopBreakCheckbox({domNode}), {target: {value: isLoopBreak}});
      simulate.submit(getPlayerSetting_Form({domNode}));
      await sleep(250);

      let iterationCount = 0;

      const tickDuration_beat0 = 0.5;
      const tickDuration_beat1 = 0.25;
      const tickDuration_beatBreak = 0.5;
      const beatDuration = 3;

      const actual = [];

      const expected = [
        [
          {
            isRh: true,
            isLh: true,
            startOffset: (0 * beatDuration) + (0 * tickDuration_beat0),
            duration: tickDuration_beat0
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (0 * beatDuration) + (1 * tickDuration_beat0),
            duration: tickDuration_beat0,
          },
          {
            isRh: false,
            isLh: true,
            startOffset: (0 * beatDuration) + (2 * tickDuration_beat0),
            duration: tickDuration_beat0
          },
          {
            isRh: true,
            isLh: false,
            startOffset: (0 * beatDuration) + (3 * tickDuration_beat0),
            duration: tickDuration_beat0,
          },
          {
            isRh: false,
            isLh: true,
            startOffset: (0 * beatDuration) + (4 * tickDuration_beat0),
            duration: tickDuration_beat0
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (0 * beatDuration) + (5 * tickDuration_beat0),
            duration: tickDuration_beat0,
          },
          {
            isRh: true,
            isLh: true,
            startOffset: (1 * beatDuration) + (0 * tickDuration_beat1),
            duration: tickDuration_beat1
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (1 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (2 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: true,
            startOffset: (1 * beatDuration) + (3 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: true,
            isLh: false,
            startOffset: (1 * beatDuration) + (4 * tickDuration_beat1),
            duration: tickDuration_beat1
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (5 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: true,
            startOffset: (1 * beatDuration) + (6 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (7 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: true,
            isLh: false,
            startOffset: (1 * beatDuration) + (8 * tickDuration_beat1),
            duration: tickDuration_beat1
          },
          {
            isRh: false,
            isLh: true,
            startOffset: (1 * beatDuration) + (9 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (10 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (11 * tickDuration_beat1),
            duration: tickDuration_beat1,
            isSpacer: true
          }
        ],
        [ // break
          {
            isRh: true,
            isLh: true,
            startOffset: 0 * tickDuration_beatBreak,
            duration: tickDuration_beatBreak
          },
          {
            isRh: true,
            isLh: true,
            startOffset: 1 * tickDuration_beatBreak,
            duration: tickDuration_beatBreak
          },
          {
            isRh: true,
            isLh: true,
            startOffset: 2 * tickDuration_beatBreak,
            duration: tickDuration_beatBreak
          },
          {
            isRh: true,
            isLh: true,
            startOffset: 3 * tickDuration_beatBreak,
            duration: tickDuration_beatBreak
          },
          {
            isRh: true,
            isLh: true,
            startOffset: 4 * tickDuration_beatBreak,
            duration: tickDuration_beatBreak,
          },
          {
            isRh: true,
            isLh: true,
            startOffset: 5 * tickDuration_beatBreak,
            duration: tickDuration_beatBreak,
            isSpacer: true
          },
        ],
        [
          {
            isRh: true,
            isLh: true,
            startOffset: (0 * beatDuration) + (0 * tickDuration_beat0),
            duration: tickDuration_beat0
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (0 * beatDuration) + (1 * tickDuration_beat0),
            duration: tickDuration_beat0,
          },
          {
            isRh: false,
            isLh: true,
            startOffset: (0 * beatDuration) + (2 * tickDuration_beat0),
            duration: tickDuration_beat0
          },
          {
            isRh: true,
            isLh: false,
            startOffset: (0 * beatDuration) + (3 * tickDuration_beat0),
            duration: tickDuration_beat0,
          },
          {
            isRh: false,
            isLh: true,
            startOffset: (0 * beatDuration) + (4 * tickDuration_beat0),
            duration: tickDuration_beat0
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (0 * beatDuration) + (5 * tickDuration_beat0),
            duration: tickDuration_beat0,
          },
          {
            isRh: true,
            isLh: true,
            startOffset: (1 * beatDuration) + (0 * tickDuration_beat1),
            duration: tickDuration_beat1
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (1 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (2 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: true,
            startOffset: (1 * beatDuration) + (3 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: true,
            isLh: false,
            startOffset: (1 * beatDuration) + (4 * tickDuration_beat1),
            duration: tickDuration_beat1
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (5 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: true,
            startOffset: (1 * beatDuration) + (6 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (7 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: true,
            isLh: false,
            startOffset: (1 * beatDuration) + (8 * tickDuration_beat1),
            duration: tickDuration_beat1
          },
          {
            isRh: false,
            isLh: true,
            startOffset: (1 * beatDuration) + (9 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (10 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (11 * tickDuration_beat1),
            duration: tickDuration_beat1,
            isSpacer: true
          }
        ],
        [ // break
          {
            isRh: true,
            isLh: true,
            startOffset: 0 * tickDuration_beatBreak,
            duration: tickDuration_beatBreak
          },
          {
            isRh: true,
            isLh: true,
            startOffset: 1 * tickDuration_beatBreak,
            duration: tickDuration_beatBreak
          },
          {
            isRh: true,
            isLh: true,
            startOffset: 2 * tickDuration_beatBreak,
            duration: tickDuration_beatBreak
          },
          {
            isRh: true,
            isLh: true,
            startOffset: 3 * tickDuration_beatBreak,
            duration: tickDuration_beatBreak
          },
          {
            isRh: true,
            isLh: true,
            startOffset: 4 * tickDuration_beatBreak,
            duration: tickDuration_beatBreak,
          },
          {
            isRh: true,
            isLh: true,
            startOffset: 5 * tickDuration_beatBreak,
            duration: tickDuration_beatBreak,
            isSpacer: true
          },
        ],
        [
          {
            isRh: true,
            isLh: true,
            startOffset: (0 * beatDuration) + (0 * tickDuration_beat0),
            duration: tickDuration_beat0
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (0 * beatDuration) + (1 * tickDuration_beat0),
            duration: tickDuration_beat0,
          },
          {
            isRh: false,
            isLh: true,
            startOffset: (0 * beatDuration) + (2 * tickDuration_beat0),
            duration: tickDuration_beat0
          },
          {
            isRh: true,
            isLh: false,
            startOffset: (0 * beatDuration) + (3 * tickDuration_beat0),
            duration: tickDuration_beat0,
          },
          {
            isRh: false,
            isLh: true,
            startOffset: (0 * beatDuration) + (4 * tickDuration_beat0),
            duration: tickDuration_beat0
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (0 * beatDuration) + (5 * tickDuration_beat0),
            duration: tickDuration_beat0,
          },
          {
            isRh: true,
            isLh: true,
            startOffset: (1 * beatDuration) + (0 * tickDuration_beat1),
            duration: tickDuration_beat1
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (1 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (2 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: true,
            startOffset: (1 * beatDuration) + (3 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: true,
            isLh: false,
            startOffset: (1 * beatDuration) + (4 * tickDuration_beat1),
            duration: tickDuration_beat1
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (5 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: true,
            startOffset: (1 * beatDuration) + (6 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (7 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: true,
            isLh: false,
            startOffset: (1 * beatDuration) + (8 * tickDuration_beat1),
            duration: tickDuration_beat1
          },
          {
            isRh: false,
            isLh: true,
            startOffset: (1 * beatDuration) + (9 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (10 * tickDuration_beat1),
            duration: tickDuration_beat1,
          },
          {
            isRh: false,
            isLh: false,
            startOffset: (1 * beatDuration) + (11 * tickDuration_beat1),
            duration: tickDuration_beat1,
            isSpacer: true
          }
        ]
      ];

      embeddedAudioTest_playTicks.endToEndTest1 = ({ticks}) => {
        const filteredTicks = ticks.map((tick) => omit(tick, 'onSpaceEnded'));
        actual.push(filteredTicks);
        iterationCount++;
        if (iterationCount == 5) {
          embeddedAudioTest_playTicks.endToEndTest1 = null;
          simulate.click(getStopButton({domNode}));

          assert.deepEqual(actual, expected, msg);
          assert.end();
        }
        ;
      };
      simulate.click(getPlayButton({domNode}));
      await sleep(80000) /* msec */; // slows down audio clock by about 1/3
      audioTestEnd();
    });
  });
});
