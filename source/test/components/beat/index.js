import React from 'react';
import reactDom from 'react-dom/server';
import test from 'tape';
import dom from 'cheerio';

import createBeat from '../../../components/beat';
////////////////////////////////////

const Beat = createBeat(React);
const render = reactDom.renderToStaticMarkup;

test('Beat component', nest => {
  nest.test('rh, lh structure', assert => {
    const msg = 'Should have rh, lh classes';

    const props = {beat: {rh: 3, lh: 4}, onSubmit: (()=>{})};
    const el = <Beat {...props} />;
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

