import {TOGGLE_IS_BEAT_PANEL_OPEN} from '../../../constants/actionTypes';
////////////////////////////////////

const defaultState = {
  isBeatPanelOpen: false
};

export default (state = defaultState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    case TOGGLE_IS_BEAT_PANEL_OPEN: {
      let isBeatPanelOpen = !state.isBeatPanelOpen;
      return {...state, isBeatPanelOpen};
    };

    default: return state;
  }
};

