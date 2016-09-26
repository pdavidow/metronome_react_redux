import {combineReducers} from 'redux';

import beatReducer from './beat';
import metronomeSettingReducer from './metronomeSetting';
import playerReducer from './player';
////////////////////////////////////

const reducers = {
  beat: beatReducer,
  metronomeSetting: metronomeSettingReducer,
  player: playerReducer
};

export default combineReducers(reducers);
