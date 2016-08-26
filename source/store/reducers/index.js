import {SET_BEAT} from 'constants/actionTypes';

export default (state = {rh: 1, lh: 1}, {type, beat} = {}) => {
  switch (type) {
    case SET_BEAT: return {...state, ...beat};
    default: return state;
  }
};
