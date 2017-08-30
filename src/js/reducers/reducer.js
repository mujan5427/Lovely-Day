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

function displayExperienceDetail(state = {
  displayContent: false,
  displayBrief: false,
  displayCancelMethod: false
}, action) {
  switch(action.type) {
    case 'TOGGLE_DISPLAY_CONTENT':
      return Object.assign({}, state, { displayContent: !state.displayContent });

    case 'TOGGLE_DISPLAY_BRIEF':
      return Object.assign({}, state, { displayBrief: !state.displayBrief });

    case 'TOGGLE_DISPLAY_CANCEL_METHOD':
      return Object.assign({}, state, { displayCancelMethod: !state.displayCancelMethod });

    case 'RESET_DISPLAY_EXPERIENCE_DETAIL':
      return {
        displayContent: false,
        displayBrief: false,
        displayCancelMethod: false
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
        case 'GROUP_HEADER_NAVIGATION':
        case 'GROUP_PAGE_EXPERIENCE_DETAIL':
          return {
            experiences: parseExperience(state.experiences, action.entity)
          };

        default:
          return state;
      }

    default:
      return state;
  }
}

function headerNavigation(state = {}, action) {
  switch(action.type) {
    case 'REQUEST_BEGINNING':
      if (action.group !== 'GROUP_HEADER_NAVIGATION') {
        return state;

      } else {
        return Object.assign({}, state, {isFetching: true, needUpdate: false});
      }

    case 'REQUEST_SUCCESS':
      if (action.group !== 'GROUP_HEADER_NAVIGATION') {
        return state;

      } else {
        return parseHeaderNavigation(action.index);

      }

    case 'MODIFY_NAVIGATION_TYPE':
      return Object.assign({}, state, {selected: action.selectedType});

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
          experienceList: Object.assign({}, state.experienceList, {isFetching: true, needUpdate: false, scrolledToBottom: false})
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

    case 'TOGGLE_PAGE_INDEX_SCROLLBAR_STATUS':
      return {
        experienceList: Object.assign({}, state.experienceList, {scrolledToBottom: true})
      };

    default:
      return state;
  }
}

function pageProfile(state = {}, action) {
  switch(action.type) {
    case 'REQUEST_BEGINNING':
      if (action.group !== 'GROUP_PAGE_PROFILE') {
        return state;

      } else {
        return Object.assign({}, state, {isFetching: true, needUpdate: false});

      }

    case 'REQUEST_SUCCESS':
      if (action.group !== 'GROUP_PAGE_PROFILE') {
        return state;

      } else {
        return parsePageProfile(action.responseData);

      }

    case 'REQUEST_UPDATE':
      if (action.group !== 'GROUP_PAGE_PROFILE') {
        return state;

      } else {
        return Object.assign({}, state, {needUpdate: true});
      }

    default:
      return state;
  }
}

function pageExperienceDetail(state = {}, action) {
  switch(action.type) {
    case 'REQUEST_BEGINNING':
      if (action.group !== 'GROUP_PAGE_EXPERIENCE_DETAIL') {
        return state;

      } else {
        return Object.assign({}, state, {isFetching: true, needUpdate: false});

      }

    case 'REQUEST_SUCCESS':
      if (action.group !== 'GROUP_PAGE_EXPERIENCE_DETAIL') {
        return state;

      } else {
        return Object.assign({}, state, parsePageExperienceDetail(action.selected));

      }

    case 'REQUEST_UPDATE':
      if (action.group !== 'GROUP_PAGE_EXPERIENCE_DETAIL') {
        return state;

      } else {
        return Object.assign({}, state, {needUpdate: true});
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
    scrolledToBottom: false,
    items: index
  };
}

function parseExperience(originalState, entity) {
  return Object.assign({}, originalState, entity);
}

function parsePageProfile(responseData) {
  return {
    isFetching: false,
    needUpdate: false,
    content: responseData
  };
}

function parseHeaderNavigation(index) {
  return {
    isFetching: false,
    needUpdate: false,
    selected: 'outdoor',
    navigationList: index
  };
}

function parsePageExperienceDetail(selected) {
  return {
    isFetching: false,
    needUpdate: false,
    selected: selected
  };
}


const reducer = combineReducers({
  hasLoggedIn: hasLoggedIn,
  displayDialogAccount: displayDialogAccount,
  displayMenu: displayMenu,
  displayExperienceDetail: displayExperienceDetail,
  entities: entityExperiences,
  headerNavigation: headerNavigation,
  pageIndex: pageIndexExperienceList,
  pageProfile: pageProfile,
  pageExperienceDetail: pageExperienceDetail
});

export default reducer;
