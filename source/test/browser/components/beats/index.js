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
    const msg = 'Should set [{rh: 3, lh: 4}]';

    const rh = 3;
    const lh = 4;

    const store = defaultStore();
    const domNode = getDomNode({store});

    simulate.change(getRhInputField({domNode}), {target: {value: rh}});
    simulate.change(getLhInputField({domNode}), {target: {value: lh}});
    simulate.submit(getForm({domNode}));

    const actual = store.getState().beats;
    const expected = [{rh, lh}];

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});
