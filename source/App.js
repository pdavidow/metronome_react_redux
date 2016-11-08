import createMetronomeContainer from './containers/metronome';
import createBeats from './components/beats';
import createMetronomeSetting from './components/metronomeSetting';
import createPlayerSetting from './components/playerSetting';
////////////////////////////////////

export default (React) => () => {
  const Beats = createBeats(React);
  const MetronomeContainer = createMetronomeContainer(React);
  const MetronomeSetting = createMetronomeSetting(React);
  const PlayerSetting = createPlayerSetting(React);

  return (
    <div>
      <Beats />
      <br/>
      <MetronomeSetting />
      <br/>
      <PlayerSetting />
      <br/>
      <MetronomeContainer />
    </div>
  );
};
