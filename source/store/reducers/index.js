import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import beatsReducer from './beats';
import metronomeSettingReducer from './metronomeSetting';
import playerReducer from './player';
import playerSettingReducer from './playerSetting';
import userInterfaceSettingReducer from './userInterfaceSetting';
////////////////////////////////////

const reducers = {
  beats: beatsReducer,
  metronomeSetting: metronomeSettingReducer,
  player: playerReducer,
  playerSetting: playerSettingReducer,
  userInterfaceSetting: userInterfaceSettingReducer,
  form: formReducer
};

export default combineReducers(reducers);
