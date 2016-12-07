import test from 'tape';
import deepFreeze from 'deep-freeze';

import {setBeats} from '../../../../actions';
import beats from '../../../../store/reducers/beats';
////////////////////////////////////

test('Beats reducer', nestOuter => {
  nestOuter.test('...initial', assert => {
    const message = 'should set [{rh: 1, lh: 1}]';

    const expected = [{rh: 1, lh: 1}];
    const actual = beats();

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
  nestOuter.test('...SET_BEATS', assert => {
    const message = 'should set entire array';

    const stateBefore = [{rh: 3, lh: 3}];
    const action = setBeats({beats: [{rh: 1, lh: 2}, {rh: 3, lh: 4}]});

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = beats(stateBefore, action);
    const expected = [{rh: 1, lh: 2}, {rh: 3, lh: 4}];

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
});
