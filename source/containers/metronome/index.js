import {connect} from 'react-redux';
import createBeat from 'components/beat';
import createTickAssignment from 'components/tickAssignment';
import {setBeat} from 'actions';
import {calc_tickCount, calc_rhTickIndices, calc_lhTickIndices} from 'models/metronome';

export default (React) => {
  const Metronome = (props) => {
    const Beat = createBeat(React);
    const TickAssignment = createTickAssignment(React);

    return (
      <div>
        <Beat {...props}/>
        <TickAssignment {...props}/>
      </div>
    );
   };

  const mapStateToProps = (state) => {
    const beat = state;
    const tickCount = calc_tickCount(beat);
    const rhTickIndices = calc_rhTickIndices(beat);
    const lhTickIndices = calc_lhTickIndices(beat);

    return {
      ...beat,
      tickCount,
      rhTickIndices,
      lhTickIndices
    };
  };

  const mapDispatchToProps = (dispatch) => (
    {onSubmit: ({rh, lh}) => dispatch(setBeat({rh, lh}))}
  );

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Metronome);
};

