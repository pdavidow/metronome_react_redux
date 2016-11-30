import ErrorSubclass from 'error-subclass';
////////////////////////////////////

class TickCountVsClassicTicksPerBeat_Error extends ErrorSubclass {
  constructor({beatIndex, tickCount, classicTicksPerBeat}) {
    const message = `Beat #${beatIndex + 1}: Tick count of ${tickCount} is not cleanly divisible by Classic Ticks Per Beat of ${classicTicksPerBeat}`;
    super(message);
    Object.assign(this, {beatIndex, tickCount, classicTicksPerBeat});
  }
};

class BeatRhLhPositiveInt_Error extends ErrorSubclass {
  constructor({beatIndex}) {
    const message = `Beat #${beatIndex + 1}: Right/Left Hand note counts must be positive integers`;
    super(message);
    Object.assign(this, {beatIndex});
  }
};

export {
  TickCountVsClassicTicksPerBeat_Error,
  BeatRhLhPositiveInt_Error
};
