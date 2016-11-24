import {
  SET_BEATS,
  SET_METRONOME_SETTING,
  SET_IS_LOOP_BREAK,
  SET_IS_PLAYING,
  SET_IS_LOOPING,
  INCREMENT_LOOP_COUNT,
  RESET_LOOP_COUNT,
  SET_IS_TAKING_LOOP_BREAK
} from '../constants/actionTypes';
////////////////////////////////////

export const setBeats = (beats) => {
  return {
      type: SET_BEATS,
      payload: beats
  };
};

export const setMetronomeSetting = ({classicTicksPerMinute, classicTicksPerBeat}) => {
  return {
    type: SET_METRONOME_SETTING,
    payload: {classicTicksPerMinute, classicTicksPerBeat}
  };
};

export const setIsPlaying = ({isPlaying}) => {
  return {
    type: SET_IS_PLAYING,
    payload: {isPlaying}
  };
};

export const incrementLoopCount = () => {
  return {
    type: INCREMENT_LOOP_COUNT,
    payload: {}
  };
};

export const resetLoopCount = () => {
  return {
    type: RESET_LOOP_COUNT,
    payload: {}
  };
};

export const setIsLooping = ({isLooping}) => {
  return {
    type: SET_IS_LOOPING,
    payload: {isLooping}
  };
};

export const setIsLoopBreak = ({isLoopBreak}) => {
  return {
    type: SET_IS_LOOP_BREAK,
    payload: {isLoopBreak}
  };
};

export const setIsTakingLoopBreak = ({isTakingLoopBreak}) => {
  return {
    type: SET_IS_TAKING_LOOP_BREAK,
    payload: {isTakingLoopBreak}
  };
};
