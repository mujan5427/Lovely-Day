import { connect } from 'react-redux';
import Navigation from '../components/menu/Navigation';


function mapStateToProps(state) {
  return {
    dropDownMenuNavigation: state.dropDownMenu.displayNavigation
  };
}

const ContainerNavigation = connect(
  mapStateToProps
)(Navigation);

export default ContainerNavigation;
