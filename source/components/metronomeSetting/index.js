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
      handleSubmit: PropTypes.func.isRequired
    };

    const {handleSubmit} = props;

    return (
      <form className='metronomeSetting' onSubmit={handleSubmit}>
        <h3>MetronomeSetting</h3>
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
    );
  };

  MetronomeSettingForm = reduxForm({
    form: 'metronomeSetting' // a unique identifier for this form
  })(MetronomeSettingForm);

  const mapStateToProps = (state) => {
    return {
      initialValues: state.metronomeSetting
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
