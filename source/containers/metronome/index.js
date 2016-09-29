import {connect} from 'react-redux';

import createTickAssignment from '../../components/tickAssignment';
import createBeatPlayer from '../../components/beatPlayer';
import {play} from '../../models/metronome';
import {setPlayer} from '../../actions';
import {
  calc_tickCount,
  calc_rhTickIndices,
  calc_lhTickIndices
} from '../../models/metronome';
////////////////////////////////////

export default (React) => {
  const Metronome = (props) => {
    const TickAssignment = createTickAssignment(React);
    const BeatPlayer = createBeatPlayer(React);

    return (
      <div>
        <TickAssignment {...props}/>
        <p>=========================</p>
        <BeatPlayer {...props}/>
      </div>
    );
   };

  const mapStateToProps = (state) => {
    const beat = state.beat;
    const metronomeSetting = state.metronomeSetting;
    const player = state.player;
    const tickCount = calc_tickCount({beat});
    const rhTickIndices = calc_rhTickIndices({beat});
    const lhTickIndices = calc_lhTickIndices({beat});

    return {
      beat,
      metronomeSetting,
      player,
      tickCount,
      rhTickIndices,
      lhTickIndices
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      onPlay: ({beat, metronomeSetting}) => {
        dispatch(setPlayer({isPlaying: true}));
        const onEnded = () => dispatch(setPlayer({isPlaying: false}));
        play({beat, metronomeSetting, onEnded});
      }
    }
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Metronome);
};

