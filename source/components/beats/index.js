import {
  Field,
  FieldArray,
  reduxForm
} from 'redux-form';
import {connect} from 'react-redux';
import {
  Button,
  Panel
} from 'react-bootstrap';

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

    const renderField = ({input, label, type, min, meta: {touched, error }}) => (
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
        <Button type="button" bsStyle="primary" onClick={() => fields.push(defaultBeat)}>Add Beat</Button>
        {fields.map((beat, index) =>
          <li key={index}>
            <h4>Beat #{index + 1} <Button type="button" bsStyle="danger" bsSize="xsmall" onClick={() => fields.remove(index)}>Remove</Button></h4>
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
        <Panel header={<h1>Beats</h1>}>
          <form className="beats" onSubmit={handleSubmit}>
            <FieldArray name="beats" component={renderBeats}/>
            <div>
              <Button type="submit" bsStyle="success">Submit</Button>
            </div>
          </form>
        </Panel>
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
