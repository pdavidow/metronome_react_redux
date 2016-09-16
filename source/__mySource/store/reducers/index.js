import {combineReducers} from 'redux';
import beatReducer from './beat';

const reducers = {
  beat: beatReducer,
};

export default combineReducers(reducers);
