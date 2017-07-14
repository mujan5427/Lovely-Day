import { connect } from 'react-redux';
import { toggleDisplayDialogSignup, toggleDisplayDialogLogin } from '../actions/action';
import Signup from '../components/dialog/Signup';


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

const ContainerSignup = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

export default ContainerSignup;
