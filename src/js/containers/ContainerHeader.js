import { connect } from 'react-redux';
import { getCookie } from '../helpers/cookie';
import Header from '../components/layout/Header';


function getUsername() {
  var userName = undefined;
  var cookie = getCookie();

  if (!isEmpty(cookie.first_name)) {
    return userName = cookie.first_name;
  }

  return userName;
}

function getSelectedNavigationList(state) {
  var entities, navigationList, selected;

  if (state.headerNavigation.hasOwnProperty('navigationList') &&
      !isEmpty(state.headerNavigation.navigationList &&
      !isEmpty(state.entities.experiences))) {
        entities       = state.entities.experiences;
        selected       = state.headerNavigation.selected;
        navigationList = state.headerNavigation.navigationList[selected];

    return navigationList.map(index => entities[index]);

  } else {
    return undefined;

  }
}

function getSelectedNavigationType(state) {
  if (state.headerNavigation.hasOwnProperty('selected') &&
      !isEmpty(state.headerNavigation.selected)) {

    return state.headerNavigation.selected;
  } else {
    return undefined;

  }
}

function mapStateToProps(state) {
  return {
    hasLoggedIn: state.hasLoggedIn,
    userName: getUsername(),
    dropDownMenuNavigation: state.dropDownMenu.displayNavigation,
    dropDownMenuPersonalInformation: state.dropDownMenu.displayPersonalInformation,
    selectedNavigationList: getSelectedNavigationList(state),
    selectedNavigationType: getSelectedNavigationType(state)
  };
}

const ContainerHeader = connect(
  mapStateToProps
)(Header);

export default ContainerHeader;
