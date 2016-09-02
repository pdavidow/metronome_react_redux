import {lcm} from 'mathjs';

const calc_tickCount = ({rh, lh}) => lcm(rh, lh);

const calc_tickIndices = ({focus} = 'rh', beat = {rh:1, lh:1}) => {
  const noteCount = beat[focus];
  const tickCount = calc_tickCount(beat);
  const interval = tickCount / noteCount;
  const indicies = [];
  let index = 0;

  while (index < tickCount) {
    indicies.push(index);
    index += interval;
  }
  return indicies;
};

const calc_rhTickIndices = (beat = {rh:1, lh:1}) => calc_tickIndices({focus: 'rh'}, beat);
const calc_lhTickIndices = (beat = {rh:1, lh:1}) => calc_tickIndices({focus: 'lh'}, beat);

export {calc_tickCount, calc_rhTickIndices, calc_lhTickIndices};
