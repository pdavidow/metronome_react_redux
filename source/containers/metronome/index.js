import {connect} from 'react-redux';
import createBeat from 'components/beat';
import createTickAssignment from 'components/tickAssignment';
import {setBeat} from 'actions';
import {tickCountFunc, rhTickIndicesFunc, lhTickIndicesFunc} from 'models/metronome';

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
    const tickCount = tickCountFunc(beat);
    const rhTickIndices = rhTickIndicesFunc(beat);
    const lhTickIndices = lhTickIndicesFunc(beat);

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

