import test from 'tape';
import deepFreeze from 'deep-freeze';

import {setBeat} from '../../../../actions';
import beat from '../../../../store/reducers/beat';
////////////////////////////////////

test('Beat reducer', nestOuter => {
  nestOuter.test('...Set rh, lh', nestInner => {
    nestInner.test('......initial', assert => {
      const message = `should set {rh: 1, lh: 1}`;

      const expected = {
        rh: 1,
        lh: 1
      };

      const actual = beat();

      assert.deepEqual(actual, expected, message);
      assert.end();
    });
    nestInner.test('......SET_BEAT', assert => {
      const message = 'should set rh & lh';

      const stateBefore = {rh: 1, lh: 1};
      const action = setBeat({rh: 3, lh: 4});
      const expected = {rh: 3, lh: 4};

      deepFreeze(stateBefore);
      deepFreeze(action);

      const actual = beat(stateBefore, action);

      assert.deepEqual(actual, expected, message);
      assert.end();
    });
  });
});
