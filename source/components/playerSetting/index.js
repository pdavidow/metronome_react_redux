import {Field} from 'redux-form';
//import {connect} from 'react-redux';
import {Panel} from 'react-bootstrap';
////////////////////////////////////

export default (React) => {
  const PropTypes = React.PropTypes;

  let PlayerSetting = (props) => {
    PlayerSetting.propTypes = {
      initialValues: React.PropTypes.shape({
        isLooping: PropTypes.bool.isRequired,
        isLoopBreak: PropTypes.bool.isRequired
      }),
      player: React.PropTypes.shape({
        isPlaying: PropTypes.bool.isRequired
      }),
      form_isLooping: PropTypes.bool.isRequired
    };

    const {player, initialValues, form_isLooping} = props;
    const {isPlaying} = player;
    const {isLooping} = initialValues;

    const shouldEnable_loopBreakCheckbox = ({form_isLooping, isLooping}) => {
      return true;
      // if (form_isLooping == null) return isLooping;
      // return form_isLooping;
    };

    return (
      <fieldset id='playerSettingFieldset' disabled={isPlaying ? "disabled" : ""}>
        <Panel header={<h1>Player Setting</h1>}>
          <div className='isLooping'>
            <label>Loop</label>
            <Field name="isLooping" id="loopCheckbox" component="input" type="checkbox"/>
          </div>
          <div className='isLoopBreak'>
            <label>Loop Break</label>
            <Field name="isLoopBreak" id="loopBreakCheckbox" component="input" type="checkbox" disabled={!shouldEnable_loopBreakCheckbox({form_isLooping, isLooping}) ? "disabled" : ""}/>
          </div>
        </Panel>
      </fieldset>
    );
  };
/*
 // todo: causes form unresponsiveness
  const mapStateToProps = (state) => {
    const formValues = state.form.metronome.values;
    const form_isLooping = formValues ? formValues.isLooping : null;

    return {
      form_isLooping
    }
  };

  PlayerSetting = connect(
    mapStateToProps
  )(PlayerSetting);
*/
  return PlayerSetting;
};
