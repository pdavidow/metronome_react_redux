import {SET_BEAT} from '__mySource/constants/actionTypes';

const defaultState = {
  rh: 1,
  lh: 1
};

export default (state = defaultState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    case SET_BEAT: return {...state, ...payload};
    default: return state;
  }
};
