import {
  SET_PLAYER_SETTING
} from '../../../constants/actionTypes';
////////////////////////////////////

const defaultState = {
  isLooping: false
};

export default (state = defaultState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    default: return state;
    case SET_PLAYER_SETTING: return {...state, ...payload};
  }
};
