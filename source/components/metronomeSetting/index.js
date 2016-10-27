import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

import {setMetronomeSetting} from '../../actions';
////////////////////////////////////

export default (React) => {
  const PropTypes = React.PropTypes;

  let MetronomeSettingForm = (props) => {
    MetronomeSettingForm.propTypes = {
      initialValues: React.PropTypes.shape({
        classicTicksPerMinute: PropTypes.number.isRequired,
        classicTicksPerBeat: PropTypes.number.isRequired
      }),
      player: React.PropTypes.shape({
        isPlaying: PropTypes.bool.isRequired
      }),
      handleSubmit: PropTypes.func.isRequired
    };

    const {handleSubmit, player} = props;
    const {isPlaying} = player;

    return (
      <fieldset id='metronomeSettingFieldset' disabled={isPlaying ? "disabled" : ""}>
        <form className='metronomeSetting' onSubmit={handleSubmit}>
          <h3>Metronome Setting</h3>
          <div className='classicTicksPerMinute'>
            <label>Classic Ticks Per Minute</label>
            <Field id="classicTicksPerMinuteInputField" name="classicTicksPerMinute" component="input" type="number" min="1"/>
          </div>
          <div className='classicTicksPerBeat'>
            <label>Classic Ticks Per Beat</label>
            <Field id="classicTicksPerBeatInputField" name="classicTicksPerBeat" component="input" type="number" min="1"/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </fieldset>
    );
  };

  MetronomeSettingForm = reduxForm({
    form: 'metronomeSetting' // a unique identifier for this form
  })(MetronomeSettingForm);

  const mapStateToProps = (state) => {
    const metronomeSetting = state.metronomeSetting;
    const player = state.player;

    return {
      initialValues: metronomeSetting,
      player
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      // tricky: onSubmit turns into handleSubmit
      onSubmit: ({classicTicksPerMinute, classicTicksPerBeat}) =>
        dispatch(setMetronomeSetting({classicTicksPerMinute, classicTicksPerBeat})),
    }
  };

  MetronomeSettingForm = connect(
    mapStateToProps,
    mapDispatchToProps
  )(MetronomeSettingForm);

  return MetronomeSettingForm;
};
