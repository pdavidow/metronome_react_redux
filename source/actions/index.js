import {SET_BEAT} from '../constants/actionTypes';
import {SET_METRONOME_SETTING} from '../constants/actionTypes';
////////////////////////////////////

export const setBeat = ({rh, lh}) => {
  return {
    type: SET_BEAT,
    payload: {rh, lh}
  };
};

export const setMetronomeSetting = ({classicTicksPerMinute, classicTicksPerBeat}) => {
  return {
    type: SET_METRONOME_SETTING,
    payload: {
      classicTicksPerMinute,
      classicTicksPerBeat
    }
  };
};
