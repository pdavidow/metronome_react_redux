import {initialize as initializeAudio} from '../../models/audio';
////////////////////////////////////

export default (React) => {
  const PropTypes = React.PropTypes;

  const BeatPlayer = (props) => {
    BeatPlayer.propTypes = {
      onPlay: PropTypes.func.isRequired
      // todo shape
      /*
       beat,
       metronomeSetting,
       player
       */
    };
    const {onPlay, beat, metronomeSetting, player} = props;
    const {isPlaying} = player;

    const onClick_Play = () => onPlay({beat, metronomeSetting});

    return {
      componentDidMount () {
        initializeAudio();
      },

      render () {
        return (
          <div className="beatPlayer">
            <button type="submit" id="playButton" disabled={isPlaying ? "disabled" : ""} onClick={onClick_Play}>Play</button>
          </div>
        );
      }
    };
  };
  return BeatPlayer;
};


