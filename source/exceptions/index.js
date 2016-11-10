import ErrorSubclass from 'error-subclass';
////////////////////////////////////

class TickCountVsClassicTicksPerBeatError extends ErrorSubclass {
  constructor({beatIndex}) {
    const message = `Beat #${beatIndex + 1}: Tick count must be cleanly divisible by Classic Ticks Per Beat`;
    super(message);
    this.beatIndex = beatIndex;
  }
};

export {TickCountVsClassicTicksPerBeatError};
