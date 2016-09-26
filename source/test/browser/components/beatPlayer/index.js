import React from 'react';
import test from 'tape-async';
import sleep from 'sleep-promise';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import dom from 'cheerio';
import reactDom from 'react-dom';
import reactDomServer from 'react-dom/server';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import TestUtils from 'react-addons-test-utils';

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
const {renderIntoDocument, Simulate} = TestUtils;

//http://stackoverflow.com/questions/25995656/why-does-getattributedisabled-return-true-not-disabled

test('BeatPlayer component', nestOuter => {
  nestOuter.test('...Play button should disable during play', nestInner => {

    nestInner.test('......BeatPlayer should render an enabled button by default', assert => {
      const msg = 'Should be enabled';

      const el = <BeatPlayer/>;
      const $ = dom.load(render(el));
      const output = $('#playButton').attr('disabled');

      const actual = output;
      const expected = undefined;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Should be disabled during play', async(assert) => {
      const msg = 'Should be disabled';

      const store = createStore(combinedReducers);
      const beat = {rh: 3, lh: 1};
      const metronomeSetting = {classicTicksPerMinute: 120, classicTicksPerBeat: 3};
      store.dispatch(setBeat(beat));
      store.dispatch(setMetronomeSetting(metronomeSetting));

      const MetronomeContainer = createMetronomeContainer(React);

      const el =
        <Provider store={store}>
          <div>
            <MetronomeContainer />
          </div>
        </Provider>;

      const renderedComp = renderIntoDocument(el);
      const domNode = reactDom.findDOMNode(renderedComp);
      const playButton = domNode.querySelector('#playButton');

      let actual = playButton.getAttribute('disabled');
      let expected = null;
      assert.equal(actual, expected, 'default: enabled');

      Simulate.click(playButton);
      await sleep(100);

      actual = await Promise.resolve({
        then: function(onFulfill, onReject) {
          onFulfill(playButton.getAttribute('disabled'));
        }
      });
      expected = 'true';

      assert.equal(actual, expected, msg);
      assert.end();
    });
  });
});
