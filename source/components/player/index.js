import {initialize as initializeAudio} from '../../models/audio';
////////////////////////////////////

export default (React) => {
  const PropTypes = React.PropTypes;

  const Player = (props) => {
    Player.propTypes = {
      onPlay: PropTypes.func.isRequired,
      onStop: PropTypes.func.isRequired,
      beat: React.PropTypes.shape({
        rh: PropTypes.number.isRequired,
        lh: PropTypes.number.isRequired
      }),
      metronomeSetting: React.PropTypes.shape({
        classicTicksPerMinute: PropTypes.number.isRequired,
        classicTicksPerBeat: PropTypes.number.isRequired
      }),
      player: React.PropTypes.shape({
        isPlaying: PropTypes.bool.isRequired
      }),
    };
    const {onPlay, onStop, beat, metronomeSetting, player} = props;
    const {isPlaying} = player;

    const onClick_Play = () => onPlay({beat, metronomeSetting});
    const onClick_Stop = () => onStop();

    return {
      componentDidMount () {
        initializeAudio();
      },

      render () {
        return (
          <div className="player">
            <button type="submit" id="playButton" disabled={isPlaying ? "disabled" : ""} onClick={onClick_Play}>  P L A Y  </button>
            <button type="button" id="stopButton" disabled={isPlaying ? "" : "disabled"} onClick={onClick_Stop}>  S T O P  </button>
          </div>
        );
      }
    };
  };
  return Player;
};


