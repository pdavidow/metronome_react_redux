import {includes, last, range} from 'lodash';
import {lcm} from 'mathjs';

//import {playTicks} from '__mySource/models/audio'; todo
import {playTicks} from '/home/nitrous/code/mrr/source/__mySource/models/audio';

const calc_tickCount = ({rh = 1, lh = 1} = {}) => lcm(rh, lh);

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
  metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1}
} = {}) => {
  const {classicTicksPerMinute, classicTicksPerBeat} = metronomeSetting;
  const tickCount = calc_tickCount(beat);
  const ticksPerSec = calc_ticksPerSec({classicTicksPerMinute});

  return classicTicksPerBeat / (tickCount * ticksPerSec);
};

const calc_tickStartTimeOffsets = ({
  beat = {rh: 1, lh: 1},
  metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1}
} = {}) => {
  const tickDuration = calc_tickDuration({beat, metronomeSetting});
  const tickCount = calc_tickCount(beat);
  let offset = 0;

  return range(tickCount).map(() => {
    const result = offset;
    offset += tickDuration;
    return result;
  });
};

const calc_ticksPerSec = ({classicTicksPerMinute = 1} = {}) => classicTicksPerMinute / 60;

const calc_ticks = ({
  beat = {rh: 1, lh: 1},
  metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1},
  onEnded
} = {}) => {
  const tickStartTimeOffsets = calc_tickStartTimeOffsets({beat, metronomeSetting});
  const rhTickIndices = calc_rhTickIndices(beat);
  const lhTickIndices = calc_lhTickIndices(beat);

  const tick = (startOffset, index) => {
    const isRH = includes(rhTickIndices, index);
    const isLH = includes(lhTickIndices, index);
    return {isRH, isLH, startOffset};
  };

  const ticks =  tickStartTimeOffsets.map(tick);
  if (onEnded != undefined) last(ticks).onEnded = onEnded;

  return ticks;
};

const play = ({
  beat = {rh: 1, lh: 1},
  metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1},
  onEnded = () => {}
} = {}) => {
  const ticks = calc_ticks({beat, metronomeSetting, onEnded});
  playTicks({ticks});
};

export {
  calc_tickCount,
  calc_rhTickIndices,
  calc_lhTickIndices,
  calc_tickDuration,
  calc_tickStartTimeOffsets,
  calc_ticks,
  play
};
