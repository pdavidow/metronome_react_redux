import test from 'tape';
import {range} from 'lodash';

import {
  calc_tickCount,
  calc_rhTickIndices,
  calc_lhTickIndices,
  calc_tickDuration,
  calc_tickStartTimeOffsets,
  calc_ticks,
  calc_rhTicks,
  calc_lhTicks,
  calc_rhOrLhTicks
} from '../../../models/metronome';
////////////////////////////////////

test('Metronome model', nestOuter => {
  nestOuter.test('...Tick count should equal Lowest Common Multiple of rh and lh', nestInner => {
    const msg = 'Tick count should equal Lowest Common Multiple of rh and lh';
    nestInner.test('......Test #1', assert => {
      const actual = calc_tickCount({beat: {rh: 3, lh: 4}});
      const expected = 12;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #2', assert => {
      const actual = calc_tickCount({beat: {rh: 8, lh: 6}});
      const expected = 24;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #3', assert => {
      const actual = calc_tickCount({beat: {rh: 0, lh: 0}});
      const expected = 0;

      assert.equal(actual, expected, msg);
      assert.end();
    });
  });
  nestOuter.test('...Right Hand tick indices', nestInner => {
    const msg = 'Right Hand should know its tick indices';
    nestInner.test('......Test #1', assert => {
      const actual = calc_rhTickIndices({beat: {rh: 3, lh: 1}});
      const expected = [0,1,2];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #2', assert => {
      const actual = calc_rhTickIndices({beat: {rh: 3, lh: 4}});
      const expected = [0,4,8];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #3', assert => {
      const actual = calc_rhTickIndices({beat: {rh: 8, lh: 6}});
      const expected = [0,3,6,9,12,15,18,21];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #4', assert => {
      const actual = calc_rhTickIndices({beat: {rh: 0, lh: 0}});
      const expected = [];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
  });
  nestOuter.test('...Left Hand tick indices', nestInner => {
    const msg = 'Left Hand should know its tick indices';
    nestInner.test('......Test #1', assert => {
      const actual = calc_lhTickIndices({beat: {rh: 3, lh: 1}});
      const expected = [0];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #2', assert => {
      const actual = calc_lhTickIndices({beat: {rh: 3, lh: 4}});
      const expected = [0,3,6,9];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #3', assert => {
      const actual = calc_lhTickIndices({beat: {rh: 8, lh: 6}});
      const expected = [0,4,8,12,16,20];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #4', assert => {
      const actual = calc_lhTickIndices({beat: {rh: 0, lh: 0}});
      const expected = [];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
  });
  nestOuter.test('...Tick duration (sec)', nestInner => {
    nestInner.test('......Test #1', assert => {
      const msg = '1 tick every 1 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        metronomeSetting: {classicTicksPerMinute: 60, classicTicksPerBeat: 12}
      });

      const expected = 1;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #2', assert => {
      const msg = '1 tick every 2 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        metronomeSetting: {classicTicksPerMinute: 30, classicTicksPerBeat: 12}
      });

      const expected = 2;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #3', assert => {
      const msg = '1 tick every 1/2 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        metronomeSetting: {classicTicksPerMinute: 120, classicTicksPerBeat: 12}
      });

      const expected = 1/2;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #4', assert => {
      const msg = '1 tick every 2 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        metronomeSetting: {classicTicksPerMinute: 60, classicTicksPerBeat: 24}
      });

      const expected = 2;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #5', assert => {
      const msg = '1 tick every 1/2 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        metronomeSetting: {classicTicksPerMinute: 60, classicTicksPerBeat: 6}
      });

      const expected = 1/2;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #6', assert => {
      const msg = '1 tick every 1 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        metronomeSetting: {classicTicksPerMinute: 30, classicTicksPerBeat: 6}
      });

      const expected = 1;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #7', assert => {
      const msg = '1 tick every 1 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        metronomeSetting: {classicTicksPerMinute: 120, classicTicksPerBeat: 24}
      });

      const expected = 1;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #8', assert => {
      const msg = '1 tick every 1/2 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        metronomeSetting: {classicTicksPerMinute: 30, classicTicksPerBeat: 3}
      });

      const expected = 1/2;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #9', assert => {
      const msg = '1 tick every 12 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        metronomeSetting: {classicTicksPerMinute: 10, classicTicksPerBeat: 24}
      });

      const expected = 12;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #10', assert => {
      const msg = '1 tick every 1/6 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        metronomeSetting: {classicTicksPerMinute: 120, classicTicksPerBeat: 4}
      });

      const expected = 1/6;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
  });
  nestOuter.test('...Tick start-time offsets (sec)', nestInner => {
    nestInner.test('......Test #1', assert => {
      const msg = '12 ticks, 1 tick every 1 sec, for 12 sec';

      const beat = {rh: 3, lh: 4};
      const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 12};

      const tickCount = calc_tickCount({beat});
      const duration = calc_tickDuration({beat, metronomeSetting});

      const actual = calc_tickStartTimeOffsets({tickCount, duration});
      const expected = range(0, 12, 1);

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #2', assert => {
      const msg = '12 ticks, 1 tick every 2 sec, for 24 sec';

      const beat = {rh: 3, lh: 4};
      const metronomeSetting = {classicTicksPerMinute: 30, classicTicksPerBeat: 12};

      const tickCount = calc_tickCount({beat});
      const duration = calc_tickDuration({beat, metronomeSetting});

      const actual = calc_tickStartTimeOffsets({tickCount, duration});
      const expected = range(0, 24, 2);

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #3', assert => {
      const msg = '12 ticks, 1 tick every 1/2 sec, for 6 sec';

      const beat = {rh: 3, lh: 4};
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 12};

      const tickCount = calc_tickCount({beat});
      const duration = calc_tickDuration({beat, metronomeSetting});

      const actual = calc_tickStartTimeOffsets({tickCount, duration});
      const expected = range(0, 6, 1/2);

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #4', assert => {
      const msg = '12 ticks, 1 tick every 2 sec, for 24 sec';

      const beat = {rh: 3, lh: 4};
      const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 24};

      const tickCount = calc_tickCount({beat});
      const duration = calc_tickDuration({beat, metronomeSetting});

      const actual = calc_tickStartTimeOffsets({tickCount, duration});
      const expected = range(0, 24, 2);

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #5', assert => {
      const msg = '12 ticks, 1 tick every 1/2 sec, for 6 sec';

      const beat = {rh: 3, lh: 4};
      const metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 6};

      const tickCount = calc_tickCount({beat});
      const duration = calc_tickDuration({beat, metronomeSetting});

      const actual = calc_tickStartTimeOffsets({tickCount, duration});
      const expected = range(0, 6, 1/2);

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #6', assert => {
      const msg = '12 ticks, 1 tick every 1/6 sec, for 2 sec';

      const beat = {rh: 3, lh: 4};
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 4};

      const tickCount = calc_tickCount({beat});
      const duration = calc_tickDuration({beat, metronomeSetting});

      const actual = calc_tickStartTimeOffsets({tickCount, duration});
      const expected = range(0, 2, 1/6);

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #7', assert => {
      const msg = '24 ticks, 1 tick every 2 sec, for 48 sec';

      const beat = {rh: 8, lh: 6};
      const metronomeSetting = {classicTicksPerMinute: 15, classicTicksPerBeat: 12};

      const tickCount = calc_tickCount({beat});
      const duration = calc_tickDuration({beat, metronomeSetting});

      const actual = calc_tickStartTimeOffsets({tickCount, duration});
      const expected = range(0, 48, 2);

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
  });
  nestOuter.test('...Ticks for Beat', nestInner => {
    const msg = 'All tick details must be correct';
    nestInner.test('......Test #1', assert => {
      const tickDuration = 1;

      const actual = calc_ticks({
        beats: [{rh: 3, lh: 4}],
        metronomeSetting: {classicTicksPerMinute: 60, classicTicksPerBeat: 12}
      });

      const expected = [
        {
          isRH: true,
          isLH: true,
          startOffset: 0 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 1 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 2 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 3 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 4 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 5 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 6 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 7 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 8 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 9 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 10 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          isSpacer: true,
          startOffset: 11 * tickDuration,
          duration: tickDuration
        }
      ];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #2', assert => {
      const tickDuration = 2;

      const actual = calc_ticks({
        beats: [{rh: 8, lh: 6}],
        metronomeSetting: {classicTicksPerMinute: 15, classicTicksPerBeat: 12}
      });

      const expected = [
        {
          isRH: true,
          isLH: true,
          startOffset: 0 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 1 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 2 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 3 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 4 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 5 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 6 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 7 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 8 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 9 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 10 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 11 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: true,
          isLH: true,
          startOffset: 12 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 13 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 14 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 15 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 16 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 17 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 18 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 19 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: true,
          startOffset: 20 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: true,
          isLH: false,
          startOffset: 21 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          startOffset: 22 * tickDuration,
          duration: tickDuration
        },
        {
          isRH: false,
          isLH: false,
          isSpacer: true,
          startOffset: 23 * tickDuration,
          duration: tickDuration
        }
      ];
      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
  });
  nestOuter.test('...Ticks for Beats', nestInner => {
    const msg = 'All tick details must be correct';
    nestInner.test('......Test #1', assert => {
      const tickDuration_beat0 = 1;
      const tickDuration_beat1 = 1;
      const beatDuration = 1;

      const actual = calc_ticks({
        beats: [{rh: 1, lh: 1}, {rh: 1, lh: 1}],
        metronomeSetting: {classicTicksPerMinute: 60, classicTicksPerBeat: 1}
      });

      const expected = [
        {
          isRH: true,
          isLH: true,
          startOffset: (0 * beatDuration) + (0 * tickDuration_beat0),
          duration: tickDuration_beat0
        },
        {
          isRH: true,
          isLH: true,
          startOffset: (1 * beatDuration) + (0 * tickDuration_beat1),
          duration: tickDuration_beat1,
          isSpacer: true
        }
      ];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #2', assert => {
      const tickDuration_beat0 = 0.5;
      const tickDuration_beat1 = 0.25;
      const beatDuration = 1;

      const actual = calc_ticks({
        beats: [{rh: 1, lh: 2}, {rh: 1, lh: 4}],
        metronomeSetting: {classicTicksPerMinute: 60, classicTicksPerBeat: 1}
      });

      const expected = [
        {
          isRH: true,
          isLH: true,
          startOffset: (0 * beatDuration) + (0 * tickDuration_beat0),
          duration: tickDuration_beat0
        },
        {
          isRH: false,
          isLH: true,
          startOffset: (0 * beatDuration) + (1 * tickDuration_beat0),
          duration: tickDuration_beat0,
        },
        {
          isRH: true,
          isLH: true,
          startOffset: (1 * beatDuration) + (0 * tickDuration_beat1),
          duration: tickDuration_beat1
        },
        {
          isRH: false,
          isLH: true,
          startOffset: (1 * beatDuration) + (1 * tickDuration_beat1),
          duration: tickDuration_beat1,
        },
        {
          isRH: false,
          isLH: true,
          startOffset: (1 * beatDuration) + (2 * tickDuration_beat1),
          duration: tickDuration_beat1,
        },
        {
          isRH: false,
          isLH: true,
          startOffset: (1 * beatDuration) + (3 * tickDuration_beat1),
          duration: tickDuration_beat1,
          isSpacer: true
        }
      ];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
  });
  nestOuter.test('...Defaults for calc_tickCount', assert => {
    const msg = "calc_tickCount for default {rh:1, lh:1} should be 1";

    const actual = calc_tickCount();
    const expected = 1;

    assert.equal(actual, expected, msg);
    assert.end();
  });
  nestOuter.test('...Defaults for calc_rhTickIndices', assert => {
    const msg = "calc_rhTickIndices for default {rh:1, lh:1} should be [0]";

    const actual = calc_rhTickIndices();
    const expected = [0];

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
  nestOuter.test('...Defaults for calc_lhTickIndices', assert => {
    const msg = "calc_lhTickIndices for default {rh:1, lh:1} should be [0]";

    const actual = calc_lhTickIndices();
    const expected = [0];

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
  nestOuter.test('...Defaults for calc_tickDuration', assert => {
    const msg = "calc_tickDuration for default {rh: 1, lh: 1}, classicTicksPerMinute = 60, classicTicksPerBeat = 1, should be 1";

    const actual = calc_tickDuration();
    const expected = 1;

    assert.equal(actual, expected, msg);
    assert.end();
  });
  nestOuter.test('...Defaults for calc_tickStartTimeOffsets', assert => {
    const msg = "calc_tickStartTimeOffsets for default {rh: 1, lh: 1}, classicTicksPerMinute = 60, classicTicksPerBeat = 1, should be [0]";

    const actual = calc_tickStartTimeOffsets();
    const expected = [0];

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
  nestOuter.test('...Defaults for calc_ticks', assert => {
    const msg = "calc_ticks for default {rh: 1, lh: 1}, classicTicksPerMinute = 60, classicTicksPerBeat = 1, should be 1 RhLh tick at time 0";

    const actual = calc_ticks();

    const expected = [
      {
        isLH: true,
        isRH: true,
        isSpacer: true,
        duration: 1,
        startOffset: 0
      }
    ];

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});

