import test from 'tape';
import deepFreeze from 'deep-freeze';

import {setIsPlaying} from '../../../../actions';
import player from '../../../../store/reducers/player';
////////////////////////////////////

test('Player reducer', nestOuter => {
  nestOuter.test('...initial', assert => {
    const message = `should set {isPlaying: false}`;

    const expected = {
      isPlaying: false,
    };
    const actual = player();

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
  nestOuter.test('...Set isPlaying', nestInner => {
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
  });
});

