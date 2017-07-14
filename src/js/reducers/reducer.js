import { combineReducers } from 'redux';
import { FETCH_PAGE_INDEX_EXPERIENCE } from '../actions/action';


function hasLoggedIn(state = false, action) {
  switch(action.type) {
    case 'LOGGEDIN':
      return true;

    case 'LOGGEDOUT':
      return false;

    default:
      return state;
  }
}

// function displayDialogLogin(state = false, action) {
//   switch(action.type) {
//     case 'TOGGLE_DISPLAYDIALOGLOGIN':
//       return !state;
//
//     default:
//       return state;
//   }
// }
//
// function displayDialogSignup(state = false, action) {
//   switch(action.type) {
//     case 'TOGGLE_DISPLAYDIALOGSIGNUP':
//       return !state;
//
//     default:
//       return state;
//   }
// }

function displayDialogAccount(state = {
  displayDialogLogin: false,
  displayDialogSignup: false
}, action) {
  switch(action.type) {
    case 'TOGGLE_DISPLAYDIALOGLOGIN':
      return {
        displayDialogLogin: !state.displayDialogLogin,
        displayDialogSignup: false
      };

    case 'TOGGLE_DISPLAYDIALOGSIGNUP':
      return {
        displayDialogLogin: false,
        displayDialogSignup: !state.displayDialogSignup
      };

    default:
      return state;
  }
}

function entityExperiences(state = {}, action) {
  switch(action.type) {
    case 'FETCH_PAGE_INDEX_EXPERIENCE':
      return {
        experiences: action.entityExperienceList
      };

    default:
      return state;
  }
}

function pageIndexExperienceList(state = {}, action) {
  switch(action.type) {
    case 'FETCH_PAGE_INDEX_EXPERIENCE':
      return {
        experienceList: action.pageIndexExperienceList
      };

    default:
      return state;
  }
}

const reducer = combineReducers({
  hasLoggedIn: hasLoggedIn,
  displayDialogAccount: displayDialogAccount,
  entities: entityExperiences,
  pageIndex: pageIndexExperienceList
});

export default reducer;
