import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {
  Button,
  Panel
} from 'react-bootstrap';

import {
  setIsLooping,
  setIsLoopBreak
} from '../../actions';
////////////////////////////////////

export default (React) => {
  const PropTypes = React.PropTypes;

  let PlayerSettingForm = (props) => {
    PlayerSettingForm.propTypes = {
      initialValues: React.PropTypes.shape({
        isLooping: PropTypes.bool.isRequired,
        isLoopBreak: PropTypes.bool.isRequired
      }),
      player: React.PropTypes.shape({
        isPlaying: PropTypes.bool.isRequired
      }),
      form_isLooping: PropTypes.bool.isRequired,
      handleSubmit: PropTypes.func.isRequired
    };

    const {handleSubmit, player, initialValues, form_isLooping} = props;
    const {isPlaying} = player;
    const {isLooping} = initialValues;

    const shouldDisable_loopBreakCheckbox = () => {
      if (form_isLooping == null) return isLooping;
      return form_isLooping;
    };

    return (
      <fieldset id='playerSettingFieldset' disabled={isPlaying ? "disabled" : ""}>
        <Panel header={<h1>Player Setting</h1>}>
          <form className='playerSetting' onSubmit={handleSubmit} disabled={isPlaying ? "disabled" : ""}>
            <div className='isLooping'>
              <label>Loop</label>
              <Field name="isLooping" id="loopCheckbox" component="input" type="checkbox"/>
            </div>
            <div className='isLoopBreak'>
              <label>Loop Break</label>
              <Field name="isLoopBreak" id="loopBreakCheckbox" component="input" type="checkbox" disabled={shouldDisable_loopBreakCheckbox() ? "" : "disabled"}/>
            </div>
            <Button type="submit" bsStyle="success">Submit</Button>
          </form>
        </Panel>
      </fieldset>
    );
  };

  PlayerSettingForm = reduxForm({
    form: 'playerSetting' // a unique identifier for this form
  })(PlayerSettingForm);

  const mapStateToProps = (state) => {
    const playerSetting = state.playerSetting;
    const player = state.player;
    const form_playerSetting = state.form.playerSetting;
    const form_isLooping = form_playerSetting ? form_playerSetting.values.isLooping : null;

    return {
      initialValues: playerSetting,
      player,
      form_isLooping
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      // tricky: onSubmit turns into handleSubmit
      onSubmit: ({isLooping, isLoopBreak}) => {
        dispatch(setIsLooping({isLooping}));
        dispatch(setIsLoopBreak({isLoopBreak}));
      }
    }
  };

  PlayerSettingForm = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlayerSettingForm);

  return PlayerSettingForm;
};
