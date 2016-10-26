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
      player: React.PropTypes.shape({
        isPlaying: PropTypes.bool.isRequired
      }),
      handleSubmit: PropTypes.func.isRequired
    };

    const {handleSubmit, player} = props;
    const {isPlaying} = player;

    return (
      <fieldset id='beatFieldset' disabled={isPlaying ? "disabled" : ""}>
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
            <button type="submit">Submit</button>
        </form>
      </fieldset>
    );
  };

  BeatForm = reduxForm({
    form: 'beat' // a unique identifier for this form
  })(BeatForm);

  const mapStateToProps = (state) => {
    const beat = state.beat;
    const player = state.player;

    return {
      initialValues: beat,
      player,
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      // tricky: onSubmit turns into handleSubmit
      onSubmit: ({rh, lh}) => dispatch(setBeat({rh, lh}))
    }
  };

  BeatForm = connect(
    mapStateToProps,
    mapDispatchToProps
  )(BeatForm);

  return BeatForm;
};
