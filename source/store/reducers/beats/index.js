import {SET_BEATS} from '../../../constants/actionTypes';
////////////////////////////////////

const defaultBeat = {rh: 1, lh: 1};
const defaultState = [defaultBeat];

export default (state = defaultState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    case SET_BEATS: return payload;
    default: return state;
  }
};

export {defaultBeat};
