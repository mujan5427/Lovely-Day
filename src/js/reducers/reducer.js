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
            experiences: parseExperience(state, action.entity)
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
          experienceList: Object.assign({}, state.experienceList, {isFetching: true, needUpdate: false})
        };

      }

    case 'REQUEST_SUCCESS':
      if (action.group !== 'GROUP_PAGE_INDEX_EXPERIENCE_LIST') {
        return state;

      } else {
        return {
          experienceList: parsePageIndex(action.index)
        };

      }

    case 'REQUEST_UPDATE':
      if (action.group !== 'GROUP_PAGE_INDEX_EXPERIENCE_LIST') {
        return state;

      } else {
        return {
          experienceList: Object.assign({}, state.experienceList, {needUpdate: true})
        };

      }

    default:
      return state;
  }
}


/* * * * * * * * * * * * *
 *                       *
 *       Parse Data      *
 *                       *
 * * * * * * * * * * * * */

function parsePageIndex(index) {
  return {
    isFetching: false,
    needUpdate: false,
    items: index
  };
}

function parseExperience(originalState, entity) {
  return Object.assign(originalState, entity);
}


const reducer = combineReducers({
  hasLoggedIn: hasLoggedIn,
  displayDialogAccount: displayDialogAccount,
  displayMenu: displayMenu,
  entities: entityExperiences,
  pageIndex: pageIndexExperienceList
});

export default reducer;
