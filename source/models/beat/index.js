import {lcm} from 'mathjs';

const tickCount = ({rh, lh}) => lcm(rh, lh);

const tickIndices = ({noteCount}, {rh, lh}) => {
  const myTickCount = tickCount({rh, lh});
  const interval = myTickCount / noteCount;
  const indicies = [];
  let index = 0;

  while (index < myTickCount) {
    indicies.push(index);
    index += interval;
  }
  return indicies;
};

// todo simplify, DRY
const rhTickIndices = ({rh, lh}) => tickIndices({noteCount: rh}, {rh, lh});
const lhTickIndices = ({rh, lh}) => tickIndices({noteCount: lh}, {rh, lh});

export {tickCount, rhTickIndices, lhTickIndices};
