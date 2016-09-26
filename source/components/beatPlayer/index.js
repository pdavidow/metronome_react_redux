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
       */
    };
    const {onPlay, beat, metronomeSetting} = props;
    //const onPlay = ()=>console.log("CLICKED"); // todo temp

    const onClickPlay = () => onPlay({beat, metronomeSetting});

    return {
      componentDidMount () {
        initializeAudio();
      },

      render () {
        return (
          <div className="beatPlayer">
            <button type="submit" id="playButton" disabled={isPlaying ? "disabled" : ""} onClick={onPlay()}>=== Play Beat ===</button>
          </div>
        );
      }
    };
  };
  return BeatPlayer;
};


