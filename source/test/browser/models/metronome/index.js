import test from 'tape-async';
import sleep from 'sleep-promise';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import {
  last,
  omit
} from 'lodash';
import {Simulate as simulate} from 'react-addons-test-utils';

import {
  calc_ticks,
  play
} from '../../../../models/metronome';
import {
  isTick_Rh,
  isTick_Lh,
  isTick_RhLh,
  isTick_Background
} from '../../../../models/tick';
import {
  initializedAudioContext,
  playTicks
} from '../../../../models/audio';
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
import {TickCountVsClassicTicksPerBeatError} from '../../../../exceptions';
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
      const beats = [{rh: 2, lh: 1}];
      const metronomeSetting = {classicTicksPerMinute: 240, classicTicksPerBeat: 2};
      let value = 0;
      const onEnded = () => value++;

      const ticks = calc_ticks({beats, metronomeSetting, onTicksEnded: onEnded});
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
      const beats = [{rh: 1, lh: 2}];
      const metronomeSetting = {classicTicksPerMinute: 240, classicTicksPerBeat: 2};
      let value = 0;
      const onEnded = () => value++;

      const ticks = calc_ticks({beats, metronomeSetting, onTicksEnded: onEnded});
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
      const beats = [{rh: 2, lh: 2}];
      const metronomeSetting = {classicTicksPerMinute: 240, classicTicksPerBeat: 2};
      let value = 0;
      const onEnded = () => value++;

      const ticks = calc_ticks({beats, metronomeSetting, onTicksEnded: onEnded});
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
      const beats = [{rh: 2, lh: 3}];
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 6};
      let value = 0;
      const onEnded = () => value++;

      const ticks = calc_ticks({beats, metronomeSetting, onTicksEnded: onEnded});
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
      const beats = [{rh: 3, lh: 3}];
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 3};

      let value = 0;
      const onPlayEnded = () => value++;
      const startTime = audioContext.currentTime; // approx
      play({beats, metronomeSetting, isLooping: false, onLoopCounting: ()=>{}, onPlayEnded});

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
      const beats = [{rh: 3, lh: 3}];
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 3};

      let value = 0;
      const onPlayEnded = () => value++;
      const startTime = audioContext.currentTime; // approx
      play({beats, metronomeSetting, isLooping: false, onLoopCounting: ()=>{}, onPlayEnded});

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
      const beats = [{rh: 3, lh: 3}];
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 3};

      let value = 0;
      const onPlayEnded = () => value++;
      const startTime = audioContext.currentTime; // approx
      play({beats, metronomeSetting, isLooping: false, onLoopCounting: ()=>{}, onPlayEnded});

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
      const beats = [{rh: 1, lh: 1}];
      const metronomeSetting = {classicTicksPerMinute: 30, classicTicksPerBeat: 1};

      let value = 0;
      const onPlayEnded = () => value++;

      const startTime = audioContext.currentTime;
      play({beats, metronomeSetting, isLooping: false, onLoopCounting: ()=>{}, onPlayEnded});

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
  nestOuter.test('...Validate Tick-count with classic-ticks-per-beat', (nestInner) => {
    nestInner.test('......Yes exception', assert => {
      audioTestStart();
      const msg = 'Expecting TickCountVsClassicTicksPerBeatError';

      const beats = [{rh: 1, lh: 3}];
      const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 2};
      const fn = () => play({beats, metronomeSetting, isLooping: false, onPlayEnded: ()=>{}});

      assert.throws(fn, TickCountVsClassicTicksPerBeatError, msg);
      assert.end();
      audioTestEnd();
    });
    nestInner.test('......No exception', assert => {
      audioTestStart();
      const msg = 'Not expecting TickCountVsClassicTicksPerBeatError';

      const beats = [{rh: 1, lh: 4}];
      const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 2};
      const fn = () => play({beats, metronomeSetting, isLooping: false, onPlayEnded: ()=>{}});

      assert.doesNotThrow(fn, TickCountVsClassicTicksPerBeatError, msg);
      assert.end();
      audioTestEnd();
    });
    nestInner.test('......Report problem 1', assert => {
      audioTestStart();
      const msg = 'Problem is in third beat';

      const beats = [{rh: 1, lh: 2},{rh: 1, lh: 2},{rh: 5, lh: 3}];
      const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 2};
      let actual = {};

      try {
        play({beats, metronomeSetting, isLooping: false, onPlayEnded: ()=>{}});
      }
      catch ({beatIndex, tickCount, classicTicksPerBeat, message}) {
        actual = {beatIndex, tickCount, classicTicksPerBeat, message};
      };

      const expected = {
        beatIndex: 2, // 0 based
        tickCount: 15,
        classicTicksPerBeat: 2,
        message: 'Beat #3: Tick count of 15 is not cleanly divisible by Classic Ticks Per Beat of 2' // 1 based
      };

      assert.deepEqual(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
    nestInner.test('......Report problem 2', assert => {
      audioTestStart();
      const msg = 'Only first problem of several is reported';

      const beats = [{rh: 1, lh: 8},{rh: 9, lh: 3},{rh: 9, lh: 3}];
      const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 4};
      let actual = {};

      try {
        play({beats, metronomeSetting, isLooping: false, onPlayEnded: ()=>{}});
      }
      catch ({beatIndex, tickCount, classicTicksPerBeat, message}) {
        actual = {beatIndex, tickCount, classicTicksPerBeat, message};
      };

      const expected = {
        beatIndex: 1, // 0 based
        tickCount: 9,
        classicTicksPerBeat: 4,
        message: 'Beat #2: Tick count of 9 is not cleanly divisible by Classic Ticks Per Beat of 4' // 1 based
      };

      assert.deepEqual(actual, expected, msg);
      assert.end();
      audioTestEnd();
    });
  });
  nestOuter.test('...Loop should repeat ticks, until stopped', async(assert) => {
    // don't want to test store.player.loopCount here
    audioTestStart();
    const msg = 'Should have 5 iterations';

    // 1 tick, at 1 second duration per tick
    const beats = [{rh: 1, lh: 1}];
    const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1};
    const isLooping = true;
    const store = setStore({beats, metronomeSetting, isLooping});
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
  nestOuter.test('...Loop break', nestInner => {
    nestInner.test('......should loop twice: 3 iterations with 1 break of 1 rhLh ticks', async(assert) => {
      audioTestStart();
      const msg = 'Should loop twice: 3 iterations with loop break of one rhLh tick in center';

      // 1 tick, at 1 second duration per tick
      const beats = [{rh: 1, lh: 1}];
      const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1};
      const isLooping = true;
      const isLoopBreak = true;
      const store = setStore({beats, metronomeSetting, isLooping, isLoopBreak});
      const domNode = getDomNode({store});
      let iterationCount = 0;
      const tickDuration = 1;

      const actual = [];

      const expected = [
        [
          {
            isRh: true,
            isLh: true,
            startOffset: 0 * tickDuration,
            duration: tickDuration,
            isSpacer: true
          }
        ],
        [ // break
          {
            isRh: true,
            isLh: true,
            startOffset: 0 * tickDuration,
            duration: tickDuration,
            isSpacer: true
          }
        ],
        [
          {
            isRh: true,
            isLh: true,
            startOffset: 0 * tickDuration,
            duration: tickDuration,
            isSpacer: true
          }
        ]
      ];

      embeddedAudioTest_playTicks.loopBreakTest0 = ({ticks}) => {
        const filteredTicks = ticks.map((tick) => omit(tick, 'spaceOnEnded'));
        actual.push(filteredTicks);
        iterationCount++;
        if (iterationCount == 3) {
          embeddedAudioTest_playTicks.loopBreakTest0 = null;
          simulate.click(getStopButton({domNode}));

          assert.deepEqual(actual, expected, msg);
          assert.end();
        }
        ;
      };
      simulate.click(getPlayButton({domNode}));
      await sleep(200000) /* msec */; // slows down audio clock by about 1/3
      audioTestEnd();
    });
  });
});

