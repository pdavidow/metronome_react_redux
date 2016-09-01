import {lcm} from 'mathjs';

const tickCount = ({rh, lh}) => lcm(rh, lh);

const tickIndices = ({focus}, beat) => {
  const noteCount = beat[focus];
  const myTickCount = tickCount(beat);
  const interval = myTickCount / noteCount;
  const indicies = [];
  let index = 0;

  while (index < myTickCount) {
    indicies.push(index);
    index += interval;
  }
  return indicies;
};

const rhTickIndices = (beat = {rh:1, lh:1}) => tickIndices({focus: 'rh'}, beat);
const lhTickIndices = (beat = {rh:1, lh:1}) => tickIndices({focus: 'lh'}, beat);

export {tickCount, rhTickIndices, lhTickIndices};
