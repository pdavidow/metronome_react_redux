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
    //const submitButton = getSubmitButton({domNode});
    const form = getElementBySelector({domNode, selector: '.beat'});

    rhInputField.setAttribute("value", String(rh));
    simulate.blur(rhInputField);

    lhInputField.setAttribute("value", String(lh));
    simulate.blur(lhInputField);

    //simulate.click(submitButton);

    simulate.submit(form);

    //rhInputField.simulate('change', { target: { value: String(rh) } });
    //rhInputField.simulate('change', { target: { value: String(lh) } });
    //form.simulate('submit');

    const actual = store.getState().beat;
    const expected = {rh, lh};

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});
