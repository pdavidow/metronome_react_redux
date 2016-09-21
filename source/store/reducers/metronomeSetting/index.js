import {SET_METRONOME_SETTING} from '../../../constants/actionTypes';
////////////////////////////////////

const defaultState = {
  classicTicksPerMinute: 60,
  classicTicksPerBeat: 1
};

export default (state = defaultState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    case SET_METRONOME_SETTING: return {...state, ...payload};
    default: return state;
  }
};