// isolate to avoid test conflicts
test('Metronome model', nestOuter => {
  nestOuter.test('...Loop break', nestInner => {
    nestInner.test('......should loop thrice: 5 iterations with 2 breaks of 6 rhLh ticks', async(assert) => {
      audioTestStart();
      const msg = 'Should loop thrice: 5 iterations with 2 breaks of 6 rhLh ticks';

      const beats = [{rh: 2, lh: 3}, {rh: 3, lh: 4}];
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 6};
      const isLooping = true;
      const isLoopBreak = true;
      const store = setStore({beats, metronomeSetting, isLooping, isLoopBreak});
      const domNode = getDomNode({store});
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

      embeddedAudioTest_playTicks.loopBreakTest1 = ({ticks}) => {
        const filteredTicks = ticks.map((tick) => omit(tick, 'spaceOnEnded'));
        actual.push(filteredTicks);
        iterationCount++;
        if (iterationCount == 5) {
          embeddedAudioTest_playTicks.loopBreakTest1 = null;
          simulate.click(getStopButton({domNode}));

          assert.deepEqual(actual, expected, msg);
          assert.end();
        }
        ;
      };
      simulate.click(getPlayButton({domNode}));
      await sleep(800000) /* msec */; // slows down audio clock by about 1/3
      audioTestEnd();
    });
  });
});

