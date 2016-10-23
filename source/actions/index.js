import {
  SET_BEAT,
  SET_METRONOME_SETTING,
  SET_IS_PLAYING,
  SET_PLAYER_SETTING
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

export const setIsPlaying = ({isPlaying}) => {
  return {
    type: SET_IS_PLAYING,
    payload: {
      isPlaying
    }
  };
};

export const setPlayerSetting = ({isLooping}) => {
  return {
    type: SET_PLAYER_SETTING,
    payload: {
      isLooping
    }
  };
};
