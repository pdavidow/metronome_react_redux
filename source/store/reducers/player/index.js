import {SET_IS_PLAYING} from '../../../constants/actionTypes';
////////////////////////////////////

const defaultState = {
  isPlaying: false
};

export default (state = defaultState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    case SET_IS_PLAYING: return {...state, ...payload};
    default: return state;
  }
};
