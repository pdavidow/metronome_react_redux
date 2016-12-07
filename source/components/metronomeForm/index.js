import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {
  Button,
  Panel
} from 'react-bootstrap';

import createBeats from '../beats';
import createMetronomeSetting from '../metronomeSetting';
import createPlayerSetting from '../playerSetting';

import {
  setBeats,
  setMetronomeSetting,
  setIsLooping,
  setIsLoopBreak,
  toggleIsBeatPanelOpen
} from '../../actions';
////////////////////////////////////

export default (React) => {
  const PropTypes = React.PropTypes;

  let MetronomeForm = (props) => {
    MetronomeForm.propTypes = {
      initialValues: React.PropTypes.shape({
        beats: PropTypes.array.isRequired,
        metronomeSetting: React.PropTypes.shape({
          classicTicksPerMinute: PropTypes.number.isRequired,
          classicTicksPerBeat: PropTypes.number.isRequired
        }),
        playerSetting: React.PropTypes.shape({
          isLooping: PropTypes.bool.isRequired,
          isLoopBreak: PropTypes.bool.isRequired
        }),
      }),
      player: React.PropTypes.shape({
        isPlaying: PropTypes.bool.isRequired
      }),
      handleSubmit: PropTypes.func.isRequired
    };

    const {handleSubmit, player} = props;
    const {isPlaying} = player;

    const Beats = createBeats(React);
    const MetronomeSetting = createMetronomeSetting(React);
    const PlayerSetting = createPlayerSetting(React);

    return (
      <fieldset id="metronomeFormFieldset" disabled={isPlaying ? "disabled" : ""}>
        <Panel>
          <form id="metronomeForm" onSubmit={handleSubmit}>
            <div>
              <Beats {...props}/>
              <br/>
              <MetronomeSetting {...props}/>
              <br/>
              <PlayerSetting {...props}/>
            </div>
            <div>
              <Button type="submit" bsStyle="success">Submit</Button>
            </div>
          </form>
        </Panel>
      </fieldset>
    );
  };

  MetronomeForm = reduxForm({
    form: 'metronome' // a unique identifier for this form
  })(MetronomeForm);

  const mapStateToProps = (state) => {
    const beats = state.beats;
    const metronomeSetting = state.metronomeSetting;
    const playerSetting = state.playerSetting;
    const player = state.player;
    const userInterfaceSetting = state.userInterfaceSetting;

    return {
      initialValues: {beats, ...metronomeSetting, ...playerSetting},
      player,
      userInterfaceSetting
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      onSubmit: (({beats, classicTicksPerMinute, classicTicksPerBeat, isLooping, isLoopBreak}) => {
        dispatch(setBeats({beats}));
        dispatch(setMetronomeSetting({classicTicksPerMinute, classicTicksPerBeat}));
        dispatch(setIsLooping({isLooping}));
        dispatch(setIsLoopBreak({isLoopBreak}));
    }),
      handleToggleIsBeatPanelOpen: (() => {
        dispatch(toggleIsBeatPanelOpen())
      })
    };
  };

  MetronomeForm = connect(
    mapStateToProps,
    mapDispatchToProps
  )(MetronomeForm);

  return MetronomeForm;
};
