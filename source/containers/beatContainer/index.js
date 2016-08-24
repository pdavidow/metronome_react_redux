import {connect} from 'react-redux';
import createBeat from 'components/beat';
import {SET_RH_LH} from 'constants/actionTypes';

export default (React) => {
  const Beat = createBeat(React);
  const mapStateToProps = (state, ownProps) => (
    {
      fields: {...(state.beat)},
      onSubmit: (store.dispatch({ type : SET_RH_LH, rh: rh, lh: lh}))
    });

  return connect(
    mapStateToProps
  )(Beat);
};

