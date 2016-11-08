import React from 'react';
import reactDom from 'react-dom/server';
import test from 'tape';
import dom from 'cheerio';
import {createStore} from 'redux';

import combinedReducers from '../../../store/reducers';
import createMetronomeContainer from '../../../containers/metronome';
////////////////////////////////////

const MetronomeContainer = createMetronomeContainer(React);
const render = reactDom.renderToStaticMarkup;

test('Metronome Container', nest => {
  nest.test('class structure', assert => {
    const msg = 'Should have player class';

    const store = createStore(combinedReducers);
    const el = <MetronomeContainer store={store}/>;
    const $ = dom.load(render(el));

    const actual = {
      player: Boolean($('.player').html())
    };

    const expected = {
      player: true
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});

