import {combineReducers} from 'redux';

import beatReducer from './beat';
import metronomeSettingReducer from './metronomeSetting';
////////////////////////////////////

const reducers = {
  beat: beatReducer,
  metronomeSetting: metronomeSettingReducer
};

export default combineReducers(reducers);
