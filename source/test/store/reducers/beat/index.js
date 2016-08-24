import test from 'tape';
import deepFreeze from 'deep-freeze';
import {SET_RH, SET_LH, SET_RH_LH} from 'constants/actionTypes';

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

  nest.test('SET_RH', assert => {
    const message = 'should set rh';

    const stateBefore = {
      rh: 0,
      lh: 0
    };
    const action = {
      type: SET_RH,
      value: 3
    };
    const expected = {
      rh: 3,
      lh: 0
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = beat(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });

  nest.test('SET_LH', assert => {
    const message = 'should set lh';

    const stateBefore = {
      rh: 0,
      lh: 0
    };
    const action = {
      type: SET_LH,
      value: 4
    };
    const expected = {
      rh: 0,
      lh: 4
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = beat(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });

  nest.test('SET_RH_LH', assert => {
    const message = 'should set rh & lh';

    const stateBefore = {
      rh: 0,
      lh: 0
    };
    const action = {
      type: SET_RH_LH,
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
