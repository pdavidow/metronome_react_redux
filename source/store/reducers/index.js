import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'

import beatReducer from './beat';
import metronomeSettingReducer from './metronomeSetting';
import playerReducer from './player';
import playerSettingReducer from './playerSetting';
////////////////////////////////////

const reducers = {
  beat: beatReducer,
  metronomeSetting: metronomeSettingReducer,
  player: playerReducer,
  playerSetting: playerSettingReducer,
  form: formReducer
};

export default combineReducers(reducers);
