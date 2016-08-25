import {SET_BEAT} from 'constants/actionTypes';

export const setBeat = (rh, lh) => {
  return {
    type: SET_BEAT,
    rh: rh,
    lh: lh
  };
};
