import test from 'tape';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import {Simulate as simulate} from 'react-addons-test-utils';

import {
  getDomNode,
  getElementBySelector,
  defaultStore} from '../../utils';
////////////////////////////////////

const getRhInputField = ({domNode}) => getElementBySelector({domNode, selector: '#rhInputField'});
const getLhInputField = ({domNode}) => getElementBySelector({domNode, selector: '#lhInputField'});
const getSubmitButton = ({domNode}) => getElementBySelector({domNode, selector: '#beatSubmitButton'});

test('Beat component', nestOuter => {
  nestOuter.test('...Should set beat state upon submit', assert => {
    const msg = 'Should set {rh: 3, lh: 4}';

    const rh = 3;
    const lh = 4;
    const store = defaultStore();
    const domNode = getDomNode({store});

    const rhInputField = getRhInputField({domNode});
    const lhInputField = getLhInputField({domNode});

    rhInputField.setAttribute("value", String(rh));
    simulate.change(rhInputField);
    simulate.blur(rhInputField);

    lhInputField.setAttribute("value", String(lh));
    simulate.change(lhInputField);
    simulate.blur(lhInputField);

    simulate.click(getSubmitButton({domNode}));

    const actual = store.getState().beat;
    const expected = {rh, lh};

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});
