import React from 'react';
import test from 'tape-async';
import sleep from 'sleep-promise';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import reactDom from 'react-dom';
import reactDomServer from 'react-dom/server';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {renderIntoDocument, Simulate as simulate} from 'react-addons-test-utils';

import createBeatPlayer from '../../../../components/beatPlayer';
import createMetronomeContainer from '../../../../containers/metronome';
import combinedReducers from '../../../../store/reducers';
import {
  setBeat,
  setMetronomeSetting
} from '../../../../actions';
////////////////////////////////////

const BeatPlayer = createBeatPlayer(React);
const render = reactDomServer.renderToStaticMarkup;

const getDomNode = () => {
  const store = createStore(combinedReducers);

  // 4 ticks spaced half-second apart, for a total of 2 seconds of play
  const beat = {rh: 4, lh: 1};
  const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 4};

  store.dispatch(setBeat(beat));
  store.dispatch(setMetronomeSetting(metronomeSetting));

  const MetronomeContainer = createMetronomeContainer(React);

  const element =
    <Provider store={store}>
      <div>
        <MetronomeContainer />
      </div>
    </Provider>;

  const renderedComp = renderIntoDocument(element);

  return reactDom.findDOMNode(renderedComp);
};

// Careful: React may replace the element it is modifying, instead of changing it in place.
// So always retreive the element, instead of keeping a pointer to it.
const getPlayButton = ({domNode}) => domNode.querySelector('#playButton');

test('BeatPlayer component', nestOuter => {
  nestOuter.test('...Play button should disable during play', nestInner => {
    nestInner.test('......BeatPlayer should render an enabled button by default', assert => {
      const msg = 'Should be enabled';

      const domNode = getDomNode();

      const actual = getPlayButton({domNode}).hasAttribute('disabled');
      const expected = false;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Should be disabled during play', async(assert) => {
      const msg = 'Should be disabled';

      const domNode = getDomNode();
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

      const domNode = getDomNode();

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
