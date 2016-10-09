import createMetronomeContainer from './containers/metronome';
import createBeat from './components/beat';
import createMetronomeSetting from './components/metronomeSetting';
import createPlayerSetting from './components/playerSetting';
////////////////////////////////////

export default (React) => () => {
  const Beat = createBeat(React);
  const MetronomeContainer = createMetronomeContainer(React);
  const MetronomeSetting = createMetronomeSetting(React);
  const PlayerSetting = createPlayerSetting(React);

  return (
    <div>
      <Beat />
      <p>=========================</p>
      <MetronomeSetting />
      <p>=========================</p>
      <PlayerSetting />
      <p>=========================</p>
      <MetronomeContainer />
    </div>
  );
};
