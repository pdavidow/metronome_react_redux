import createMetronomeContainer from './containers/metronome';
////////////////////////////////////

export default (React) => () => {
  const MetronomeContainer = createMetronomeContainer(React);

  return (
    <div>
      <MetronomeContainer />
    </div>
  );
};
