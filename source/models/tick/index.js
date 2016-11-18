// mutually exclusive
const isTick_Rh = ({isRh, isLh}) => isRh && !isLh;
const isTick_Lh = ({isRh, isLh}) => !isRh && isLh;
const isTick_RhLh = ({isRh, isLh}) => isRh && isLh;
const isTick_Background = ({isRh, isLh}) => !isRh && !isLh;

export {
  isTick_Rh,
  isTick_Lh,
  isTick_RhLh,
  isTick_Background
}
