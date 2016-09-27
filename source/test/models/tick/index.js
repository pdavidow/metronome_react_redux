import test from 'tape';

import {
  isTick_Rh,
  isTick_Lh,
  isTick_RhLh,
  isTick_Background
} from '../../../models/tick';
////////////////////////////////////

test('Tick model', nestOuter => {
  nestOuter.test('...The four types are mutually exclusive', nestInner => {
    nestInner.test('......rh', assert => {
      const msg = 'Tick is exclusively rh';

      const tick = {
        isRH: true,
        isLH: false
      };

      const actual = isTick_Rh(tick) && !isTick_Lh(tick) && !isTick_RhLh(tick) && !isTick_Background(tick);
      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......lh', assert => {
      const msg = 'Tick is exclusively lh';

      const tick = {
        isRH: false,
        isLH: true
      };

      const actual = !isTick_Rh(tick) && isTick_Lh(tick) && !isTick_RhLh(tick) && !isTick_Background(tick);
      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......rh & lh', assert => {
      const msg = 'Tick is exclusively rh & lh';

      const tick = {
        isRH: true,
        isLH: true
      };

      const actual = !isTick_Rh(tick) && !isTick_Lh(tick) && isTick_RhLh(tick) && !isTick_Background(tick);
      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......background', assert => {
      const msg = 'Tick is exclusively background';

      const tick = {
        isRH: false,
        isLH: false
      };

      const actual = !isTick_Rh(tick) && !isTick_Lh(tick) && !isTick_RhLh(tick) && isTick_Background(tick);
      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
    });
  });
});

