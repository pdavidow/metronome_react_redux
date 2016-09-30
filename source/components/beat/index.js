import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

import {setBeat} from '../../actions';
////////////////////////////////////

export default (React) => {
  const PropTypes = React.PropTypes;

  let BeatForm = (props) => {
    BeatForm.propTypes = {
      initialValues: React.PropTypes.shape({
        rh: PropTypes.number.isRequired,
        lh: PropTypes.number.isRequired
      }),
      handleSubmit: PropTypes.func.isRequired
    };

    const {handleSubmit} = props;

    return (
      <form className='beat' onSubmit={handleSubmit}>
        <h3>Beat</h3>
        <div className='rh'>
          <label>Right Hand note count</label>
          <Field id="rhInputField" name="rh" component="input" type="number" min="1"/>
        </div>
        <div className='lh'>
          <label>Left Hand note count</label>
          <Field id="lhInputField" name="lh" component="input" type="number" min="1"/>
        </div>
        <button id="beatSubmitButton" type="submit">Submit</button>
      </form>
    );
  };

  BeatForm = reduxForm({
    form: 'beat' // a unique identifier for this form
  })(BeatForm);

  const mapStateToProps = (state) => {
    return {
      initialValues: state.beat
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      // tricky: onSubmit turns into handleSubmit  todo
      onSubmit: ({rh, lh}) => {
        //debugger;
        console.log("onSubmit: ({rh, lh})",{rh, lh});
        dispatch(setBeat({rh, lh}))
      }
    }
  };

  BeatForm = connect(
    mapStateToProps,
    mapDispatchToProps
  )(BeatForm);

  return BeatForm;
};
