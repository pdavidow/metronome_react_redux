import test from 'tape';
import deepFreeze from 'deep-freeze';

import {setPlayer} from '../../../../actions';
import player from '../../../../store/reducers/player';
////////////////////////////////////

test('Set isPlaying', nest => {
  nest.test('initial', assert => {
    const message = `should set {isPlaying: false}`;

    const expected = {isPlaying: false};
    const actual = player();

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
  nest.test('SET_PLAYER', assert => {
    const message = 'should set isPlaying to true';

    const stateBefore = {isPlaying: false};
    const action = setPlayer({isPlaying: true});
    const expected = {isPlaying: true};

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = player(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
});

