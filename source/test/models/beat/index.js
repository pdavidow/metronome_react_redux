import test from 'tape';
import {tickCount, rhTickIndices, lhTickIndices} from 'models/beat';

test('Beat model', nest => {
  nest.test('tick count', assert => {
    const msg = 'Beat tick count should equal lowest common multiple of rh and lh';

    let actual = tickCount({rh: 3, lh: 4});
    let expected = 12;
    assert.equal(actual, expected, msg);

    actual = tickCount({rh: 8, lh: 6});
    expected = 24;
    assert.equal(actual, expected, msg);

    actual = tickCount({rh: 0, lh: 0});
    expected = 0;
    assert.equal(actual, expected, msg);

    assert.end();
  });
  nest.test('rh tick indices', assert => {
    const msg = 'Right hand should know its tick indices';

    const actual1 = rhTickIndices({rh: 3, lh: 1});
    const expected1 = [0,1,2];
    assert.deepEqual(actual1, expected1, msg);

    const actual2 = rhTickIndices({rh: 3, lh: 4});
    const expected2 = [0,4,8];
    assert.deepEqual(actual2, expected2, msg);

    const actual3 = rhTickIndices({rh: 8, lh: 6});
    const expected3 = [0,3,6,9,12,15,18,21];
    assert.deepEqual(actual3, expected3, msg);

    const actual4 = rhTickIndices({rh: 0, lh: 0});
    const expected4 = [];
    assert.deepEqual(actual4, expected4, msg);

    assert.end();
  });
  nest.test('lh tick indices', assert => {
    const msg = 'Left hand should know its tick indices';

    const actual1 = lhTickIndices({rh: 3, lh: 1});
    const expected1 = [0];
    assert.deepEqual(actual1, expected1, msg);

    const actual2 = lhTickIndices({rh: 3, lh: 4});
    const expected2 = [0,3,6,9];
    assert.deepEqual(actual2, expected2, msg);

    const actual3 = lhTickIndices({rh: 8, lh: 6});
    const expected3 = [0,4,8,12,16,20];
    assert.deepEqual(actual3, expected3, msg);

    const actual4 = lhTickIndices({rh: 0, lh: 0});
    const expected4 = [];
    assert.deepEqual(actual4, expected4, msg);

    assert.end();
  });
});
