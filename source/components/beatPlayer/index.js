import {initialize as initializeAudio} from '../../models/audio';
////////////////////////////////////

export default (React) => {
  const PropTypes = React.PropTypes;

  const BeatPlayer = (props) => {
    // todo shape
    BeatPlayer.propTypes = {
      onPlay: PropTypes.func.isRequired
      /*
       beat,
       metronomeSetting,
       player
       */
    };
    const {onPlay, beat, metronomeSetting, player} = props;
    const {isPlaying} = player;
    console.log("isPlaying", isPlaying);

    const onClick_Play = () => onPlay({beat, metronomeSetting});

    return {
      componentDidMount () {
        initializeAudio();
      },

      render () {
        return (
          <div className="beatPlayer">
            <button type="submit" id="playButton" disabled={isPlaying ? "disabled" : ""} onClick={onClick_Play}> PLAY </button>
          </div>
        );
      }
    };
  };
  return BeatPlayer;
};


