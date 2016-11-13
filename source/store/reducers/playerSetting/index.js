import {
  SET_IS_LOOPING,
  SET_IS_LOOP_BREAK
} from '../../../constants/actionTypes';
////////////////////////////////////

const defaultState = {
  isLooping: false,
  isLoopBreak: true
};

export default (state = defaultState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    case SET_IS_LOOPING: return {...state, ...payload};
    case SET_IS_LOOP_BREAK: return {...state, ...payload};
    default: return state;
  }
};
