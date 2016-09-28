export default (React) => {
  const PropTypes = React.PropTypes;

  const Beat = (props) => {
    Beat.propTypes = {
      beat: React.PropTypes.shape({
        rh: PropTypes.number.isRequired,
        lh: PropTypes.number.isRequired
      }),
      onBeatSubmit: PropTypes.func.isRequired
    };
    const {beat, onBeatSubmit} = props;
    const {rh, lh} = beat;

    let input_rh, input_lh;

    const clearInputs = () => {
      input_rh.value = '';
      input_lh.value = '';
    };

    const submitButtonAction = () => {
      const new_rh = Number(input_rh.value);
      const new_lh = Number(input_lh.value);
      onBeatSubmit({rh: new_rh, lh: new_lh});
      clearInputs();
    };

    return (
      <div className='beat'>
        <h3>Beat</h3>
        <label>((waiting for ReduxForm))</label>
        <div className='rh'>
          <label>Right Hand note count: {rh}</label>
          <input
            id="rhInputField"
            type="number"
            min="1"
            ref={node => input_rh = node}
          />
        </div>

        <div className='lh'>
          <label>Left Hand note count: {lh}</label>
          <input
            id="lhInputField"
            type="number"
            min="1"
            ref={node => input_lh = node}
          />
        </div>

        <button type="submit" id="beatSubmitButton" onClick={submitButtonAction}>Submit</button>
      </div>
    );
  };

  return Beat;
};
