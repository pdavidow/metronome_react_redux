import {
  Button,
  ButtonGroup
} from 'react-bootstrap';

import {initialize as initializeAudio} from '../../models/audio';
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
        loopCount: PropTypes.number.isRequired
      })
    };
    const {onPlay, onStop, beats, metronomeSetting, player, playerSetting} = props;
    const {isPlaying, loopCount} = player;
    const {isLooping} = playerSetting;

    const onClick_Play = () => onPlay({beats, metronomeSetting, playerSetting});
    const onClick_Stop = () => onStop();

    return {
      componentDidMount () {
        initializeAudio();
      },

      render () {
        return (
          <fieldset>
            <div className="player">
              <ButtonGroup bsSize="large">
                <Button type="button" bsStyle="primary" id="playButton" disabled={isPlaying} onClick={onClick_Play}>  P L A Y  </Button>
                <Button type="button" bsStyle="primary" id="stopButton" disabled={!isPlaying} onClick={onClick_Stop}>  S T O P  </Button>
              </ButtonGroup >
              <span hidden={(isPlaying && isLooping) ? "" : "hidden"} id="loopCountSpan"><label> Loop Count: </label><label id="loopCount">{loopCount}</label></span>
            </div>
          </fieldset>
        );
      }
    };
  };
  return Player;
};


