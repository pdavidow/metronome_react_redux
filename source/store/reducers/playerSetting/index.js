import {
  SET_IS_LOOPING
} from '../../../constants/actionTypes';
////////////////////////////////////

const defaultState = {
  isLooping: false
};

export default (state = defaultState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    default: return state;
    case SET_IS_LOOPING: return {...state, ...payload};
  }
};
