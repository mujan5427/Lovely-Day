import { connect } from 'react-redux';
import Login from '../components/dialog/Login';


function mapStateToProps(state) {
  return {
    displayDialogAccount: state.displayDialogAccount
  };
}

const ContainerLogin = connect(
  mapStateToProps
)(Login);

export default ContainerLogin;
