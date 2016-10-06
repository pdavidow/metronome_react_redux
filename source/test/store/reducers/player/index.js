import test from 'tape';
import deepFreeze from 'deep-freeze';

import {
  setIsPlaying,
  setIsLooping
} from '../../../../actions';
import player from '../../../../store/reducers/player';
////////////////////////////////////

test('Player reducer', nestOuter => {
  nestOuter.test('...Set isPlaying', nestInner => {
    nestInner.test('......initial', assert => {
      const message = `should set {isPlaying: false, isLooping: false}`;

      const expected = {
        isPlaying: false,
        isLooping: false
      };
      const actual = player();

      assert.deepEqual(actual, expected, message);
      assert.end();
    });
    nestInner.test('......SET_IS_PLAYING', assert => {
      const message = 'should set isPlaying to true';

      const stateBefore = {isPlaying: false};
      const action = setIsPlaying({isPlaying: true});
      const expected = {isPlaying: true};

      deepFreeze(stateBefore);
      deepFreeze(action);

      const actual = player(stateBefore, action);

      assert.deepEqual(actual, expected, message);
      assert.end();
    });
    nestInner.test('......SET_IS_LOOPING', assert => {
      const message = 'should set isLooping to true';

      const stateBefore = {isLooping: false};
      const action = setIsLooping({isLooping: true});
      const expected = {isLooping: true};

      deepFreeze(stateBefore);
      deepFreeze(action);

      const actual = player(stateBefore, action);

      assert.deepEqual(actual, expected, message);
      assert.end();
    });
  });
});

