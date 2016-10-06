import {
  SET_BEAT,
  SET_METRONOME_SETTING,
  SET_IS_PLAYING,
  SET_IS_LOOPING
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

export const setIsLooping = ({isLooping}) => {
  return {
    type: SET_IS_LOOPING,
    payload: {
      isLooping
    }
  };
};
