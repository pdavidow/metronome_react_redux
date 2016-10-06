import React from 'react';
import reactDom from 'react-dom/server';
import test from 'tape';
import dom from 'cheerio';

import createBeatPlayer from '../../../components/beatPlayer';
////////////////////////////////////

const BeatPlayer = createBeatPlayer(React);
const render = reactDom.renderToStaticMarkup;

test('BeatPlayer component', nestOuter => {
  nestOuter.test('...Tags', nestInner => {
    nestInner.test('......Play', assert => {
      const msg = 'Should have playButton id';

      const props = {player: {isPlaying: false}};
      const el = <BeatPlayer {...props}/>;
      const $ = dom.load(render(el));

      const actual = Boolean($('#playButton').html());

      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Stop', assert => {
      const msg = 'Should have stopButton id';

      const props = {player: {isPlaying: false}};
      const el = <BeatPlayer {...props}/>;
      const $ = dom.load(render(el));

      const actual = Boolean($('#stopButton').html());

      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Loop', assert => {
      const msg = 'Should have loop checkbox id';

      const props = {player: {isPlaying: false}};
      const el = <BeatPlayer {...props}/>;
      const $ = dom.load(render(el));

      const actual = Boolean($('#loopCheckbox').attr('id'));
      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
    });
  });
});
