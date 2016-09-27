import {SET_PLAYER} from '../../../constants/actionTypes';
////////////////////////////////////

const defaultState = {
  isPlaying: false
};

export default (state = defaultState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    case SET_PLAYER: return {...state, ...payload};
    default: return state;
  }
};
