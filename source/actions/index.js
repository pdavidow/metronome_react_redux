import {
  SET_BEAT,
  SET_METRONOME_SETTING,
  SET_IS_PLAYING,
  SET_PLAYER_SETTING,
  INCREMENT_LOOP_COUNT
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

export const incrementLoopCount = () => {
  return {
    type: INCREMENT_LOOP_COUNT,
    payload: {}
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
