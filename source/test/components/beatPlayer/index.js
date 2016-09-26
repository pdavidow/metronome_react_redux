import React from 'react';
import reactDom from 'react-dom/server';
import test from 'tape';
import dom from 'cheerio';

import createBeatPlayer from '../../../components/beatPlayer';
////////////////////////////////////

const BeatPlayer = createBeatPlayer(React);
const render = reactDom.renderToStaticMarkup;

test('BeatPlayer component', nest => {
  nest.test('custom class', assert => {
    const msg = 'Should have playButton id';

    const el = <BeatPlayer />;
    const $ = dom.load(render(el));

    const actual = Boolean($('#playButton').html());

    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
