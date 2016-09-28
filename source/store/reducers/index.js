import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'

import beatReducer from './beat';
import metronomeSettingReducer from './metronomeSetting';
import playerReducer from './player';
////////////////////////////////////

const reducers = {
  beat: beatReducer,
  metronomeSetting: metronomeSettingReducer,
  player: playerReducer,
  form: formReducer
};

export default combineReducers(reducers);
