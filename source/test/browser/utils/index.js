import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {renderIntoDocument} from 'react-addons-test-utils';
import reactDom from 'react-dom';
import {forOwn} from 'lodash';

import createApp from '../../../App';
import combinedReducers from '../../../store/reducers';
import {
  setBeats,
  setMetronomeSetting,
  setIsLooping,
  setIsLoopBreak
} from '../../../actions';
////////////////////////////////////

const defaultStore = () => createStore(combinedReducers);

const setStore = ({
  store = defaultStore(),
  beats,
  metronomeSetting,
  isLooping = false,
  isLoopBreak = false
}) => {
  const newStore = {...store};
  if (beats != undefined) newStore.dispatch(setBeats(beats));
  if (metronomeSetting != undefined) newStore.dispatch(setMetronomeSetting({...metronomeSetting}));
  if (isLooping != undefined) newStore.dispatch(setIsLooping({isLooping}));
  if (isLoopBreak != undefined) newStore.dispatch(setIsLoopBreak({isLoopBreak}));
  return newStore;
};

const getDomNode = ({
  store = defaultStore()
} = {}) => {
  const App = createApp(React);

  const element =
    <Provider store={store}>
      <App />
    </Provider>;

  const renderedComp = renderIntoDocument(element);
  return reactDom.findDOMNode(renderedComp);
};

const getElementBySelector = ({domNode, selector}) => domNode.querySelector(selector);

const waitInAudioTime = ({waitTime, audioContext, startTime}) => {
  // all times in seconds
  while ((audioContext.currentTime - startTime) <= waitTime) {/* do nothing */};
};

const embeddedAudioTest = {};
const embeddedAudioTest_playTicks = {};
const embeddedAudioTest_playTick = {};

const audioTest = ({oscillator, startOffset, playDuration, audioContext}) => {
  // if (production) return false; // todo

  let result = false;

  forOwn(embeddedAudioTest, ((test) => { // only one test should be defined at any given time
    if (test) {
      test({audioContext, oscillator, startOffset, playDuration});
      result = true;
      return false; // exit iteration early by explicitly returning false. https://lodash.com/docs/4.16.4#forOwn
    };
  }));

  return result;
};

const audioTest_playTicks = ({ticks, audioContext}) => {
  // if (production) return false; // todo

  forOwn(embeddedAudioTest_playTicks, ((test) => { // only one test should be defined at any given time
    if (test) {
      test({ticks, audioContext});
      return false; // exit iteration early by explicitly returning false. https://lodash.com/docs/4.16.4#forOwn
    };
  }));
};

const audioTest_playTick = ({tick, audioContext}) => {
  // if (production) return false; // todo

  forOwn(embeddedAudioTest_playTick, ((test) => { // only one test should be defined at any given time
    if (test) {
      test({tick, audioContext});
      return false; // exit iteration early by explicitly returning false. https://lodash.com/docs/4.16.4#forOwn
    };
  }));
};

export {
  getDomNode,
  getElementBySelector,
  defaultStore,
  setStore,
  waitInAudioTime,
  embeddedAudioTest,
  embeddedAudioTest_playTicks,
  embeddedAudioTest_playTick,
  audioTest,
  audioTest_playTicks,
  audioTest_playTick
};
