import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import createApp from './App';
import combinedReducers from './store/reducers';
////////////////////////////////////

const App = createApp(React);
const store = createStore(combinedReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const rootEl = document.getElementById('root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);
