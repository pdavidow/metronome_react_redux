import {SET_BEAT} from 'constants/actionTypes';

export default (state = {rh: 0, lh: 0}, action) => {
  switch (type) {
    case SET_BEAT: return {...state, ...action};
    default: return state;
  }
};
