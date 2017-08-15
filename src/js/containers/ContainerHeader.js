import { connect } from 'react-redux';
import { getCookie } from '../helpers/cookie';
import Header from '../components/layout/Header';


function mapStateToProps(state) {
  var userName = undefined;
  var cookie = getCookie();

  if (!isEmpty(cookie.first_name)) {
    userName = cookie.first_name;
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
