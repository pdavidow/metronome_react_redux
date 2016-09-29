import createMetronomeContainer from './containers/metronome';
import createBeat from './components/beat';
import createMetronomeSetting from './components/metronomeSetting';
////////////////////////////////////

export default (React) => () => {
  const Beat = createBeat(React);
  const MetronomeContainer = createMetronomeContainer(React);
  const MetronomeSetting = createMetronomeSetting(React);

  return (
    <div>
      <Beat />
      <p>=========================</p>
      <MetronomeSetting />
      <p>=========================</p>
      <MetronomeContainer />
    </div>
  );
};
