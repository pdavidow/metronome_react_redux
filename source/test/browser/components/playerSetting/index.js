import test from 'tape';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import {Simulate as simulate} from 'react-addons-test-utils';

import {
  getDomNode,
  getElementBySelector,
  defaultStore} from '../../utils';
import {
  setIsLooping,
  setIsLoopBreak
} from '../../../../actions';
////////////////////////////////////

const getLoopCheckbox = ({domNode}) => getElementBySelector({domNode, selector: '#loopCheckbox'});
const getLoopBreakCheckbox = ({domNode}) => getElementBySelector({domNode, selector: '#loopBreakCheckbox'});

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

      const actual = store.getState().playerSetting.isLooping;
      const expected = isLooping;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......False if unchecked', assert => {
      const msg = 'Should set false if unchecked';

      const isLooping = false;

      // First set to true
      const store = defaultStore();
      store.dispatch(setIsLooping({isLooping: true}));
      const domNode = getDomNode({store});

      const loopCheckbox = getLoopCheckbox({domNode});
      const form = getElementBySelector({domNode, selector: '.playerSetting'});

      simulate.change(loopCheckbox, {target: {value: isLooping}});
      simulate.submit(form);

      const actual = store.getState().playerSetting.isLooping;
      const expected = isLooping;

      assert.equal(actual, expected, msg);
      assert.end();
    });
  });
  nestOuter.test('...Should set store isLoopBreak upon submit', nestInner => {
    nestInner.test('......True if checked', assert => {
      const msg = 'Should set true if checked';

      const isLoopBreak = true;

      const store = defaultStore();
      const domNode = getDomNode({store});

      const loopBreakCheckbox = getLoopBreakCheckbox({domNode});
      const form = getElementBySelector({domNode, selector: '.playerSetting'});

      simulate.change(loopBreakCheckbox, {target: {value: isLoopBreak}});
      simulate.submit(form);

      const actual = store.getState().playerSetting.isLoopBreak;
      const expected = isLoopBreak;

      assert.equal(actual, expected, msg);
      assert.end();
    });
    nestInner.test('......False if unchecked', assert => {
      const msg = 'Should set false if unchecked';

      const isLooping = false;

      // First set to true
      const store = defaultStore();
      store.dispatch(setIsLoopBreak({isLoopBreak: true}));
      const domNode = getDomNode({store});

      const loopBreakCheckbox = getLoopBreakCheckbox({domNode});
      const form = getElementBySelector({domNode, selector: '.playerSetting'});

      simulate.change(loopBreakCheckbox, {target: {value: isLooping}});
      simulate.submit(form);

      const actual = store.getState().playerSetting.isLooping;
      const expected = isLooping;

      assert.equal(actual, expected, msg);
      assert.end();
    });
  });
});

