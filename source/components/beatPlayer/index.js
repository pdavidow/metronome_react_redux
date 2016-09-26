import {initialize as initializeAudio} from '../../models/audio';
////////////////////////////////////

export default (React) => {
  const PropTypes = React.PropTypes;

  const BeatPlayer = (props) => {
    BeatPlayer.propTypes = {
      onPlay: PropTypes.func.isRequired
    };
    const {onPlay} = props;

    return {
      componentDidMount () {
        initializeAudio();
      },

      render () {
        return (
          <div className="beatPlayer">
            <button type="submit" id="playButton" onClick={onPlay}>=== Play Beat ===</button>
          </div>
        );
      }
    };
  };
  return BeatPlayer;
};


