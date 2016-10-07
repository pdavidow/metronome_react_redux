import {connect} from 'react-redux';

import createTickAssignment from '../../components/tickAssignment';
import createPlayer from '../../components/player';
import {
  play,
  stop
} from '../../models/metronome';
import {setIsPlaying} from '../../actions';
import {
  calc_tickCount,
  calc_rhTickIndices,
  calc_lhTickIndices
} from '../../models/metronome';
////////////////////////////////////

export default (React) => {
  const Metronome = (props) => {
    const TickAssignment = createTickAssignment(React);
    const Player = createPlayer(React);

    return (
      <div>
        <TickAssignment {...props}/>
        <p>=========================</p>
        <Player {...props}/>
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
      onPlay: (({beat, metronomeSetting}) => {
        dispatch(setIsPlaying({isPlaying: true}));
        const onEnded = () => dispatch(setIsPlaying({isPlaying: false}));
        play({beat, metronomeSetting, onEnded});
      }),
      onStop: (() => {
        stop();
        dispatch(setIsPlaying({isPlaying: false}));
      })
    }
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Metronome);
};

