import { connect } from 'react-redux';
import Header from '../components/layout/Header';


function mapStateToProps(state) {
  var userName = undefined;

  if (state.pageProfile.hasOwnProperty('content')) {
    if (state.pageProfile.content.hasOwnProperty('first_name')) {
      userName = state.pageProfile.content.first_name;
    }
  }

  return {
    hasLoggedIn: state.hasLoggedIn,
    userName: userName,
    displayDialogAccount: state.displayDialogAccount,
    displayMenu: state.displayMenu
  };
}

const ContainerHeader = connect(
  mapStateToProps
)(Header);

export default ContainerHeader;
