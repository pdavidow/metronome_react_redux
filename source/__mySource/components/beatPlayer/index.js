import Audio from '__mySource/models/audio';

export default (React) => {
  const PropTypes = React.PropTypes;

  const BeatPlayer = (props) => {
    BeatPlayer.propTypes = {
      onPlay: PropTypes.func.isRequired
    };
    const {onPlay} = props;

    return {
      componentDidMount () {
        Audio.initialize();
      },

      render () { // todo: disable button during play
        return (
          <div>
            <button type="submit" onClick={onPlay}>=== Play Beat ===</button>
          </div>
        );
      }
    };
  };
  return BeatPlayer;
};


