import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormGroup,
  Panel
} from 'react-bootstrap';

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

    const normalizeNumber = (value) => Number(value);

    return (
      <fieldset id='metronomeSettingFieldset' disabled={isPlaying ? "disabled" : ""}>
        <Panel header={<h1>Metronome Setting</h1>}>
          <Form horizontal className='metronomeSetting' onSubmit={handleSubmit}>
            <FormGroup>
              <div className='classicTicksPerMinute'>
                <Col componentClass={ControlLabel} sm={2}>
                  Classic Ticks Per Minute
                </Col>
                <Col sm={10}>
                  <Field id="classicTicksPerMinuteInputField" name="classicTicksPerMinute" component="input" type="number" min="1" normalize={normalizeNumber}/>
                </Col>
              </div>
            </FormGroup>
            <FormGroup>
              <div className='classicTicksPerBeat'>
                <Col componentClass={ControlLabel} sm={2}>
                  Classic Ticks Per Beat
                </Col>
                <Col sm={10}>
                  <Field id="classicTicksPerBeatInputField" name="classicTicksPerBeat" component="input" type="number" min="1" normalize={normalizeNumber}/>
                </Col>
              </div>
            </FormGroup>
            <Button type="submit" bsStyle="success">Submit</Button>
          </Form>
        </Panel>
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
