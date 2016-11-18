import {
  isTick_Rh,
  isTick_Lh,
  isTick_RhLh,
  isTick_Background
} from '../tick';

import {
  AUDIO_FREQ_RH,
  AUDIO_FREQ_LH,
  AUDIO_FREQ_RH_LH,
  AUDIO_FREQ_BACKGROUND,
  AUDIO_FREQ_SILENT,

  TICK_DURATION_RH,
  TICK_DURATION_LH,
  TICK_DURATION_RH_LH,
  TICK_DURATION_BACKGROUND
} from '../../constants/audio';

const oscillatorForTick = ({tick, audioContext}) => {
  if (isTick_Rh({...tick})) return oscillator_Rh({audioContext});
  if (isTick_Lh({...tick})) return oscillator_Lh({audioContext});
  if (isTick_RhLh({...tick})) return oscillator_RhLh({audioContext});
  if (isTick_Background({...tick})) return oscillator_Background({audioContext});
};

const playDurationForTick = ({tick}) => {
  if (isTick_Rh({...tick})) return TICK_DURATION_RH;
  if (isTick_Lh({...tick})) return TICK_DURATION_LH;
  if (isTick_RhLh({...tick})) return TICK_DURATION_RH_LH;
  if (isTick_Background({...tick})) return TICK_DURATION_BACKGROUND;
};

const oscillator_Rh         = ({audioContext}) => oscillator({freq: AUDIO_FREQ_RH, audioContext});
const oscillator_Lh         = ({audioContext}) => oscillator({freq: AUDIO_FREQ_LH, audioContext});
const oscillator_RhLh       = ({audioContext}) => oscillator({freq: AUDIO_FREQ_RH_LH, audioContext});
const oscillator_Background = ({audioContext}) => oscillator({freq: AUDIO_FREQ_BACKGROUND, audioContext});
const oscillator_Spacer     = ({audioContext}) => oscillator({freq: AUDIO_FREQ_SILENT, audioContext});

const oscillator = ({
  freq = 0,
  audioContext
} = {}) => {
  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = freq;
  return oscillator;
};

export {
  oscillatorForTick,
  playDurationForTick,
  oscillator_Spacer
};
