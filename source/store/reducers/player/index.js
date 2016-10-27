import {
  SET_IS_PLAYING,
  INCREMENT_LOOP_COUNT
} from '../../../constants/actionTypes';
////////////////////////////////////

const defaultState = {
  isPlaying: false,
  loopCount: 0
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
    default: return state;
  }
};
