import {Field, FieldArray, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

import {setBeats} from '../../actions';
import {defaultBeat} from '../../store/reducers/beats';
////////////////////////////////////

export default (React) => {
  const PropTypes = React.PropTypes;

  let BeatsForm = (props) => {
    BeatsForm.propTypes = {
      initialValues: PropTypes.object.isRequired,
      player: React.PropTypes.shape({
        isPlaying: PropTypes.bool.isRequired
      }),
      handleSubmit: PropTypes.func.isRequired
    };

    const {handleSubmit, player} = props;
    const {isPlaying} = player;

    const renderField = ({ input, label, type, min, meta: { touched, error } }) => (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} type={type} min={min} />
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    );

    const renderBeats = ({fields}) => (
      <ul>
        <li>
          <button type="button" onClick={() => fields.push(defaultBeat)}>Add Beat</button>
        </li>
        {fields.map((beat, index) =>
          <li key={index}>
            <button
              type="button"
              title="Remove Beat"
              onClick={() => fields.remove(index)}/>
            <h4>Beat #{index + 1}</h4>
            <Field
              name={`${beat}.rh`}
              type="number"
              min="1"
              component={renderField}
              label="Right Hand note count"
            />
            <Field
              name={`${beat}.lh`}
              type="number"
              min="1"
              component={renderField}
              label="Left Hand note count"
            />
          </li>
        )}
      </ul>);

    return (
      <fieldset id="beatsFieldset" disabled={isPlaying ? "disabled" : ""}>
        <form className="beats" onSubmit={handleSubmit}>
          <FieldArray name="beats" component={renderBeats}/>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </fieldset>
    );
  };

  BeatsForm = reduxForm({
    form: 'beats' // a unique identifier for this form
  })(BeatsForm);

  const mapStateToProps = (state) => {
    const beats = state.beats;
    const player = state.player;

    return {
      initialValues: {beats},
      player,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      // tricky: onSubmit turns into handleSubmit
      onSubmit: (beatsObject) => dispatch(setBeats(beatsObject.beats))
    };
  };

  BeatsForm = connect(
    mapStateToProps,
    mapDispatchToProps
  )(BeatsForm);

  return BeatsForm;
};
