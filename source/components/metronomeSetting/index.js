import {Field} from 'redux-form';
import {
  Col,
  ControlLabel,
  FormGroup,
  Panel
} from 'react-bootstrap';
////////////////////////////////////

export default (React) => {
  const PropTypes = React.PropTypes;

  let MetronomeSetting = (props) => {
    MetronomeSetting.propTypes = {
      initialValues: React.PropTypes.shape({
        classicTicksPerMinute: PropTypes.number.isRequired,
        classicTicksPerBeat: PropTypes.number.isRequired
      }),
      player: React.PropTypes.shape({
        isPlaying: PropTypes.bool.isRequired
      })
    };

    const {player} = props;
    const {isPlaying} = player;

    const normalizeNumber = (value) => Number(value);

    return (
      <fieldset id='metronomeSettingFieldset' disabled={isPlaying ? "disabled" : ""}>
        <Panel header={<h1>Metronome Setting</h1>}>
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
        </Panel>
      </fieldset>
    );
  };

  return MetronomeSetting;
};
