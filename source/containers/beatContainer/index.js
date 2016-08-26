import {connect} from 'react-redux';
import createBeat from 'components/beat';
import {setBeat} from 'actions';

export default (React) => {
  const Beat = createBeat(React);

  const mapStateToProps = (state) => ({...state});

  const mapDispatchToProps = (dispatch) => (
    {onSubmit: ({rh, lh}) => dispatch(setBeat({rh, lh}))}
  );

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Beat);
};

