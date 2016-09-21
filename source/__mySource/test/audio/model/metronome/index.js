// browserify -t babelify index.js | browser-run -p 3000

import test from 'tape';

import {
  play,
// } from '__mySource/models/metronome'; todo
} from '/home/nitrous/code/mrr/source/__mySource/models/metronome';

//import {initialize} from '__mySource/models/audio'; todo
import {initialize as initializeAudio} from '/home/nitrous/code/mrr/source/__mySource/models/audio';

test('Metronome model', nestOuter => {
  nestOuter.test('...onEnded ', nestInner => {
    nestInner.test('......one tick', assert => {
      const msg = 'Should increment by 1';

      initializeAudio();

      const beat = {rh: 2, lh: 3};
      const metronomeSetting = {classicTicksPerMinute: 240, classicTicksPerBeat: 6};
      let value = 0;
      const onEnded = () => {
        value++;
        console.log("value++");
      };
      play({beat, metronomeSetting, onEnded});

      const expected = 1;
      const actual = value; // todo. CAREFUL -- ASYNCH

      assert.equal(actual, expected, msg);
      assert.end();
    });
  });
});
