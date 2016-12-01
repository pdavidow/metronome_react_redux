import test from 'tape';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import {Simulate as simulate} from 'react-addons-test-utils';

import {
  getDomNode,
  getElementBySelector,
  defaultStore
} from '../../utils';
////////////////////////////////////

const getClassicTicksPerMinuteInputField = ({domNode}) => getElementBySelector({domNode, selector: '#classicTicksPerMinuteInputField'});
const getClassicTicksPerBeatInputField = ({domNode}) => getElementBySelector({domNode, selector: '#classicTicksPerBeatInputField'});
const getForm = ({domNode}) => getElementBySelector({domNode, selector: '.metronomeSetting'});

test('MetronomeSetting component', nestOuter => {
  nestOuter.test('...Should set metronomeSetting state upon submit', assert => {
    const msg = 'Should set {classicTicksPerMinute: 120, classicTicksPerBeat: 4}';

    const classicTicksPerMinute = 120;
    const classicTicksPerBeat = 4;

    const store = defaultStore();
    const domNode = getDomNode({store});

    const classicTicksPerMinuteInputField = getClassicTicksPerMinuteInputField({domNode});
    const classicTicksPerBeatInputField = getClassicTicksPerBeatInputField({domNode});
    const form = getForm({domNode});

    simulate.change(classicTicksPerMinuteInputField, {target: {value: classicTicksPerMinute}});
    simulate.change(classicTicksPerBeatInputField, {target: {value: classicTicksPerBeat}});
    simulate.submit(form);

    const actual = store.getState().metronomeSetting;
    const expected = {classicTicksPerMinute, classicTicksPerBeat};

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});
