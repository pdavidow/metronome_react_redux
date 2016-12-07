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
const getMetronomeForm = ({domNode}) => getElementBySelector({domNode, selector: '#metronomeForm'});

test('PlayerSetting component', nestOuter => {
  nestOuter.test('...Should set store isLooping upon submit', nestInner => {
    nestInner.test('......True if checked', assert => {
      const msg = 'Should set true if checked';

      const isLooping = true;

      const store = defaultStore();
      const domNode = getDomNode({store});

      simulate.change(getLoopCheckbox({domNode}), {target: {value: isLooping}});
      simulate.submit(getMetronomeForm({domNode}));

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

      simulate.change(getLoopCheckbox({domNode}), {target: {value: isLooping}});
      simulate.submit(getMetronomeForm({domNode}));

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

      simulate.change(getLoopBreakCheckbox({domNode}), {target: {value: isLoopBreak}});
      simulate.submit(getMetronomeForm({domNode}));

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

      simulate.change(getLoopBreakCheckbox({domNode}), {target: {value: isLooping}});
      simulate.submit(getMetronomeForm({domNode}));

      const actual = store.getState().playerSetting.isLooping;
      const expected = isLooping;

      assert.equal(actual, expected, msg);
      assert.end();
    });
  });
  nestOuter.test('...Should disable isLoopBreak checkbox if isLoop checkbox is unchecked', assert => {
    const msg = 'Should disable isLoopBreak checkbox';

    const store = defaultStore();
    store.dispatch(setIsLooping({isLooping: true}));
    const domNode = getDomNode({store});
    const actual = {};

    actual.before = getLoopBreakCheckbox({domNode}).hasAttribute('disabled');
    simulate.change(getLoopCheckbox({domNode}), {target: {value: false}});
    actual.after = getLoopBreakCheckbox({domNode}).hasAttribute('disabled');

    const expected = {
      before: false,
      after: true
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});

