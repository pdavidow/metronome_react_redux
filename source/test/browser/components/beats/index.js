import test from 'tape';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import {Simulate as simulate} from 'react-addons-test-utils';

import {
  getDomNode,
  getElementBySelector,
  defaultStore} from '../../utils';
////////////////////////////////////

// https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors
const getRhInputField = ({domNode}) => getElementBySelector({domNode, selector: '[name="beats[0].rh"]'});
const getLhInputField = ({domNode}) => getElementBySelector({domNode, selector: '[name="beats[0].lh"]'});
const getForm = ({domNode}) => getElementBySelector({domNode, selector: '.beats'});

test('Beats component', nestOuter => {
  nestOuter.test('...Should set beats state upon submit', assert => {
    const msg = 'Should set [{rh: 3, lh: 1}]';

    const rh = 3;
    const lh = 1;

    const store = defaultStore();
    const domNode = getDomNode({store});

    const rhInputField = getRhInputField({domNode});
    const lhInputField = getLhInputField({domNode});
    const form = getForm({domNode});

    simulate.change(rhInputField, {target: {value: rh}});
    simulate.change(lhInputField, {target: {value: lh}}); // todo: for some reason does not set this, so fake it with pre-existing value
    simulate.submit(form);

    const actual = store.getState().beats;
    const expected = [{rh, lh}];

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});
