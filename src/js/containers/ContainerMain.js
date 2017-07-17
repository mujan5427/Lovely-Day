import { connect } from 'react-redux';
import { toggleDisplayDialogSignup, toggleDisplayDialogLogin, logout, toggleDisplayMenuMain } from '../actions/action';
import Main from '../components/menu/Main';


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
    }
  };
}

const ContainerMain = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default ContainerMain;
