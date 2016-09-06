import React from 'react';
import reactDom from 'react-dom/server';
import test from 'tape';
import dom from 'cheerio';
import {createStore} from 'redux';

import combinedReducers from '__mySource/store/reducers';
import createMetronomeContainer from '__mySource/containers/metronome';

const MetronomeContainer = createMetronomeContainer(React);
const render = reactDom.renderToStaticMarkup;

test('Metronome Container', nest => {
  nest.test('class structure', assert => {
    const msg = 'Should have beat, tickAssignment classes';

    const store = createStore(combinedReducers);
    const el = <MetronomeContainer store={store}/>;
    const $ = dom.load(render(el));

    const actual = {
      beat: Boolean($('.beat').html()),
      tickAssignment: Boolean($('.tickAssignment').html())
    };

    const expected = {
      beat: true,
      tickAssignment: true
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});

