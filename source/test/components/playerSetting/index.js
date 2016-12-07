import React from 'react';
import reactDom from 'react-dom/server';
import test from 'tape';
import dom from 'cheerio';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import createMetronomeContainer from '../../../containers/metronome';
import combinedReducers from '../../../store/reducers';
////////////////////////////////////

const MetronomeContainer = createMetronomeContainer(React);
const render = reactDom.renderToStaticMarkup;

test('PlayerSetting component', nest => {
  nest.test('Tags', assert => {
    const msg = 'Should have isLooping, isLoopBreak classes';

    const store = createStore(combinedReducers);

    const el =
      <Provider store={store}>
        <MetronomeContainer />
      </Provider>;
    const $ = dom.load(render(el));

    const actual = {
      isLooping: Boolean($('.isLooping').html()),
      isLoopBreak: Boolean($('.isLoopBreak').html())
    };

    const expected = {
      isLooping: true,
      isLoopBreak: true
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
  nest.test('......Loop', assert => {
    const msg = 'Should have loop checkbox id';

    const store = createStore(combinedReducers);

    const el =
      <Provider store={store}>
        <MetronomeContainer />
      </Provider>;
    const $ = dom.load(render(el));

    const actual = Boolean($('#loopCheckbox').attr('id'));
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });
  nest.test('......Loop Break', assert => {
    const msg = 'Should have loop-break checkbox id';

    const store = createStore(combinedReducers);

    const el =
      <Provider store={store}>
        <MetronomeContainer />
      </Provider>;
    const $ = dom.load(render(el));

    const actual = Boolean($('#loopBreakCheckbox').attr('id'));
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});

