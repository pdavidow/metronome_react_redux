import {Alert} from 'react-bootstrap';
import {
  ModalContainer,
  ModalDialog
} from 'react-modal-dialog';
////////////////////////////////////

export default (React) => {
  const PropTypes = React.PropTypes;

  const ModalAlert = (props) => {
    ModalAlert.propTypes = {
      message: PropTypes.string.isRequired,
      onDismiss: PropTypes.func.isRequired
    };

    const {message, onDismiss} = props;

    return {
      render () {
        return (
          <ModalContainer onClose={onDismiss}>
            <ModalDialog onClose={onDismiss}>
              <Alert id="alert" bsStyle="danger">
                <h1>Error</h1>
                <br/>
                <h3 id="alertMessage">{message}</h3>
              </Alert>
            </ModalDialog>
          </ModalContainer>
        )
      }
    };
  };
  return ModalAlert;
};
