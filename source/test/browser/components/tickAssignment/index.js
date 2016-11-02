import test from 'tape';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined

import {
  getDomNode,
  getElementBySelector,
  setStore} from '../../utils';
////////////////////////////////////

const getTickCountLabel = ({domNode}) => getElementBySelector({domNode, selector: '#tickCountLabel'});
const getRhIndiciesLabel = ({domNode}) => getElementBySelector({domNode, selector: '#rhIndiciesLabel'});
const getLhIndiciesLabel = ({domNode}) => getElementBySelector({domNode, selector: '#lhIndiciesLabel'});

test('TickAssignment component', nestOuter => {
  nestOuter.test('...Should show tick-count, and rh, lh indices', assert => {
    const msg = 'Should show tick-count 6, and rh indicies [0,3], lh indicies [0,2,4]';

    const beat = {rh: 2, lh: 3};
    const store = setStore({beat});
    const domNode = getDomNode({store});

    const actual = {
      tickCountString: getTickCountLabel({domNode}).innerText,
      rhIndiciesString: getRhIndiciesLabel({domNode}).innerText,
      lhIndiciesString: getLhIndiciesLabel({domNode}).innerText
    };

    const expected = {
      tickCountString: 'Tick Count: 6',
      rhIndiciesString: 'Right-Hand Indices: 0,3',
      lhIndiciesString: 'Left-Hand Indices: 0,2,4'
  };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});
