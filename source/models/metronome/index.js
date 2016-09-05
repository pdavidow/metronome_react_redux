import {includes, range} from 'lodash';
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

const calc_tickDuration = ({
  beat = {rh: 1, lh: 1},
  classicTicksPerMinute = 1,
  classicTicksPerBeat = 1
}) => {
    const tickCount = calc_tickCount(beat);
    const ticksPerSec = calc_ticksPerSec({classicTicksPerMinute});

    return classicTicksPerBeat / (tickCount * ticksPerSec);
};

const calc_tickStartTimeOffsets = ({
  beat = {rh: 1, lh: 1},
  classicTicksPerMinute = 1,
  classicTicksPerBeat = 1
}) => {
  const tickDuration = calc_tickDuration({
    beat,
    classicTicksPerMinute,
    classicTicksPerBeat
  });
  const tickCount = calc_tickCount(beat);
  let offset = 0;

  return range(tickCount).map(() => {
    const result = offset;
    offset += tickDuration;
    return result;
  });
};

const calc_ticksPerSec = ({
  classicTicksPerMinute = 1
}) => classicTicksPerMinute / 60;

const calc_ticks = ({
  beat = {rh: 1, lh: 1},
  classicTicksPerMinute = 1,
  classicTicksPerBeat = 1
}) => {
  const tickStartTimeOffsets = calc_tickStartTimeOffsets({
    beat,
    classicTicksPerMinute,
    classicTicksPerBeat
  });
  const rhTickIndices = calc_rhTickIndices(beat);
  const lhTickIndices = calc_lhTickIndices(beat);

  const callback = (startOffset, index) => {
    const isRH = includes(rhTickIndices, index);
    const isLH = includes(lhTickIndices, index);

    return {
      isRH,
      isLH,
      startOffset
    };
  };

  return tickStartTimeOffsets.map(callback);
};

const calc_filteredTicks = ({
  beat = {rh: 1, lh: 1},
  classicTicksPerMinute = 1,
  classicTicksPerBeat = 1,
  filter = ()=>true
}) => {
  const ticks = calc_ticks({
    beat,
    classicTicksPerMinute,
    classicTicksPerBeat
  });

  return ticks.filter(filter);
};

const calc_rhTicks = ({
  beat = {rh: 1, lh: 1},
  classicTicksPerMinute = 1,
  classicTicksPerBeat = 1
}) => {
  const filter = (each) => each.isRH;

  return calc_filteredTicks({
    beat,
    classicTicksPerMinute,
    classicTicksPerBeat,
    filter
  });
};

const calc_lhTicks = ({
  beat = {rh: 1, lh: 1},
  classicTicksPerMinute = 1,
  classicTicksPerBeat = 1
}) => {
  const filter = (each) => each.isLH;

  return calc_filteredTicks({
    beat,
    classicTicksPerMinute,
    classicTicksPerBeat,
    filter
  });
};

const calc_rhOrLhTicks = ({
  beat = {rh: 1, lh: 1},
  classicTicksPerMinute = 1,
  classicTicksPerBeat = 1
}) => {
  const filter = (each) => each.isRH || each.isLH;

  return calc_filteredTicks({
    beat,
    classicTicksPerMinute,
    classicTicksPerBeat,
    filter
  });
};

export {
  calc_tickCount,
  calc_rhTickIndices,
  calc_lhTickIndices,
  calc_tickDuration,
  calc_tickStartTimeOffsets,
  calc_ticks,
  calc_rhTicks,
  calc_lhTicks,
  calc_rhOrLhTicks
};
