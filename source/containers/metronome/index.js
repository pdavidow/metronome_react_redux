import {connect} from 'react-redux';
import createBeat from 'components/beat';
import createTickAssignment from 'components/tickAssignment';
import {setBeat} from 'actions';

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

  const mapStateToProps = (state) => ({...state});

  const mapDispatchToProps = (dispatch) => (
    {onSubmit: ({rh, lh}) => dispatch(setBeat({rh, lh}))}
  );

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Metronome);
};

