import {Field, reduxForm} from 'redux-form';

export default (React) => {
  const PropTypes = React.PropTypes;

  const BeatFormBasis = (props) => {
    BeatForm.propTypes = {
      beat: React.PropTypes.shape({
        rh: PropTypes.number.isRequired,
        lh: PropTypes.number.isRequired
      }),
      onBeatSubmit: PropTypes.func.isRequired
    };
    const {beat, onBeatSubmit} = props;
    const {rh, lh} = beat;

    return (
      <form className='beat' onSubmit={handleSubmit}>
        <h3>Beat</h3>
        <div className='rh'>
          <label>Right Hand note count</label>
          <Field name="rh" component="input" type="number" min="1"/>
        </div>
        <div className='lh'>
          <label>Left Hand note count</label>
          <Field name="lh" component="input" type="number" min="1"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };

  const BeatForm = reduxForm({
    form: 'beat' // a unique name for this form
  })(BeatFormBasis);

  export default BeatForm;
};
