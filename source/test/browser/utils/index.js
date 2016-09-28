import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {renderIntoDocument} from 'react-addons-test-utils';
import reactDom from 'react-dom';

import createMetronomeContainer from '../../../containers/metronome';
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
  const MetronomeContainer = createMetronomeContainer(React);

  const element =
    <Provider store={store}>
      <div>
        <MetronomeContainer />
      </div>
    </Provider>;

  const renderedComp = renderIntoDocument(element);
  return reactDom.findDOMNode(renderedComp);
};

export {
  getDomNode,
  defaultStore,
  setStore
};
