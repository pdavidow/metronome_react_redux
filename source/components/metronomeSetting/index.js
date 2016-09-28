export default (React) => {
  const PropTypes = React.PropTypes;

  const MetronomeSetting = (props) => {
    MetronomeSetting.propTypes = {
     metronomeSetting: React.PropTypes.shape({
       classicTicksPerMinute: PropTypes.number.isRequired,
       classicTicksPerBeat: PropTypes.number.isRequired
     }),
      onMetronomeSettingSubmit: PropTypes.func.isRequired
    };

    const {metronomeSetting, onMetronomeSettingSubmit} = props;
    const {classicTicksPerMinute, classicTicksPerBeat} = metronomeSetting;

    let input_classicTicksPerMinute, input_classicTicksPerBeat;

    const clearInputs = () => {
      input_classicTicksPerMinute.value = '';
      input_classicTicksPerBeat.value = '';
    };

    const submitButtonAction = () => {
      const new_classicTicksPerMinute = Number(input_classicTicksPerMinute.value);
      const new_classicTicksPerBeat = Number(input_classicTicksPerBeat.value);
      onMetronomeSettingSubmit({classicTicksPerMinute: new_classicTicksPerMinute, classicTicksPerBeat: new_classicTicksPerBeat});
      clearInputs();
    };

    return (
      <div className='metronomeSetting'>
        <h3>MetronomeSetting</h3>
        <label>((waiting for ReduxForm))</label>
        <div className='classicTicksPerMinute'>
          <label>Classic Ticks Per Minute: {classicTicksPerMinute}</label>
          <input
            id="classicTicksPerMinuteInputField"
            type="number"
            min="1"
            ref={node => input_classicTicksPerMinute = node}
          />
        </div>
        <div className='classicTicksPerBeat'>
          <label>Classic Ticks Per Beat: {classicTicksPerBeat}</label>
          <input
            id="classicTicksPerBeatInputField"
            type="number"
            min="1"
            ref={node => input_classicTicksPerBeat = node}
          />
        </div>

        <button type="submit" id="metronomeSettingSubmitButton" onClick={submitButtonAction}>Submit</button>
      </div>
    );
  };

  return MetronomeSetting;
};
