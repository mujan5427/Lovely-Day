import { connect } from 'react-redux';
import { toggleDisplayDialogSignup, toggleDisplayDialogLogin } from '../actions/action';
import Login from '../components/dialog/Login';


function mapStateToProps(state) {
  return {
    displayDialogAccount: state.displayDialogAccount
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleDialogSignup: () => {
      dispatch(toggleDisplayDialogSignup())
    },
    toggleDialogLogin: () => {
      dispatch(toggleDisplayDialogLogin())
    }
  };
}

const ContainerLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default ContainerLogin;
