import React from 'react';
import reactDom from 'react-dom/server';
import test from 'tape';
import dom from 'cheerio';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import createPlayerSetting from '../../../components/playerSetting';
import combinedReducers from '../../../store/reducers';
////////////////////////////////////

const PlayerSetting = createPlayerSetting(React);
const render = reactDom.renderToStaticMarkup;

test('PlayerSetting component', nest => {
  nest.test('Tags', assert => {
    const msg = 'Should have isLooping class';

    const store = createStore(combinedReducers);

    const el =
      <Provider store={store}>
        <PlayerSetting />
      </Provider>;
    const $ = dom.load(render(el));

    const actual = {
      isLooping: Boolean($('.isLooping').html())
    };

    const expected = {
      isLooping: true
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
  nest.test('......Loop', assert => {
    const msg = 'Should have loop checkbox id';

    const store = createStore(combinedReducers);

    const el =
      <Provider store={store}>
        <PlayerSetting />
      </Provider>;
    const $ = dom.load(render(el));

    const actual = Boolean($('#loopCheckbox').attr('id'));
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});

