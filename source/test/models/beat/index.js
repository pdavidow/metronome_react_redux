import test from 'tape';
import {calc_tickCount, calc_rhTickIndices, calc_lhTickIndices} from 'models/beat';

test('Beat model', nestOuter => {
  nestOuter.test('...Tick count should equal Lowest Common Multiple of rh and lh', nestInner => {
    const msg = 'Tick count should equal Lowest Common Multiple of rh and lh';
    nestInner.test('......Test #1', assert => {
      const actual = calc_tickCount({rh: 3, lh: 4});
      const expected = 12;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #2', assert => {
      const actual = calc_tickCount({rh: 8, lh: 6});
      const expected = 24;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #3', assert => {
      const actual = calc_tickCount({rh: 0, lh: 0});
      const expected = 0;

      assert.equal(actual, expected, msg);
      assert.end();
    });
  });
  nestOuter.test('...Right Hand tick indices', nestInner => {
    const msg = 'Right Hand should know its tick indices';
    nestInner.test('......Test #1', assert => {
      const actual = calc_rhTickIndices({rh: 3, lh: 1});
      const expected = [0,1,2];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #2', assert => {
      const actual = calc_rhTickIndices({rh: 3, lh: 4});
      const expected = [0,4,8];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #3', assert => {
      const actual = calc_rhTickIndices({rh: 8, lh: 6});
      const expected = [0,3,6,9,12,15,18,21];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #4', assert => {
      const actual = calc_rhTickIndices({rh: 0, lh: 0});
      const expected = [];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
  });
  nestOuter.test('...Left Hand tick indices', nestInner => {
    const msg = 'Left Hand should know its tick indices';
    nestInner.test('......Test #1', assert => {
      const actual = calc_lhTickIndices({rh: 3, lh: 1});
      const expected = [0];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #2', assert => {
      const actual = calc_lhTickIndices({rh: 3, lh: 4});
      const expected = [0,3,6,9];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #3', assert => {
      const actual = calc_lhTickIndices({rh: 8, lh: 6});
      const expected = [0,4,8,12,16,20];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Test #4', assert => {
      const actual = calc_lhTickIndices({rh: 0, lh: 0});
      const expected = [];

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
  });
});

