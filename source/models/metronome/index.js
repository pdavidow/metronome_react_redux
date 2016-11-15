import {
  flatMap,
  includes,
  last,
  range
} from 'lodash';
import {lcm} from 'mathjs';

import {
  playTicks,
  stopTicks
} from '../audio';
import {TickCountVsClassicTicksPerBeatError} from '../../exceptions';
////////////////////////////////////

let isStopped = true;

const calc_tickCount = ({
  beat = {rh: 1, lh: 1}
} = {}) => {
  const {rh, lh} = beat;
  return lcm(rh, lh);
};

const calc_tickIndices = ({
  focus = 'rh',
  beat = {rh: 1, lh: 1}
} = {}) => {
  const noteCount = beat[focus];
  const tickCount = calc_tickCount({beat});
  const interval = tickCount / noteCount;
  const indicies = [];
  let index = 0;

  while (index < tickCount) {
    indicies.push(index);
    index += interval;
  }
  return indicies;
};

const calc_rhTickIndices = ({
  beat = {rh: 1, lh: 1}
} = {}) => calc_tickIndices({focus: 'rh', beat});

const calc_lhTickIndices = ({
  beat = {rh: 1, lh: 1}
} = {}) => calc_tickIndices({focus: 'lh', beat});

const calc_beatDuration = ({metronomeSetting}) => {
  const {classicTicksPerMinute, classicTicksPerBeat} = metronomeSetting;
  const ticksPerSec = calc_ticksPerSec({classicTicksPerMinute});

  return classicTicksPerBeat / ticksPerSec; // sec
};

const calc_tickDuration = ({
  beat = {rh: 1, lh: 1},
  metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1}
} = {}) => {
  const tickCount = calc_tickCount({beat});
  const beatDuration = calc_beatDuration({metronomeSetting});

  return beatDuration / tickCount; // sec
};

const calc_ticksPerSec = ({
  classicTicksPerMinute = 1
} = {}) => classicTicksPerMinute / 60;

const calc_tickStartTimeOffsets = ({
  tickCount = 1,
  tickDuration = 1
} = {}) => {
  let offset = 0;

  return range(tickCount).map(() => {
    const result = offset;
    offset += tickDuration;
    return result;
  });
};

const calc_shiftedTickStartTimeOffsets = ({tickCount, tickDuration, shiftAmount}) => {
  const offsets = calc_tickStartTimeOffsets({tickCount, tickDuration});
  return offsets.map((offset) => offset += shiftAmount);
};

const calc_baseTicksForBeats = ({
  beats = [],
  metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1}
} = {}) => {
  const beatDuration = calc_beatDuration({metronomeSetting});

  return flatMap(beats, ((beat, beatIndex) => {
    const shiftAmount = beatDuration * beatIndex;
    return calc_baseTicksForBeat({beat, beatIndex, metronomeSetting, shiftAmount});
  }));
};

const validateTickCountWithClassicTicksPerBeat = ({tickCount, classicTicksPerBeat, beatIndex}) => {
  if (tickCount%classicTicksPerBeat != 0) throw new TickCountVsClassicTicksPerBeatError({beatIndex, tickCount, classicTicksPerBeat});
};

const calc_baseTicksForBeat = ({
  beat = {rh: 1, lh: 1},
  beatIndex = 0,
  metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1},
  shiftAmount = 0
} = {}) => {
  const {classicTicksPerBeat} = metronomeSetting;
  const tickCount = calc_tickCount({beat});
  validateTickCountWithClassicTicksPerBeat({tickCount, classicTicksPerBeat, beatIndex});

  const tickDuration = calc_tickDuration({beat, metronomeSetting});
  const startOffsets = calc_shiftedTickStartTimeOffsets({tickCount, tickDuration, shiftAmount});

  const tick = ({startOffset, index, rhTickIndices, lhTickIndices}) => {
    const isRH = includes(rhTickIndices, index);
    const isLH = includes(lhTickIndices, index);
    return {isRH, isLH, startOffset, duration: tickDuration};
  };

  return startOffsets.map((startOffset, index) => {
    const rhTickIndices = calc_rhTickIndices({beat});
    const lhTickIndices = calc_lhTickIndices({beat});
    return tick({startOffset, index, rhTickIndices, lhTickIndices});
  });
};

const spacerize = ({tick, onSpaceEnded}) => {
  if (!tick) return;
  const extra = {isSpacer: true};
  if (onSpaceEnded != undefined) extra.spaceOnEnded = onSpaceEnded;
  Object.assign(tick, extra);
};

const calc_ticks = ({
  beats = [{rh: 1, lh: 1}],
  metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1},
  onTicksEnded
} = {}) => {
  const ticks = calc_baseTicksForBeats({beats, metronomeSetting});
  spacerize({tick: last(ticks), onSpaceEnded: onTicksEnded});
  return ticks;
};

const addTicks = ({ticks, beats, metronomeSetting, onTicksEnded}) => {
  const contents = calc_ticks({beats, metronomeSetting, onTicksEnded});
  Array.prototype.push.apply(ticks, contents);
};

const play = ({
  beats = [{rh: 1, lh: 1}],
  metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1},
  playerSetting = {isLooping: false, isLoopBreak: true},
  onLoopCounting,
  onPlayEnded
} = {}) => {
  const populateTicks = ({ticks, beats, metronomeSetting, onTicksEnded}) => addTicks({ticks, beats, metronomeSetting, onTicksEnded});
  isStopped = false;
  const ticks = [];
  const onTicksEnded = calc_onTicksEnded({ticks, metronomeSetting, playerSetting, onLoopCounting, onPlayEnded});

  populateTicks({ticks, beats, metronomeSetting, onTicksEnded});
  playTicks({ticks});
};

const calc_onTicksEnded = ({ticks, metronomeSetting, playerSetting, onLoopCounting, onPlayEnded}) => {
  const calc_loopBreakTicks = ({ticks, metronomeSetting}) => {
    const {classicTicksPerBeat} = metronomeSetting;
    const loopBreakBeat = {rh: classicTicksPerBeat, lh: classicTicksPerBeat};
    const loopBreakTicks = calc_baseTicksForBeat({beat: loopBreakBeat, metronomeSetting});
    spacerize({tick: last(loopBreakTicks), onSpaceEnded: () => {if (!isStopped) playTicks({ticks})} });

    return loopBreakTicks;
  };

  const {isLooping, isLoopBreak} = playerSetting;
  const loopBreakTicks = isLoopBreak ? calc_loopBreakTicks({ticks, metronomeSetting}) : null;

  return () => {
    if (!isLooping || isStopped) return onPlayEnded();
    onLoopCounting();

    if (isLoopBreak)
      playTicks({ticks: loopBreakTicks});
    else
      playTicks({ticks});
  };
};

const stop = () => {
  isStopped = true;
  stopTicks();
};

export {
  calc_tickCount,
  calc_rhTickIndices,
  calc_lhTickIndices,
  calc_tickDuration,
  calc_tickStartTimeOffsets,
  calc_ticks,
  play,
  stop
};
