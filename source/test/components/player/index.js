import React from 'react';
import reactDom from 'react-dom/server';
import test from 'tape';
import dom from 'cheerio';

import createPlayer from '../../../components/player';
////////////////////////////////////

const Player = createPlayer(React);
const render = reactDom.renderToStaticMarkup;

test('Player component', nestOuter => {
  nestOuter.test('...Tags', nestInner => {
    nestInner.test('......Play', assert => {
      const msg = 'Should have playButton id';

      const props = {
        player: {
          isPlaying: false,
          loopCount: 0,
          isTakingLoopBreak: false
        },
        playerSetting: {isLooping: false},
        onPlay: ()=>{},
        onStop: ()=>{},
        beats: [],
      };
      const el = <Player {...props}/>;
      const $ = dom.load(render(el));

      const actual = Boolean($('#playButton').html());

      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......Stop', assert => {
      const msg = 'Should have stopButton id';

      const props = {
        player: {
          isPlaying: false,
          loopCount: 0,
          isTakingLoopBreak: false
        },
        playerSetting: {isLooping: false},
        onPlay: ()=>{},
        onStop: ()=>{},
        beats: [],
      };
      const el = <Player {...props}/>;
      const $ = dom.load(render(el));

      const actual = Boolean($('#stopButton').html());

      const expected = true;

      assert.equal(actual, expected, msg);
      assert.end();
    });
  });
});
