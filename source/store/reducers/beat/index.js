import {SET_RH, SET_LH} from 'constants/actionTypes';

export default (
  state = {rh: 0, lh: 0}, {type, value} = {}
) => {
  switch (type) {
    case SET_RH: return {...state, rh: value};
    case SET_LH: return {...state, lh: value};
    default: return state;
  }
};

