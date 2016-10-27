import test from 'tape';
import deepFreeze from 'deep-freeze';

import {
  setIsPlaying,
  incrementLoopCount,
  resetLoopCount
} from '../../../../actions';
import player from '../../../../store/reducers/player';
////////////////////////////////////

test('Player reducer', nestOuter => {
  nestOuter.test('...initial', assert => {
    const message = `should set {isPlaying: false, loopCount: 0}`;

    const expected = {
      isPlaying: false,
      loopCount: 0
    };
    const actual = player();

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
  nestOuter.test('...SET_IS_PLAYING', assert => {
    const message = 'should set isPlaying to true';

    const stateBefore = {
      isPlaying: false,
      loopCount: 0
    };

    const action = setIsPlaying({isPlaying: true});

    const expected = {
      isPlaying: true,
      loopCount: 0
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = player(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
  nestOuter.test('...INCREMENT_LOOP_COUNT', assert => {
    const message = 'should increment loopCount by 1';

    const stateBefore = {
      isPlaying: false,
      loopCount: 0
    };

    const action = incrementLoopCount();

    const expected = {
      isPlaying: false,
      loopCount: 1
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = player(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
  nestOuter.test('...RESET_LOOP_COUNT', assert => {
    const message = 'should set loopCount to 0';

    const stateBefore = {
      isPlaying: false,
      loopCount: 1
    };

    const action = resetLoopCount();

    const expected = {
      isPlaying: false,
      loopCount: 0
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = player(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
});

