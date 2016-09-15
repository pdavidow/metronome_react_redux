import Audio from '__mySource/models/audio';

export default (React) => {
  return () => ({
    componentDidMount () {
      Audio.initialize();
    },
    render () {
      return (
        <div>
          <button type="submit" onClick={Audio.beepNow}>=== PLAY TEST TONE ===</button>
        </div>
      );
    }
  });
};


