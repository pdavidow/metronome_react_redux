import {lcm} from 'mathjs';

const tickCountFunc = ({rh, lh}) => lcm(rh, lh);

const tickIndicesFunc = ({focus}, beat) => {
  const noteCount = beat[focus];
  const myTickCount = tickCountFunc(beat);
  const interval = myTickCount / noteCount;
  const indicies = [];
  let index = 0;

  while (index < myTickCount) {
    indicies.push(index);
    index += interval;
  }
  return indicies;
};

const rhTickIndicesFunc = (beat = {rh:1, lh:1}) => tickIndicesFunc({focus: 'rh'}, beat);
const lhTickIndicesFunc = (beat = {rh:1, lh:1}) => tickIndicesFunc({focus: 'lh'}, beat);

export {tickCountFunc, rhTickIndicesFunc, lhTickIndicesFunc};
