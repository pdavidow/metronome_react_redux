import test from 'tape';
import deepFreeze from 'deep-freeze';

import {setIsLooping} from '../../../../actions';
import playerSetting from '../../../../store/reducers/playerSetting';
////////////////////////////////////

test('PlayerSetting reducer', nestOuter => {
  nestOuter.test('...initial', assert => {
    const message = `should set {isLooping: false}`;

    const expected = {
      isLooping: false
    };
    const actual = playerSetting();

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
  nestOuter.test('......SET_IS_LOOPING', assert => {
    const message = 'should set isLooping to true';

    const stateBefore = {isLooping: false};
    const action = setIsLooping({isLooping: true});
    const expected = {isLooping: true};

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = playerSetting(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
});

