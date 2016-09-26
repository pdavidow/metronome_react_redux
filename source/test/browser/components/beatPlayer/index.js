import React from 'react';
import test from 'tape-async';
import sleep from 'sleep-promise';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import dom from 'cheerio';
import reactDom from 'react-dom/server';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import TestUtils from 'react-addons-test-utils';

import createBeatPlayer from '../../../../components/beatPlayer';
import createMetronomeContainer from '../../../../containers/metronome';
////////////////////////////////////

const BeatPlayer = createBeatPlayer(React);
const render = reactDom.renderToStaticMarkup;

test('BeatPlayer component', nestOuter => {
  nestOuter.test('...Play button should disable during play', nestInner => {
    nestInner.test('......BeatPlayer should render an enabled button by default', assert => {
      const msg = 'Should be enabled';

      const props = {onPlay: ()=>{}};
      const el = <BeatPlayer {...props}/>;
      const $ = dom.load(render(el));
      const output = $('#playButton').attr('disabled');

      const actual = output;
      const expected = undefined;

      assert.equal(actual, expected, msg);
    });
    /*
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

      const $$ = dom.load(render(el));
      const playButton = $$('#playButton');
      console.log("playButton", playButton);
      //TestUtils.Simulate['click'](playButton[0]);
      await sleep(10);

      const actual = await Promise.resolve(playButton.attr('disabled'));
      const expected = 'disabled';

      assert.equal(actual, expected, msg);
    });
    */
  });
});
