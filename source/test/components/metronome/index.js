import React from 'react';
import reactDom from 'react-dom/server';
import test from 'tape';
import dom from 'cheerio';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import combinedReducers from '../../../store/reducers';
import createMetronome from '../../../components/metronome';
////////////////////////////////////

const Metronome = createMetronome(React);
const render = reactDom.renderToStaticMarkup;

test('Metronome Container', nest => {
  nest.test('tag structure', assert => {
    const msg = 'Should have metronomeForm & player';

    const store = createStore(combinedReducers);
    const el = (
      <Provider store={store}>
        <Metronome />
      </Provider>
    );
    const $ = dom.load(render(el));

    const actual = {
      metronomeForm: Boolean($('#metronomeForm').html()),
      player: Boolean($('#player').html())
    };

    const expected = {
      metronomeForm: true,
      player: true
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});

