import {
  SET_IS_PLAYING,
  SET_IS_LOOPING
} from '../../../constants/actionTypes';
////////////////////////////////////

const defaultState = {
  isPlaying: false,
  isLooping: false
};

export default (state = defaultState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    case SET_IS_PLAYING: return {...state, ...payload};
    case SET_IS_LOOPING: return {...state, ...payload};
    default: return state;
  }
};
