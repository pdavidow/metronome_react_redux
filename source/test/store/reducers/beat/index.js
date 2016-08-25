import test from 'tape';
import deepFreeze from 'deep-freeze';
import {SET_BEAT} from 'constants/actionTypes';

import beat from 'store/reducers/beat';

test('Set rh, lh', nest => {
  nest.test('initial', assert => {
    const message = `should set {rh: 0, lh: 0}`;

    const expected = {
      rh: 0,
      lh: 0
    };

    const actual = beat();

    assert.deepEqual(actual, expected, message);
    assert.end();
  });

  nest.test('SET_BEAT', assert => {
    const message = 'should set rh & lh';

    const stateBefore = {
      rh: 0,
      lh: 0
    };
    const action = {
      type: SET_BEAT,
      rh: 3,
      lh:4
    };
    const expected = {
      rh: 3,
      lh: 4
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = beat(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
});
