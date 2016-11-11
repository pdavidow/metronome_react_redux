import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {
  Button,
  Panel
} from 'react-bootstrap';

import {setPlayerSetting} from '../../actions';
////////////////////////////////////

export default (React) => {
  const PropTypes = React.PropTypes;

  let PlayerSettingForm = (props) => {
    PlayerSettingForm.propTypes = {
      initialValues: React.PropTypes.shape({
        isLooping: PropTypes.bool.isRequired
      }),
      player: React.PropTypes.shape({
        isPlaying: PropTypes.bool.isRequired
      }),
      handleSubmit: PropTypes.func.isRequired
    };

    const {handleSubmit, player} = props;
    const {isPlaying} = player;

    return (
      <fieldset id='playerSettingFieldset' disabled={isPlaying ? "disabled" : ""}>
        <Panel header={<h1>Player Setting</h1>}>
          <form className='playerSetting' onSubmit={handleSubmit} disabled={isPlaying ? "disabled" : ""}>
            <div className='isLooping'>
              <label>Loop</label>
              <Field name="isLooping" id="loopCheckbox" component="input" type="checkbox"/>
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

    return {
      initialValues: playerSetting,
      player
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      // tricky: onSubmit turns into handleSubmit
      onSubmit: ({isLooping}) => dispatch(setPlayerSetting({isLooping}))
    }
  };

  PlayerSettingForm = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlayerSettingForm);

  return PlayerSettingForm;
};
