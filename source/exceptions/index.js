import ErrorSubclass from 'error-subclass';
////////////////////////////////////

class TickCountVsClassicTicksPerBeatError extends ErrorSubclass {
  constructor({beatIndex, tickCount, classicTicksPerBeat}) {
    const message = `Beat #${beatIndex + 1}: Tick count of ${tickCount} is not cleanly divisible by Classic Ticks Per Beat of ${classicTicksPerBeat}`;
    super(message);
    Object.assign(this, {beatIndex, tickCount, classicTicksPerBeat});
  }
};

export {TickCountVsClassicTicksPerBeatError};
