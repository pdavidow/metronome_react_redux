import React from 'react';
import reactDom from 'react-dom/server';
import test from 'tape';
import dom from 'cheerio';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import combinedReducers from '../store/reducers';
import createApp from '../App.js';
////////////////////////////////////

const render = reactDom.renderToStaticMarkup;
let store = createStore(combinedReducers);
const App = createApp(React);

test('Metronome', assert => {
  const msg = 'Should render all sections.';

  const el =
    <Provider store={store}>
      <App />
    </Provider>;

  const $ = dom.load(render(el));

  const actual = {
    beats: Boolean($('#beatsFieldset').html()),
    player: Boolean($('#player').html()),
    playerSetting: Boolean($('#playerSettingFieldset').html()),
    metronomeSetting: Boolean($('#metronomeSettingFieldset').html())
  };

  const expected = {
    beats: true,
    player: true,
    playerSetting: true,
    metronomeSetting: true,
  };

  assert.deepEqual(actual, expected, msg);

  assert.end();
});
