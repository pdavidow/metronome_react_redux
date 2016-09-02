import test from 'tape';
import {calc_tickDuration} from 'models/metronome';

test('Metronome model', nestOuter => {
  nestOuter.test('...Tick duration (sec)', nestInner => {
    nestInner.test('......Test #1', assert => {
      const msg = '1 tick every 1 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 60,
        classicTicksPerBeat: 12});

      const expected = 1;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #2', assert => {
      const msg = '1 tick every 2 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 30,
        classicTicksPerBeat: 12});

      const expected = 2;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #3', assert => {
      const msg = '1 tick every 1/2 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 120,
        classicTicksPerBeat: 12});

      const expected = 1/2;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #4', assert => {
      const msg = '1 tick every 2 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 60,
        classicTicksPerBeat: 24});

      const expected = 2;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #5', assert => {
      const msg = '1 tick every 1/2 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 60,
        classicTicksPerBeat: 6});

      const expected = 1/2;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #6', assert => {
      const msg = '1 tick every 1 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 30,
        classicTicksPerBeat: 6});

      const expected = 1;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #7', assert => {
      const msg = '1 tick every 1 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 120,
        classicTicksPerBeat: 24});

      const expected = 1;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #8', assert => {
      const msg = '1 tick every 1/2 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 30,
        classicTicksPerBeat: 3});

      const expected = 1/2;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #9', assert => {
      const msg = '1 tick every 12 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 10,
        classicTicksPerBeat: 24});

      const expected = 12;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #10', assert => {
      const msg = '1 tick every 1/6 sec';

      const actual = calc_tickDuration({
        beat: {rh: 3, lh: 4},
        classicTicksPerMinute: 120,
        classicTicksPerBeat: 4});

      const expected = 1/6;

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
  });
});

