import React from 'react';
import reactDom from 'react-dom/server';
import test from 'tape';
import dom from 'cheerio';

import createMetronomeSetting from '../../../components/metronomeSetting';
////////////////////////////////////

const MetronomeSetting = createMetronomeSetting(React);
const render = reactDom.renderToStaticMarkup;

test('MetronomeSetting component', nest => {
  nest.test('classicTicksPerMinute, classicTicksPerBeat structure', assert => {
    const msg = 'Should have classicTicksPerMinute, classicTicksPerBeat classes';

    const el = <MetronomeSetting/>;
    const $ = dom.load(render(el));

    const actual = {
      classicTicksPerMinute: Boolean($('.classicTicksPerMinute').html()),
      classicTicksPerBeat: Boolean($('.classicTicksPerBeat').html())
    };

    const expected = {
      classicTicksPerMinute: true,
      classicTicksPerBeat: true
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});

