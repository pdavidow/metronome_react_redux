import {
  SET_IS_PLAYING,
  INCREMENT_LOOP_COUNT,
  RESET_LOOP_COUNT
} from '../../../constants/actionTypes';
////////////////////////////////////

const defaultLoopCount = 0;

const defaultState = {
  isPlaying: false,
  loopCount: defaultLoopCount
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
    default: return state;
  }
};
