import test from 'tape';
import deepFreeze from 'deep-freeze';

import {
  setIsPlaying,
  incrementLoopCount,
  resetLoopCount,
  setIsTakingLoopBreak
} from '../../../../actions';
import player from '../../../../store/reducers/player';
////////////////////////////////////

test('Player reducer', nestOuter => {
  nestOuter.test('...initial', assert => {
    const message = `should set {isPlaying: false, loopCount: 1, isTakingLoopBreak: false}`;

    const expected = {
      isPlaying: false,
      loopCount: 1,
      isTakingLoopBreak: false
    };
    const actual = player();

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
  nestOuter.test('...SET_IS_PLAYING true', assert => {
    const message = 'should set isPlaying to true';

    const stateBefore = {
      isPlaying: false,
      loopCount: 1,
      isTakingLoopBreak: false
    };

    const action = setIsPlaying({isPlaying: true});

    const expected = {
      isPlaying: true,
      loopCount: 1,
      isTakingLoopBreak: false
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = player(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
  nestOuter.test('...SET_IS_PLAYING false', assert => {
    const message = 'should set isPlaying to false';

    const stateBefore = {
      isPlaying: true,
      loopCount: 1,
      isTakingLoopBreak: false
    };

    const action = setIsPlaying({isPlaying: false});

    const expected = {
      isPlaying: false,
      loopCount: 1,
      isTakingLoopBreak: false
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
      loopCount: 1,
      isTakingLoopBreak: false
    };

    const action = incrementLoopCount();

    const expected = {
      isPlaying: false,
      loopCount: 2,
      isTakingLoopBreak: false
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = player(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
  nestOuter.test('...RESET_LOOP_COUNT', assert => {
    const message = 'should set loopCount to 1';

    const stateBefore = {
      isPlaying: false,
      loopCount: 2,
      isTakingLoopBreak: false
    };

    const action = resetLoopCount();

    const expected = {
      isPlaying: false,
      loopCount: 1,
      isTakingLoopBreak: false
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = player(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
  nestOuter.test('...SET_IS_TAKING_LOOP_BREAK true', assert => {
    const message = 'should set isTakingLoopBreak to true';

    const stateBefore = {
      isPlaying: false,
      loopCount: 1,
      isTakingLoopBreak: false
    };

    const action = setIsTakingLoopBreak({isTakingLoopBreak: true});

    const expected = {
      isPlaying: false,
      loopCount: 1,
      isTakingLoopBreak: true
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = player(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
  nestOuter.test('...SET_IS_TAKING_LOOP_BREAK false', assert => {
    const message = 'should set isTakingLoopBreak to false';

    const stateBefore = {
      isPlaying: false,
      loopCount: 1,
      isTakingLoopBreak: true
    };

    const action = setIsTakingLoopBreak({isTakingLoopBreak: false});

    const expected = {
      isPlaying: false,
      loopCount: 1,
      isTakingLoopBreak: false
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = player(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
});

