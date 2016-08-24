//http://redux-form.com/5.3.1/#/getting-started?_k=02vygh
import {reduxForm} from 'redux-form';

export default (React) => {
  const PropTypes = React.PropTypes;

  const Beat = ({fields: {rh, lh}}, onSubmit) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='rh'>
          <label>Right Hand Note Count</label>
          <input type="number" placeholder="1" min="1" {...rh}/>
        </div>
        <div className='lh'>
          <label>Left Hand Note Count</label>
          <input type="number" placeholder="1" min="1" {...lh}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };

  Beat.propTypes = {
    fields: PropTypes.object.isRequired,
    rh: PropTypes.number.isRequired,
    lh: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  const BeatForm = reduxForm({
    form: 'beat',        // a unique name for this form
    fields: ['rh', 'lh'] // all the fields in your form
  })(Beat);

  return BeatForm;
};
