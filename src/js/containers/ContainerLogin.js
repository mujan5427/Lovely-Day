import { connect } from 'react-redux';
import Login from '../components/dialog/Login';


function mapStateToProps(state) {
  return {
    displayDialogAccount: state.displayDialogAccount,
    displayAlert: state.alert.displayAlert,
    alertMessage: state.alert.message
  };
}

const ContainerLogin = connect(
  mapStateToProps
)(Login);

export default ContainerLogin;
