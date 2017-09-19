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

function displaySearch(state = {
  displayFilterPickerRegion: false,
  displayFilterPickerType: false
}, action) {
  switch(action.type) {
    case 'TOGGLE_DISPLAY_FILTERPICKER_REGION':
      return {
        displayFilterPickerRegion: !state.displayFilterPickerRegion,
        displayFilterPickerType: false,
        displayDialogFilter: false
      };

    case 'TOGGLE_DISPLAY_FILTERPICKER_TYPE':
      return {
        displayFilterPickerRegion: false,
        displayFilterPickerType: !state.displayFilterPickerType,
        displayDialogFilter: false
      };

    case 'TOGGLE_DIALOG_FILTER':
      return {
        displayFilterPickerRegion: false,
        displayFilterPickerType: false,
        displayDialogFilter: !state.displayDialogFilter
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
        case 'GROUP_PAGE_SEARCH_EXPERIENCE_LIST':
          return {
            experiences: parseExperience(state.experiences, action.entity)
          };

        case 'GROUP_ENTITY':
          return {
            experiences: refreshAllEntityFavorited(state.experiences, action.experienceId)
          };

        default:
          return state;
      }

    case 'RESET_ENTITY_EXPERIENCE_FAVORITE':
      return {
        experiences: refreshAllEntityFavorited(state.experiences)
      };

    case 'TOGGLE_ENTITY_FAVORITE':
      return {
        experiences: toggleSpecifiedEntityFavorited(state.experiences, action.experienceId)
      };

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

function pageIndex(state, action) {
  const currentPage    = state !== undefined ? state.currentPage : undefined;
  const experienceList = state !== undefined ? state.experienceList : undefined;

  return {
    currentPage    : pageIndexCurrentPage(currentPage, action),
    experienceList : pageIndexExperienceList(experienceList, action)
  };

}

function pageIndexCurrentPage(state = 1, action) {
  switch(action.type) {
    case 'INCREASE_PAGE_INDEX_CURRENT_PAGE':
      return state + 1;

    case 'RESET_PAGE_INDEX_CURRENT_PAGE':
      return 1;

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
        return Object.assign({}, state, {isFetching: true, needUpdate: false});

      }

    case 'REQUEST_SUCCESS':
      if (action.group !== 'GROUP_PAGE_INDEX_EXPERIENCE_LIST') {
        return state;

      } else {
        return parseExperienceList(state, action.index, action.isThisLastPage);

      }

    case 'REQUEST_UPDATE':
      if (action.group !== 'GROUP_PAGE_INDEX_EXPERIENCE_LIST') {
        return state;

      } else {
        return Object.assign({}, state, {needUpdate: true});

      }

    case 'RESET_PAGE_INDEX_EXPERIENCE_LIST':
      return {};

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

    case 'RESET_PAGE_EXPERIENCE_DETAIL':
      return {};

    default:
      return state;
  }
}

function pageSearch(state, action) {
  const currentPage    = state !== undefined ? state.currentPage : undefined;
  const experienceList = state !== undefined ? state.experienceList : undefined;

  return {
    currentPage    : pageSearchCurrentPage(currentPage, action),
    experienceList : pageSearchExperienceList(experienceList, action)
  };

}

function pageSearchCurrentPage(state = 1, action) {
  switch(action.type) {
    case 'INCREASE_PAGE_SEARCH_CURRENT_PAGE':
      return state + 1;

    case 'RESET_PAGE_SEARCH_CURRENT_PAGE':
      return 1;

    default:
      return state;
  }
}

function pageSearchExperienceList(state = {}, action) {
  switch(action.type) {
    case 'REQUEST_BEGINNING':
      if (action.group !== 'GROUP_PAGE_SEARCH_EXPERIENCE_LIST') {
        return state;

      } else {
        return Object.assign({}, state, {isFetching: true, needUpdate: false});

      }

    case 'REQUEST_SUCCESS':
      if (action.group !== 'GROUP_PAGE_SEARCH_EXPERIENCE_LIST') {
        return state;

      } else {
        return parseExperienceList(state, action.index, action.isThisLastPage);

      }

    case 'REQUEST_UPDATE':
      if (action.group !== 'GROUP_PAGE_SEARCH_EXPERIENCE_LIST') {
        return state;

      } else {
        return Object.assign({}, state, {needUpdate: true});

      }

    case 'RESET_PAGE_SEARCH_EXPERIENCE_LIST':
      return {};

    default:
      return state;
  }
}


/* * * * * * * * * * * * *
 *                       *
 *       Parse Data      *
 *                       *
 * * * * * * * * * * * * */

function parseExperienceList(originalState, index, isThisLastPage) {
  var mergedItems;

  if(!originalState.hasOwnProperty('items')) {
    mergedItems = index;
  } else {
    mergedItems = originalState.items.concat(index);
  }

  return {
    isFetching: false,
    needUpdate: false,
    isThisLastPage: isThisLastPage,
    items: mergedItems
  };
}

function parseExperience(originalState, entity) {
  return Object.assign({}, originalState, entity);
}

function refreshAllEntityFavorited(originalState, experienceId = undefined) {
  var property;

  if(!isEmpty(experienceId) && Array.isArray(experienceId)) {
    experienceId.map(item => {
      if(!isEmpty(originalState[item])) {
        originalState[item].favorited = true;
      }
    });

  } else {
    for(property in originalState) {
      originalState[property].favorited = false;
    }

  }

  return originalState;
}

function toggleSpecifiedEntityFavorited(originalState, experienceId) {
  const specifiedEntity = Object.assign({}, originalState[experienceId], {favorited: !originalState[experienceId].favorited});

  return Object.assign({}, originalState, {[experienceId]: specifiedEntity});
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
  displaySearch: displaySearch,
  entities: entityExperiences,
  headerNavigation: headerNavigation,
  pageIndex: pageIndex,
  pageProfile: pageProfile,
  pageExperienceDetail: pageExperienceDetail,
  pageSearch: pageSearch
});

export default reducer;
