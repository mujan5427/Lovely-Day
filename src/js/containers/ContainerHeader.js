import { connect } from 'react-redux';
import { toggleDisplayDialogSignup, toggleDisplayDialogLogin, logout } from '../actions/action';
import Header from '../components/layout/Header';


function mapStateToProps(state) {
  return {
    hasLoggedIn: state.hasLoggedIn,
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
    },
    logout: () => {
      dispatch(logout())
    }
  };
}

const ContainerHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default ContainerHeader;
