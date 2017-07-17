import { connect } from 'react-redux';
import { toggleDisplayDialogSignup, toggleDisplayDialogLogin, logout, toggleDisplayMenuMain, toggleDisplayMenuNavigation } from '../actions/action';
import Header from '../components/layout/Header';


function mapStateToProps(state) {
  return {
    hasLoggedIn: state.hasLoggedIn,
    displayDialogAccount: state.displayDialogAccount,
    displayMenu: state.displayMenu
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
    },
    toggleMenuMain: () => {
      dispatch(toggleDisplayMenuMain())
    },
    toggleMenuNavigation: () => {
      dispatch(toggleDisplayMenuNavigation())
    }
  };
}

const ContainerHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default ContainerHeader;
