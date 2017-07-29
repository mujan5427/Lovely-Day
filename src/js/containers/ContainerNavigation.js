import { connect } from 'react-redux';
import Navigation from '../components/menu/Navigation';


function mapStateToProps(state) {
  return {
    displayMenu: state.displayMenu
  };
}

const ContainerNavigation = connect(
  mapStateToProps
)(Navigation);

export default ContainerNavigation;
