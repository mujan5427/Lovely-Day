import { combineReducers } from 'redux';
import { FETCH_PAGE_INDEX_EXPERIENCE } from '../actions/action';


function hasLoggedIn(state = false, action) {
  switch(action.type) {
    case 'TOGGLE_HASLOGGEDIN':
      return !state;

    default:
      return state;
  }
}

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

function displayMenu(state = {
  displayMenuMain: false,
  displayMenuNavigation: false,
}, action) {
  switch(action.type) {
    case 'TOGGLE_DISPLAYMENUMAIN':
      return {
        displayMenuMain: !state.displayMenuMain,
        displayMenuNavigation: false,
      };

    case 'TOGGLE_DISPLAYMENUNAVIGATION':
      return {
        displayMenuMain: false,
        displayMenuNavigation: !state.displayMenuNavigation,
      };

    default:
      return state;
  }
}

function entityExperiences(state = {}, action) {
  switch(action.type) {
    case 'REQUEST_SUCCESS':
      switch(action.group) {
        case 'GROUP_PAGE_INDEX_EXPERIENCE_LIST':
          return {
            experiences: parseExperience(state, action.responseData)
          };

        default:
          return state;
      }

    default:
      return state;
  }
}

function pageIndexExperienceList(state = {}, action) {
  switch(action.type) {
    case 'REQUEST_BEGINNING':
      if (action.group !== 'GROUP_PAGE_INDEX_EXPERIENCE_LIST') {
        return state;

      } else {
        return {
          experienceList: {
            isFetching: true
          }
        };

      }

    case 'REQUEST_SUCCESS':
      if (action.group !== 'GROUP_PAGE_INDEX_EXPERIENCE_LIST') {
        return state;

      } else {
        return {
          experienceList: parsePageIndex(action.responseData)
        };

      }

    default:
      return state;
  }
}


/* * * * * * * * * * * * *
 *                       *
 * Analysis API Response *
 *                       *
 * * * * * * * * * * * * */

function parsePageIndex(responseData) {
  const items = responseData.item;

  return {
    isFetching: false,
    lastUpdated: new Date().getTime(),
    items: items.map(item => Number(item.id))
  };
}

function parseExperience(originalState, responseData) {
  const items = responseData.item;
  var experienceList = {};

  items.map(item => Object.assign(experienceList, {[item.id]: item}));
  experienceList = Object.assign(originalState, experienceList);

  return experienceList;
}


const reducer = combineReducers({
  hasLoggedIn: hasLoggedIn,
  displayDialogAccount: displayDialogAccount,
  displayMenu: displayMenu,
  entities: entityExperiences,
  pageIndex: pageIndexExperienceList
});

export default reducer;
