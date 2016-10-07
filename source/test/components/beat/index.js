import React from 'react';
import reactDom from 'react-dom/server';
import test from 'tape';
import dom from 'cheerio';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import createBeat from '../../../components/beat';
import combinedReducers from '../../../store/reducers';
////////////////////////////////////

const Beat = createBeat(React);
const render = reactDom.renderToStaticMarkup;

test('Beat component', nest => {
  nest.test('Tags', assert => {
    const msg = 'Should have rh, lh classes';

    const store = createStore(combinedReducers);

    const el =
      <Provider store={store}>
        <Beat />
      </Provider>;
    const $ = dom.load(render(el));

    const actual = {
      rh: Boolean($('.rh').html()),
      lh: Boolean($('.lh').html())
    };

    const expected = {
      rh: true,
      lh: true
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});

