import { connect } from 'react-redux';
import Signup from '../components/dialog/Signup';


function mapStateToProps(state) {
  return {
    displayDialogAccount: state.displayDialogAccount,
    displayAlert: state.alert.displayAlert,
    alertMessage: state.alert.message
  };
}

const ContainerSignup = connect(
  mapStateToProps
)(Signup);

export default ContainerSignup;
