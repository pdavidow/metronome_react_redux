import {
  SET_IS_PLAYING,
  INCREMENT_LOOP_COUNT,
  RESET_LOOP_COUNT,
  SET_IS_TAKING_LOOP_BREAK,
  SET_PLAY_ALERT,
  CANCEL_PLAY_ALERT
} from '../../../constants/actionTypes';
////////////////////////////////////

const defaultLoopCount = 1;
const defaultPlayAlert = null;

const defaultState = {
  isPlaying: false,
  loopCount: defaultLoopCount,
  isTakingLoopBreak: false,
  playAlert: defaultPlayAlert
};

export default (state = defaultState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    case INCREMENT_LOOP_COUNT: {
      let loopCount = state.loopCount;
      loopCount++;
      return {...state, loopCount};
    };

    case RESET_LOOP_COUNT: {
      return {...state, loopCount: defaultLoopCount};
    };

    case CANCEL_PLAY_ALERT: {
      return {...state, playAlert: defaultPlayAlert};
    };

    case SET_IS_PLAYING:
    case SET_IS_TAKING_LOOP_BREAK:
    case SET_PLAY_ALERT:
      return {...state, ...payload};

    default: return state;
  }
};
