import { connect } from 'react-redux';
import Header from '../components/layout/Header';


function mapStateToProps(state) {
  return {
    hasLoggedIn: state.hasLoggedIn,
    displayDialogAccount: state.displayDialogAccount,
    displayMenu: state.displayMenu
  };
}

const ContainerHeader = connect(
  mapStateToProps
)(Header);

export default ContainerHeader;
