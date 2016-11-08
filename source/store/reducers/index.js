import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import beatsReducer from './beats';
import metronomeSettingReducer from './metronomeSetting';
import playerReducer from './player';
import playerSettingReducer from './playerSetting';
////////////////////////////////////

const reducers = {
  beats: beatsReducer,
  metronomeSetting: metronomeSettingReducer,
  player: playerReducer,
  playerSetting: playerSettingReducer,
  form: formReducer
};

export default combineReducers(reducers);
