import {range} from 'lodash';
import {calc_tickCount} from 'models/beat';

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

export {calc_tickDuration, calc_tickStartTimeOffsets};
