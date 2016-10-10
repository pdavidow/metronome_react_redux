import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {renderIntoDocument} from 'react-addons-test-utils';
import reactDom from 'react-dom';

import createApp from '../../../App';
import combinedReducers from '../../../store/reducers';
import {
  setBeat,
  setMetronomeSetting
} from '../../../actions';
////////////////////////////////////

const defaultStore = () => createStore(combinedReducers);

const setStore = ({
  store = defaultStore(),
  beat,
  metronomeSetting
}) => {
  const newStore = {...store};
  newStore.dispatch(setBeat({...beat}));
  newStore.dispatch(setMetronomeSetting({...metronomeSetting}));
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

const audioTest = ({audioContext, oscillator}) => {
  // if (production) return false; // todo

  let test;

  const doIt = (myTest, {audioContext, oscillator}) => {
    myTest({audioContext, oscillator});
    return true;
  };
//todo refactor: embeddedAudioTest keysDo...
  if (test = embeddedAudioTest.playButtonStartsAudio) return doIt(test, {audioContext, oscillator});
  if (test = embeddedAudioTest.stopButtonStopsAudio) return doIt(test, {audioContext, oscillator});
  if (test = embeddedAudioTest.playButtonDisabledDuringPlay) return doIt(test, {audioContext, oscillator});
  if (test = embeddedAudioTest.playButtonEnabledAfterPlay) return doIt(test, {audioContext, oscillator});
  if (test = embeddedAudioTest.stopButtonEnabledDuringPlay) return doIt(test, {audioContext, oscillator});
  if (test = embeddedAudioTest.stopButtonDisabledAfterPlay) return doIt(test, {audioContext, oscillator});
  if (test = embeddedAudioTest.playButtonReenableMidplay) return doIt(test, {audioContext, oscillator});

  return false
};

export {
  getDomNode,
  getElementBySelector,
  defaultStore,
  setStore,
  waitInAudioTime,
  embeddedAudioTest,
  audioTest
};
