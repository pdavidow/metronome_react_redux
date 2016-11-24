import {connect} from 'react-redux';

import createPlayer from '../../components/player';
import {
  play,
  stop
} from '../../models/metronome';
import {
  setIsPlaying,
  incrementLoopCount,
  resetLoopCount,
  setIsTakingLoopBreak
} from '../../actions';
////////////////////////////////////

export default (React) => {
  const Metronome = (props) => {
    const Player = createPlayer(React);

    return (
      <div>
        <Player {...props}/>
      </div>
    );
   };

  const mapStateToProps = (state) => {
    const beats = state.beats;
    const metronomeSetting = state.metronomeSetting;
    const playerSetting = state.playerSetting;
    const player = state.player;

    return {
      beats,
      metronomeSetting,
      playerSetting,
      player
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      onPlay: (({beats, metronomeSetting, playerSetting}) => {
        dispatch(setIsPlaying({isPlaying: true}));
        const onPlayEnded = () => dispatch(setIsPlaying({isPlaying: false}));
        const onLoopCounting = () => dispatch(incrementLoopCount());
        const onStartTakingLoopBreak = () => dispatch(setIsTakingLoopBreak({isTakingLoopBreak: true}));
        const onEndTakingLoopBreak = () => dispatch(setIsTakingLoopBreak({isTakingLoopBreak: false}));
        try {
          play({beats, metronomeSetting, playerSetting, onLoopCounting, onStartTakingLoopBreak, onEndTakingLoopBreak, onPlayEnded});
        }
        catch (e) {
          alert(e.message); // todo bootstrap...
          onPlayEnded();
        };
      }),
      onStop: (() => {
        stop();
        dispatch(setIsPlaying({isPlaying: false}));
        dispatch(resetLoopCount());
      })
    }
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Metronome);
};

