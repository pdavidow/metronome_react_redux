import {
  SET_IS_PLAYING,
  INCREMENT_LOOP_COUNT,
  RESET_LOOP_COUNT,
  SET_IS_TAKING_LOOP_BREAK
} from '../../../constants/actionTypes';
////////////////////////////////////

const defaultLoopCount = 1;

const defaultState = {
  isPlaying: false,
  loopCount: defaultLoopCount,
  isTakingLoopBreak: false
};

export default (state = defaultState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    case SET_IS_PLAYING: return {...state, ...payload};
    case INCREMENT_LOOP_COUNT: {
      let loopCount = state.loopCount;
      loopCount++;
      return {...state, loopCount};
    };
    case RESET_LOOP_COUNT: {
      const loopCount = defaultLoopCount;
      return {...state, loopCount};
    };
    case SET_IS_TAKING_LOOP_BREAK: return {...state, ...payload};
    default: return state;
  }
};
