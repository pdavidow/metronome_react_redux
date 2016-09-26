// todo
// - 'Stop' button
// - Animate ticks with sequence of vertical lines representing ticks, and dot on top/bottom for rh/lh; do highlights when played
// - ReduxForm v6

import {connect} from 'react-redux';

import createBeat from '../../components/beat';
import createTickAssignment from '../../components/tickAssignment';
import createMetronomeSetting from '../../components/metronomeSetting';
import createBeatPlayer from '../../components/beatPlayer';
import {play} from '../../models/metronome';
import {
  setBeat,
  setMetronomeSetting,
  setPlayer
} from '../../actions';
import {
  calc_tickCount,
  calc_rhTickIndices,
  calc_lhTickIndices
} from '../../models/metronome';
////////////////////////////////////

let isPlaying = false;

export default (React) => {
  const Metronome = (props) => {
    const Beat = createBeat(React);
    const TickAssignment = createTickAssignment(React);
    const MetronomeSetting = createMetronomeSetting(React);
    const BeatPlayer = createBeatPlayer(React);

    return (
      <div>
        <Beat {...props}/>
        <p>=========================</p>
        <TickAssignment {...props}/>
        <p>=========================</p>
        <MetronomeSetting {...props}/>
        <p>=========================</p>
        <BeatPlayer {...props}/>
      </div>
    );
   };

  const mapStateToProps = (state) => {
    const beat = state.beat;
    const metronomeSetting = state.metronomeSetting;
    const player = state.player;
    const tickCount = calc_tickCount(beat);
    const rhTickIndices = calc_rhTickIndices(beat);
    const lhTickIndices = calc_lhTickIndices(beat);

    return {
      beat,
      metronomeSetting,
      ...player,
      tickCount,
      rhTickIndices,
      lhTickIndices
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      onBeatSubmit: (beat) =>
        dispatch(setBeat(beat)),

      onMetronomeSettingSubmit: (metronomeSetting) =>
        dispatch(setMetronomeSetting(metronomeSetting)),

      onPlay: ({beat, metronomeSetting}) => {
        dispatch(setPlayer({isPlaying: true}));
        //const onEnded = () => dispatch(setPlayer({isPlaying: false}));
        //play({beat, metronomeSetting, onEnded});
        play({beat, metronomeSetting});
      }
    }
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Metronome);
};

