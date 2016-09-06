import createMetronomeContainer from '__mySource/containers/metronome';

export default (React) => () => {
  const MetronomeContainer = createMetronomeContainer(React);

  return (
    <div>
      <MetronomeContainer />
    </div>
  );
};
