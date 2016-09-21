// browserify -t babelify index.js | browser-run -p 3000

import test from 'tape-async';
import sleep from 'sleep-promise';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined

import {
  play,
//} from '__mySource/models/metronome'; // todo
} from '/home/nitrous/code/mrr/source/__mySource/models/metronome';

//import {initialize} from '__mySource/models/audio'; // todo
import {initialize as initializeAudio} from '/home/nitrous/code/mrr/source/__mySource/models/audio';

test('Metronome model', nestOuter => {
  nestOuter.test('...onEnded ', nestInner => {
    nestInner.test('......2 ticks', async(assert) => {
      const msg = 'Should increment by 1';

      initializeAudio();

      const beat = {rh: 2, lh: 1};
      const metronomeSetting = {classicTicksPerMinute: 240, classicTicksPerBeat: 2};
      let value = 0;
      const onEnded = () => value++;
      play({beat, metronomeSetting, onEnded});
      await sleep(1000);

      const expected = 1;
      const actual = await Promise.resolve(value);

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......1 tick', async(assert) => { // FAILS
      const msg = 'Should increment by 1';

      initializeAudio();

      const beat = {rh: 1, lh: 1};
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 1};
      let value = 0;
      const onEnded = () => value++;
      play({beat, metronomeSetting, onEnded});
      await sleep(1000);

      const expected = 1;
      const actual = await Promise.resolve(value);

      assert.equal(actual, expected, msg);
      assert.end();
    });
  });
});
