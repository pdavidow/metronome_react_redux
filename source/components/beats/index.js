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

import {
  setBeats,
  toggleIsBeatPanelOpen
} from '../../actions';
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
      userInterfaceSetting: React.PropTypes.shape({
        isBeatPanelOpen: PropTypes.bool.isRequired
      }),
      handleSubmit: PropTypes.func.isRequired,
      handleToggleIsBeatPanelOpen: PropTypes.func.isRequired
    };

    const {handleSubmit, handleToggleIsBeatPanelOpen, player, userInterfaceSetting} = props;
    const {isPlaying} = player;
    const {isBeatPanelOpen} = userInterfaceSetting;

    const normalizeNumber = (value) => Number(value);

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
        <Button id="addBeatButton" type="button" bsStyle="primary" onClick={() => fields.push(defaultBeat)}>Add Beat</Button>
        {fields.map((beat, index) =>
          <li key={index}>
            <h4>Beat #{index + 1} <Button type="button" bsStyle="danger" bsSize="xsmall" onClick={() => fields.remove(index)}>Remove</Button></h4>
              <Field
                name={`${beat}.rh`}
                type="number"
                min="1"
                component={renderField}
                label="Right Hand note count"
                normalize={normalizeNumber}
              />
              <Field
                name={`${beat}.lh`}
                type="number"
                min="1"
                component={renderField}
                label="Left Hand note count"
                normalize={normalizeNumber}
              />
          </li>
        )}
      </ul>);

    return (
      <fieldset id="beatsFieldset" disabled={isPlaying ? "disabled" : ""}>
        <Panel header={<h1>Beats</h1>}>
          <form className="beats" onSubmit={handleSubmit}>
            <div>
              <Button id="toggleIsBeatPanelOpen_Button" onClick={handleToggleIsBeatPanelOpen}>click</Button>
              <Panel id="collapsibleBeatPanel" collapsible expanded={isBeatPanelOpen}>
                <FieldArray name="beats" component={renderBeats}/>
              </Panel>
            </div>
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
    const userInterfaceSetting = state.userInterfaceSetting;

    return {
      initialValues: {beats},
      player,
      userInterfaceSetting
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      // tricky: onSubmit turns into handleSubmit
      onSubmit: ((beatsObject) => {
        dispatch(setBeats(beatsObject.beats))
      }),
      handleToggleIsBeatPanelOpen: (() => {
        dispatch(toggleIsBeatPanelOpen())
      })
    };
  };

  BeatsForm = connect(
    mapStateToProps,
    mapDispatchToProps
  )(BeatsForm);

  return BeatsForm;
};
