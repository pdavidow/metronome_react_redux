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
        isRh: true,
        isLh: false
      };

      const actual = isTick_Rh(tick) && !isTick_Lh(tick) && !isTick_RhLh(tick) && !isTick_Background(tick);
      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......lh', assert => {
      const msg = 'Tick is exclusively lh';

      const tick = {
        isRh: false,
        isLh: true
      };

      const actual = !isTick_Rh(tick) && isTick_Lh(tick) && !isTick_RhLh(tick) && !isTick_Background(tick);
      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......rh & lh', assert => {
      const msg = 'Tick is exclusively rh & lh';

      const tick = {
        isRh: true,
        isLh: true
      };

      const actual = !isTick_Rh(tick) && !isTick_Lh(tick) && isTick_RhLh(tick) && !isTick_Background(tick);
      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......background', assert => {
      const msg = 'Tick is exclusively background';

      const tick = {
        isRh: false,
        isLh: false
      };

      const actual = !isTick_Rh(tick) && !isTick_Lh(tick) && !isTick_RhLh(tick) && isTick_Background(tick);
      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
    });
  });
});

