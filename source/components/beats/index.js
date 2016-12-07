import {
  Field,
  FieldArray
} from 'redux-form';
import {
  Button,
  Panel
} from 'react-bootstrap';

import {defaultBeat} from '../../store/reducers/beats';
////////////////////////////////////

export default (React) => {
  const PropTypes = React.PropTypes;

  let Beats = (props) => {
    Beats.propTypes = {
      initialValues: PropTypes.array.isRequired,
      player: React.PropTypes.shape({
        isPlaying: PropTypes.bool.isRequired
      }),
      userInterfaceSetting: React.PropTypes.shape({
        isBeatPanelOpen: PropTypes.bool.isRequired
      }),
      handleToggleIsBeatPanelOpen: PropTypes.func.isRequired
    };

    const {handleToggleIsBeatPanelOpen, player, userInterfaceSetting} = props;
    const {isPlaying} = player;
    const {isBeatPanelOpen} = userInterfaceSetting;

    const normalizeNumber = (value) => Number(value);
    const toggleButtonText = ({isBeatPanelOpen}) => isBeatPanelOpen ? 'collapse' : 'expand';

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
          <div>
            <Button id="toggleIsBeatPanelOpen_Button" onClick={handleToggleIsBeatPanelOpen}>{toggleButtonText({isBeatPanelOpen})}</Button>
            <Panel id="collapsibleBeatPanel" collapsible expanded={isBeatPanelOpen}>
              <FieldArray name="beats" component={renderBeats}/>
            </Panel>
          </div>
        </Panel>
      </fieldset>
    );
  };

  return Beats;
};
