import { connect } from 'react-redux';
import Main from '../components/menu/Main';


function mapStateToProps(state) {
  return {
    hasLoggedIn: state.hasLoggedIn,
    dropDownMenuPersonalInformation: state.dropDownMenu.displayPersonalInformation
  };
}

const ContainerMain = connect(
  mapStateToProps
)(Main);

export default ContainerMain;
