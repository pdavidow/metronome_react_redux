import {Audio} from '__mySource/models/audio';

export default (React) => {
  return () => ({
    componentDidMount () {
      Audio.initializeSound_onFinishedLoading(() => console.log("Finished Loading Audio"));
    },
    render () {
      return (
        <div>
          <button type="submit" onClick={Audio.playAudio}>=== PLAY TEST TONE ===</button>
        </div>
      );
    }
  });
};


