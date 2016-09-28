import test from 'tape-async';
import sleep from 'sleep-promise';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import {Simulate as simulate} from 'react-addons-test-utils';

import {
  getDomNode,
  getElementBySelector,
  setStore
} from '../../utils';
////////////////////////////////////

const store = setStore({
  // 4 ticks spaced half-second apart, for a total of 2 seconds of play
  beat: {rh: 4, lh: 1},
  metronomeSetting: {classicTicksPerMinute: 120, classicTicksPerBeat: 4}
});

const loadedDomNode = () => getDomNode({store});

// Careful: React may replace the element it is modifying, instead of changing it in place.
// So always retreive the element, instead of keeping a pointer to it.
const getPlayButton = ({domNode}) => getElementBySelector({domNode, selector: '#playButton'});

test('BeatPlayer component', nestOuter => {
  nestOuter.test('...Play button should disable during play', nestInner => {
    nestInner.test('......BeatPlayer should render an enabled button by default', assert => {
      const msg = 'Should be enabled';

      const domNode = loadedDomNode();

      const actual = getPlayButton({domNode}).hasAttribute('disabled');
      const expected = false;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Should be disabled during play', async(assert) => {
      const msg = 'Should be disabled';

      const domNode = loadedDomNode();
      simulate.click(getPlayButton({domNode}));
      await sleep(500);

      const actual = await Promise.resolve({
        then: function(onFulfill, onReject) {
          onFulfill(getPlayButton({domNode}).hasAttribute('disabled'));
        }
      });
      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Should be enabled after play', async(assert) => {
      const msg = 'Should be enabled';

      const domNode = loadedDomNode();

      simulate.click(getPlayButton({domNode}));
      await sleep(2500);

      const actual = await Promise.resolve({
        then: function(onFulfill, onReject) {
          onFulfill(getPlayButton({domNode}).hasAttribute('disabled'));
        }
      });
      const expected = false;

      assert.equal(actual, expected, msg);
      assert.end();
    });
  });
});
