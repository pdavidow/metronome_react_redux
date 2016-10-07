import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

////////////////////////////////////

export default (React) => {
  const PropTypes = React.PropTypes;

  let PlayerSettingForm = (props) => {

    const {handleSubmit} = props;

    return (
      <form className='playerSetting' onSubmit={handleSubmit}>
        <h3></h3>
        <div className='isLooping'>
          <label>Loop</label>
          <Field name="isLooping" id="loopCheckbox" component="input" type="checkbox"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };

  PlayerSettingForm = reduxForm({
    form: 'playerSettingForm' // a unique identifier for this form
  })(PlayerSettingForm);


  return PlayerSettingForm;
};
