import test from 'tape';
import {range} from 'lodash';
import {calc_tickDuration, calc_tickStartTimeOffsets, calc_ticks, calc_rhTicks, calc_lhTicks, calc_rhOrLhticks} from 'models/metronome';

test('Metronome model', nestOuter => {
  nestOuter.test('...Tick duration (sec)', nestInner => {
    nestInner.test('......Test #1', assert => {
      const msg = '1 tick every 1 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 60,
        classicTicksPerBeat: 12
      });

      const expected = 1;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #2', assert => {
      const msg = '1 tick every 2 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 30,
        classicTicksPerBeat: 12
      });

      const expected = 2;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #3', assert => {
      const msg = '1 tick every 1/2 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 120,
        classicTicksPerBeat: 12
      });

      const expected = 1/2;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #4', assert => {
      const msg = '1 tick every 2 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 60,
        classicTicksPerBeat: 24
      });

      const expected = 2;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #5', assert => {
      const msg = '1 tick every 1/2 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 60,
        classicTicksPerBeat: 6
      });

      const expected = 1/2;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #6', assert => {
      const msg = '1 tick every 1 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 30,
        classicTicksPerBeat: 6
      });

      const expected = 1;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #7', assert => {
      const msg = '1 tick every 1 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 120,
        classicTicksPerBeat: 24
      });

      const expected = 1;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #8', assert => {
      const msg = '1 tick every 1/2 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 30,
        classicTicksPerBeat: 3
      });

      const expected = 1/2;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #9', assert => {
      const msg = '1 tick every 12 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 10,
        classicTicksPerBeat: 24
      });

      const expected = 12;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #10', assert => {
      const msg = '1 tick every 1/6 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 120,
        classicTicksPerBeat: 4
      });

      const expected = 1/6;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
  });
  nestOuter.test('...Tick start-time offsets (sec)', nestInner => {
    nestInner.test('......Test #1', assert => {
      const msg = '12 ticks, 1 tick every 1 sec, for 12 sec';

      const actual = calc_tickStartTimeOffsets({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 60,
        classicTicksPerBeat: 12
      });

      const expected = range(0, 12, 1);

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #2', assert => {
      const msg = '12 ticks, 1 tick every 2 sec, for 24 sec';

      const actual = calc_tickStartTimeOffsets({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 30,
        classicTicksPerBeat: 12
      });

      const expected = range(0, 24, 2);

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #3', assert => {
      const msg = '12 ticks, 1 tick every 1/2 sec, for 6 sec';

      const actual = calc_tickStartTimeOffsets({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 120,
        classicTicksPerBeat: 12
      });

      const expected = range(0, 6, 1/2);

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #4', assert => {
      const msg = '12 ticks, 1 tick every 2 sec, for 24 sec';

      const actual = calc_tickStartTimeOffsets({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 60,
        classicTicksPerBeat: 24
      });

      const expected = range(0, 24, 2);

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #5', assert => {
      const msg = '12 ticks, 1 tick every 1/2 sec, for 6 sec';

      const actual = calc_tickStartTimeOffsets({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 60,
        classicTicksPerBeat: 6
      });

      const expected = range(0, 6, 1/2);

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #6', assert => {
      const msg = '12 ticks, 1 tick every 1/6 sec, for 2 sec';

      const actual = calc_tickStartTimeOffsets({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 120,
        classicTicksPerBeat: 4
      });

      const expected = range(0, 2, 1/6);

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #7', assert => {
      const msg = '24 ticks, 1 tick every 2 sec, for 48 sec';

      const actual = calc_tickStartTimeOffsets({
        beat: {rh: 8, lh: 6},
        classicTicksPerMinute: 15,
        classicTicksPerBeat: 12
      });

      const expected = range(0, 48, 2);

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
  });
  nestOuter.test('...All Ticks', nestInner => {
    const msg = 'All ticks';
    nestInner.test('......Test #1', assert => {
      const tickDuration = 1;

      const actual = calc_ticks({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 60,
        classicTicksPerBeat: 12
      });

      const expected = [
        {
          isRH: true,
          isLH: true,
          startOffset: 0 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 1 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 2 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 3 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 4 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 5 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 6 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 7 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 8 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 9 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 10 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 11 * tickDuration
        }
      ];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #2', assert => {
      const tickDuration = 2;

      const actual = calc_ticks({
        beat: {rh: 8, lh: 6},
        classicTicksPerMinute: 15,
        classicTicksPerBeat: 12
      });

      const expected = [
        {
          isRH: true,
          isLH: true,
          startOffset: 0 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 1 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 2 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 3 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 4 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 5 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 6 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 7 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 8 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 9 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 10 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 11 * tickDuration
        },
        {
          isRH: true,
          isLH: true,
          startOffset: 12 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 13 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 14 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 15 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 16 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 17 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 18 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 19 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 20 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 21 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 22 * tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 23 * tickDuration
        }
      ];
      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
  });
  nestOuter.test('...All RH Ticks', nestInner => {
    const msg = 'All Right-Hand ticks';
    nestInner.test('......Test #1', assert => {
      const tickDuration = 1;

      const actual = calc_rhTicks({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 60,
        classicTicksPerBeat: 12
      });

      const expected = [
        {
          isRH: true,
          isLH: true,
          startOffset: 0 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 4 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 8 * tickDuration
        }
      ];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #2', assert => {
      const tickDuration = 2;

      const actual = calc_rhTicks({
        beat: {rh: 8, lh: 6},
        classicTicksPerMinute: 15,
        classicTicksPerBeat: 12
      });

      const expected = [
        {
          isRH: true,
          isLH: true,
          startOffset: 0 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 3 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 6 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 9 * tickDuration
        },
        {
          isRH: true,
          isLH: true,
          startOffset: 12 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 15 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 18 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 21 * tickDuration
        }
      ];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
  });
  nestOuter.test('...All LH Ticks', nestInner => {
    const msg = 'All Left-Hand ticks';
    nestInner.test('......Test #1', assert => {
      const tickDuration = 1;

      const actual = calc_lhTicks({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 60,
        classicTicksPerBeat: 12
      });

      const expected = [
        {
          isRH: true,
          isLH: true,
          startOffset: 0 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 3 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 6 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 9 * tickDuration
        }
      ];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #2', assert => {
      const tickDuration = 2;

      const actual = calc_lhTicks({
        beat: {rh: 8, lh: 6},
        classicTicksPerMinute: 15,
        classicTicksPerBeat: 12
      });

      const expected = [
        {
          isRH: true,
          isLH: true,
          startOffset: 0 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 4 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 8 * tickDuration
        },
        {
          isRH: true,
          isLH: true,
          startOffset: 12 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 16 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 20 * tickDuration
        }
      ];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
  });
  nestOuter.test('...All RH or LH Ticks', nestInner => {
    const msg = 'All RH or LH ticks';
    nestInner.test('......Test #1', assert => {
      const tickDuration = 1;

      const actual = calc_rhOrLhticks({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 60,
        classicTicksPerBeat: 12
      });

      const expected = [
        {
          isRH: true,
          isLH: true,
          startOffset: 0 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 3 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 4 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 6 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 8 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 9 * tickDuration
        }
      ];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #2', assert => {
      const tickDuration = 2;

      const actual = calc_rhOrLhticks({
        beat: {rh: 8, lh: 6},
        classicTicksPerMinute: 15,
        classicTicksPerBeat: 12
      });

      const expected = [
        {
          isRH: true,
          isLH: true,
          startOffset: 0 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 3 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 4 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 6 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 8 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 9 * tickDuration
        },
        {
          isRH: true,
          isLH: true,
          startOffset: 12 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 15 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 16 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 18 * tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 20 * tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 21 * tickDuration
        }
      ];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
  });
});

