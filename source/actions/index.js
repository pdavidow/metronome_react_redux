import {
  SET_BEAT,
  SET_METRONOME_SETTING,
  SET_PLAYER
} from '../constants/actionTypes';
////////////////////////////////////

export const setBeat = ({rh, lh}) => {
  return {
    type: SET_BEAT,
    payload: {
      rh,
      lh}
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

export const setPlayer = ({isPlaying}) => {
  return {
    type: SET_PLAYER,
    payload: {
      isPlaying
    }
  };
};

