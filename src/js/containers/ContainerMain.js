import { connect } from 'react-redux';
import Main from '../components/menu/Main';


function mapStateToProps(state) {
  return {
    hasLoggedIn: state.hasLoggedIn,
    displayDialogAccount: state.displayDialogAccount,
    displayMenu: state.displayMenu
  };
}

const ContainerMain = connect(
  mapStateToProps
)(Main);

export default ContainerMain;
