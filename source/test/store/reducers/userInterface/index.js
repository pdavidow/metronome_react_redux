import test from 'tape';
import deepFreeze from 'deep-freeze';

import {toggleIsBeatPanelOpen} from '../../../../actions';
import userInterfaceSetting from '../../../../store/reducers/userInterfaceSetting';
////////////////////////////////////

test('UserInterfaceSetting reducer', nestOuter => {
  nestOuter.test('...initial', assert => {
    const message = `should set {isBeatPanelOpen: false}`;

    const expected = {
      isBeatPanelOpen: false,
    };
    const actual = userInterfaceSetting();

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
  nestOuter.test('...1) TOGGLE_IS_BEAT_PANEL_OPEN', assert => {
    const message = 'should toggle isBeatPanelOpen';

    const stateBefore = {isBeatPanelOpen: false};
    const action = toggleIsBeatPanelOpen();
    const expected = {isBeatPanelOpen: true};

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = userInterfaceSetting(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
  nestOuter.test('...2) TOGGLE_IS_BEAT_PANEL_OPEN', assert => {
    const message = 'should toggle isBeatPanelOpen';

    const stateBefore = {isBeatPanelOpen: true};
    const action = toggleIsBeatPanelOpen();
    const expected = {isBeatPanelOpen: false};

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = userInterfaceSetting(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
});
