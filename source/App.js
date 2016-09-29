import createMetronomeContainer from './containers/metronome';
import createBeat from './components/beat';
////////////////////////////////////

export default (React) => () => {
  const Beat = createBeat(React);
  const MetronomeContainer = createMetronomeContainer(React);

  return (
    <div>
      <Beat />
      <p>=========================</p>
      <MetronomeContainer />
    </div>
  );
};
