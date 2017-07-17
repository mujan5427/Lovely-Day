import { connect } from 'react-redux';
import { toggleDisplayMenuNavigation } from '../actions/action';
import Navigation from '../components/menu/Navigation';


function mapStateToProps(state) {
  return {
    displayMenu: state.displayMenu
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleMenuNavigation: () => {
      dispatch(toggleDisplayMenuNavigation())
    }
  };
}

const ContainerNavigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);

export default ContainerNavigation;
