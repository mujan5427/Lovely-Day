import { connect } from 'react-redux';
import PersonalInformation from '../components/menu/PersonalInformation';


function mapStateToProps(state) {
  return {
    hasLoggedIn: state.hasLoggedIn,
    dropDownMenuPersonalInformation: state.dropDownMenu.displayPersonalInformation
  };
}

const ContainerMain = connect(
  mapStateToProps
)(PersonalInformation);

export default ContainerMain;
