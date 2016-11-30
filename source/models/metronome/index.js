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
import {
  TickCountVsClassicTicksPerBeat_Error,
  BeatRhLhPositiveInt_Error,
  MetronomeSettingPositiveInt_Error
} from '../../exceptions';
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
  if (tickCount%classicTicksPerBeat != 0) throw new TickCountVsClassicTicksPerBeat_Error({beatIndex, tickCount, classicTicksPerBeat});
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
    const isRh = includes(rhTickIndices, index);
    const isLh = includes(lhTickIndices, index);
    return {isRh, isLh, startOffset, duration: tickDuration};
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
  if (onSpaceEnded != undefined) extra.onSpaceEnded = onSpaceEnded;
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

const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;

const validateBeatData = ({beats}) => {
  beats.forEach((beat, beatIndex) => {
    const {rh, lh} = beat;
    if (!isPositiveInteger(rh) || !isPositiveInteger(lh))
      throw new BeatRhLhPositiveInt_Error({beatIndex});
  });
};

const validateMetronomeSettingData = ({metronomeSetting}) => {
  const {classicTicksPerMinute, classicTicksPerBeat} = metronomeSetting;
  if (!isPositiveInteger(classicTicksPerMinute) || !isPositiveInteger(classicTicksPerBeat))
    throw new MetronomeSettingPositiveInt_Error();
};

const play = ({
  beats = [{rh: 1, lh: 1}],
  metronomeSetting = {classicTicksPerMinute: 60, classicTicksPerBeat: 1},
  playerSetting = {isLooping: false, isLoopBreak: true},
  onLoopCounting,
  onStartTakingLoopBreak,
  onEndTakingLoopBreak,
  onPlayEnded
} = {}) => {
  validateBeatData({beats});
  validateMetronomeSettingData({metronomeSetting});

  const populateTicks = ({ticks, beats, metronomeSetting, onTicksEnded}) => addTicks({ticks, beats, metronomeSetting, onTicksEnded});
  isStopped = false;
  const ticks = [];
  const onTicksEnded = calc_onTicksEnded({ticks, metronomeSetting, playerSetting, onLoopCounting, onStartTakingLoopBreak, onEndTakingLoopBreak, onPlayEnded});

  populateTicks({ticks, beats, metronomeSetting, onTicksEnded});
  playTicks({ticks});
};

const calc_onTicksEnded = ({ticks, metronomeSetting, playerSetting, onLoopCounting, onStartTakingLoopBreak, onEndTakingLoopBreak, onPlayEnded}) => {
  const calc_breakTicksFollowedByTicks = ({ticks, metronomeSetting}) => {
    const {classicTicksPerBeat} = metronomeSetting;
    const breakBeat = {rh: classicTicksPerBeat, lh: classicTicksPerBeat};
    const breakTicks = calc_baseTicksForBeat({beat: breakBeat, metronomeSetting});
    const onSpaceEnded  = () => {
      onEndTakingLoopBreak();
      if (!isStopped) {
        onLoopCounting();
        playTicks({ticks});
      };
    };
    spacerize({tick: last(breakTicks), onSpaceEnded});
    return breakTicks;
  };

  const {isLooping, isLoopBreak} = playerSetting;
  const breakTicksFollowedByTicks = isLoopBreak ? calc_breakTicksFollowedByTicks({ticks, metronomeSetting}) : null;

  return () => {
    if (!isLooping || isStopped) return onPlayEnded();

    if (isLoopBreak) {
      onStartTakingLoopBreak();
      playTicks({ticks: breakTicksFollowedByTicks});
    } else {
      onLoopCounting();
      playTicks({ticks});
    };
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
