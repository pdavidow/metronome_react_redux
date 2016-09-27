// mutually exclusive

const isTick_Rh = ({isRH, isLH}) => isRH && !isLH;
const isTick_Lh = ({isRH, isLH}) => !isRH && isLH;
const isTick_RhLh = ({isRH, isLH}) => isRH && isLH;
const isTick_Background = ({isRH, isLH}) => !isRH && !isLH;

export {
  isTick_Rh,
  isTick_Lh,
  isTick_RhLh,
  isTick_Background
}
