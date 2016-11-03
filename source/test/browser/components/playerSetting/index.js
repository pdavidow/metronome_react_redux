import test from 'tape';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import {Simulate as simulate} from 'react-addons-test-utils';

import {
  getDomNode,
  getElementBySelector,
  defaultStore} from '../../utils';
import {setPlayerSetting} from '../../../../actions';
////////////////////////////////////

const getLoopCheckbox = ({domNode}) => getElementBySelector({domNode, selector: '#loopCheckbox'});

test('PlayerSetting component', nestOuter => {
  nestOuter.test('...Should set store isLooping upon submit', nestInner => {
    nestInner.test('......True if checked', assert => {
      const msg = 'Should set true if checked';

      const isLooping = true;

      const store = defaultStore();
      const domNode = getDomNode({store});

      const loopCheckbox = getLoopCheckbox({domNode});
      const form = getElementBySelector({domNode, selector: '.playerSetting'});

      simulate.change(loopCheckbox, {target: {value: isLooping}});
      simulate.submit(form);

      const actual = store.getState().playerSetting;
      const expected = {isLooping};

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......False if unchecked', assert => {
      const msg = 'Should set false if unchecked';

      const isLooping = false;

      // First set to true
      const store = defaultStore();
      store.dispatch(setPlayerSetting({isLooping: true}));
      const domNode = getDomNode({store});

      const loopCheckbox = getLoopCheckbox({domNode});
      const form = getElementBySelector({domNode, selector: '.playerSetting'});

      simulate.change(loopCheckbox, {target: {value: isLooping}});
      simulate.submit(form);

      const actual = store.getState().playerSetting;
      const expected = {isLooping};

      assert.deepEqual(actual, expected, msg);
      assert.end();
    });
  });
});

