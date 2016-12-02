import {
  Button,
  ButtonGroup
} from 'react-bootstrap';
import {isEmpty} from 'lodash';

import {initialize as initializeAudio} from '../../models/audio';
import createModalAlert from '../modalAlert';
////////////////////////////////////

export default (React) => {
  const PropTypes = React.PropTypes;

  const Player = (props) => {
    Player.propTypes = {
      onPlay: PropTypes.func.isRequired,
      onStop: PropTypes.func.isRequired,
      beats: PropTypes.array.isRequired,
      metronomeSetting: React.PropTypes.shape({
        classicTicksPerMinute: PropTypes.number.isRequired,
        classicTicksPerBeat: PropTypes.number.isRequired
      }),
      playerSetting: React.PropTypes.shape({
        isLooping: PropTypes.bool.isRequired
      }),
      player: React.PropTypes.shape({
        isPlaying: PropTypes.bool.isRequired,
        loopCount: PropTypes.number.isRequired,
        isTakingLoopBreak: PropTypes.number.isRequired
      })
    };

    const {onPlay, onDismissAlert, onStop, beats, metronomeSetting, player, playerSetting} = props;
    const {isPlaying, loopCount, isTakingLoopBreak, playAlert} = player;
    const {isLooping} = playerSetting;

    const onClick_Play = () => onPlay({beats, metronomeSetting, playerSetting});
    const onClick_Stop = () => onStop();

    const alertIfNeeded = () => {
      if (playAlert) {
        const ModalAlert = createModalAlert(React);
        return <ModalAlert message={playAlert} onDismiss={onDismissAlert}/>
      }
    };

    const isPlayButtonDisabled = () => {
      if (isEmpty(beats)) return true;
      return isPlaying;
    };

    return {
      componentDidMount () {
        initializeAudio();
      },
      render () {
        return (
          <fieldset>
            <div className="player">
              <div>{alertIfNeeded()}</div>
              <ButtonGroup bsSize="large">
                <Button type="button" bsStyle="primary" id="playButton" disabled={isPlayButtonDisabled()} onClick={onClick_Play}>  P L A Y  </Button>
                <Button type="button" bsStyle="primary" id="stopButton" disabled={!isPlaying} onClick={onClick_Stop}>  S T O P  </Button>
              </ButtonGroup >
              <br/>
              <span hidden={(isPlaying && isLooping) ? "" : "hidden"} id="loopCountSpan"><label>Loop Count: </label><label id="loopCount">{loopCount}</label></span>
              <br/>
              <span hidden={(isTakingLoopBreak) ? "" : "hidden"} id="loopBreakStatusSpan"><label>BREAK</label></span>
            </div>
          </fieldset>
        );
      }
    };
  };
  return Player;
};

