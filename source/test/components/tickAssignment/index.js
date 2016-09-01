import React from 'react';
import reactDom from 'react-dom/server';
import test from 'tape';
import dom from 'cheerio';

import createTickAssignment from 'components/tickAssignment';

const TickAssignment = createTickAssignment(React);
const render = reactDom.renderToStaticMarkup;

test('TickAssignment component', nest => {
  nest.test('tickCount, rhTickIndices, lhTickIndices structure', assert => {
    const msg = 'Should have tickCount, rhTickIndices, lhTickIndices classes';

    const el = <TickAssignment/>;
    const $ = dom.load(render(el));

    const actual = {
      tickCount: Boolean($('.tickCount').html()),
      rhTickIndices: Boolean($('.rhTickIndices').html()),
      lhTickIndices: Boolean($('.lhTickIndices').html()),
    };

    const expected = {
      tickCount: true,
      rhTickIndices: true,
      lhTickIndices: true,
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});

