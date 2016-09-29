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

export {
  getDomNode,
  getElementBySelector,
  defaultStore,
  setStore
};
