import test from 'tape';
import deepFreeze from 'deep-freeze';

import {setMetronomeSetting} from '../../../../actions';
import metronomeSetting from '../../../../store/reducers/metronomeSetting';
////////////////////////////////////

test('MetronomeSetting reducer', nestOuter => {
  nestOuter.test('...initial', assert => {
    const message = `should set {classicTicksPerMinute: 60, classicTicksPerBeat: 1}`;

    const expected = {
      classicTicksPerMinute: 60,
      classicTicksPerBeat: 1
    };

    const actual = metronomeSetting();

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
  nestOuter.test('...Set classicTicksPerMinute, classicTicksPerBeat', nestInner => {
    nestInner.test('......SET_METRONOME_SETTING', assert => {
      const message = 'should set classicTicksPerMinute & classicTicksPerBeat';

      const stateBefore = {
        classicTicksPerMinute: 60,
        classicTicksPerBeat: 1
      };

      const action = setMetronomeSetting({
        classicTicksPerMinute: 15,
        classicTicksPerBeat: 3
      });

      const expected = {
        classicTicksPerMinute: 15,
        classicTicksPerBeat: 3
      };

      deepFreeze(stateBefore);
      deepFreeze(action);

      const actual = metronomeSetting(stateBefore, action);

      assert.deepEqual(actual, expected, message);
      assert.end();
    });
  });
});
