import fetch from 'isomorphic-fetch';
import { setCookie, getCookie, deleteCookie, verifyCookie, NINETY_DAYS } from '../helpers/cookie';

export const TOGGLE_HASLOGGEDIN                 = 'TOGGLE_HASLOGGEDIN';
export const TOGGLE_DISPLAYDIALOGLOGIN          = 'TOGGLE_DISPLAYDIALOGLOGIN';
export const TOGGLE_DISPLAYDIALOGSIGNUP         = 'TOGGLE_DISPLAYDIALOGSIGNUP';
export const TOGGLE_DISPLAYMENUMAIN             = 'TOGGLE_DISPLAYMENUMAIN';
export const TOGGLE_DISPLAYMENUNAVIGATION       = 'TOGGLE_DISPLAYMENUNAVIGATION';
export const TOGGLE_DISPLAY_CONTENT             = 'TOGGLE_DISPLAY_CONTENT';
export const TOGGLE_DISPLAY_BRIEF               = 'TOGGLE_DISPLAY_BRIEF';
export const TOGGLE_DISPLAY_CANCEL_METHOD       = 'TOGGLE_DISPLAY_CANCEL_METHOD';
export const RESET_DISPLAY_EXPERIENCE_DETAIL    = 'RESET_DISPLAY_EXPERIENCE_DETAIL';
export const MODIFY_NAVIGATION_TYPE             = 'MODIFY_NAVIGATION_TYPE';
export const REQUEST_BEGINNING                  = 'REQUEST_BEGINNING';
export const REQUEST_SUCCESS                    = 'REQUEST_SUCCESS';
export const REQUEST_UPDATE                     = 'REQUEST_UPDATE';
export const GROUP_PAGE_INDEX_EXPERIENCE_LIST   = 'GROUP_PAGE_INDEX_EXPERIENCE_LIST';
export const GROUP_PAGE_PROFILE                 = 'GROUP_PAGE_PROFILE';
export const GROUP_HEADER_NAVIGATION            = 'GROUP_HEADER_NAVIGATION';
export const GROUP_PAGE_EXPERIENCE_DETAIL       = 'GROUP_PAGE_EXPERIENCE_DETAIL';
export const GROUP_ENTITY                       = 'GROUP_ENTITY';
export const GROUP_PAGE_SEARCH_EXPERIENCE_LIST  = 'GROUP_PAGE_SEARCH_EXPERIENCE_LIST';
export const RESET_ENTITY_EXPERIENCE_FAVORITE   = 'RESET_ENTITY_EXPERIENCE_FAVORITE';
export const RESET_PAGE_INDEX_EXPERIENCE_LIST   = 'RESET_PAGE_INDEX_EXPERIENCE_LIST';
export const RESET_PAGE_SEARCH_EXPERIENCE_LIST  = 'RESET_PAGE_SEARCH_EXPERIENCE_LIST';
export const TOGGLE_ENTITY_FAVORITE             = 'TOGGLE_ENTITY_FAVORITE';
export const TOGGLE_DISPLAY_FILTERPICKER_REGION = 'TOGGLE_DISPLAY_FILTERPICKER_REGION';
export const TOGGLE_DISPLAY_FILTERPICKER_TYPE   = 'TOGGLE_DISPLAY_FILTERPICKER_TYPE';
export const TOGGLE_DIALOG_FILTER               = 'TOGGLE_DIALOG_FILTER';
export const INCREASE_PAGE_SEARCH_CURRENT_PAGE  = 'INCREASE_PAGE_SEARCH_CURRENT_PAGE';
export const RESET_PAGE_SEARCH_CURRENT_PAGE     = 'RESET_PAGE_SEARCH_CURRENT_PAGE';
export const RESET_PAGE_EXPERIENCE_DETAIL       = 'RESET_PAGE_EXPERIENCE_DETAIL';
export const INCREASE_PAGE_INDEX_CURRENT_PAGE   = 'INCREASE_PAGE_INDEX_CURRENT_PAGE';
export const RESET_PAGE_INDEX_CURRENT_PAGE      = 'RESET_PAGE_INDEX_CURRENT_PAGE';

const apiServerUrl = 'localhost:3000';
const apiVersion   = '1.0';


/* * * * * * * * * * * * *
 *                       *
 *    Action Creators    *
 *                       *
 * * * * * * * * * * * * */

export function toggleHasLoggedIn() {
  return {
    type: TOGGLE_HASLOGGEDIN
  };
}

export function toggleDisplayDialogLogin() {
  return {
    type: TOGGLE_DISPLAYDIALOGLOGIN
  };
}

export function toggleDisplayDialogSignup() {
  return {
    type: TOGGLE_DISPLAYDIALOGSIGNUP
  };
}

export function toggleDisplayMenuMain() {
  return {
    type: TOGGLE_DISPLAYMENUMAIN
  };
}

export function toggleDisplayMenuNavigation() {
  return {
    type: TOGGLE_DISPLAYMENUNAVIGATION
  };
}

export function toggleDisplayContent() {
  return {
    type: TOGGLE_DISPLAY_CONTENT
  };
}

export function toggleDisplayBrief() {
  return {
    type: TOGGLE_DISPLAY_BRIEF
  };
}

export function toggleDisplayCancelMethod() {
  return {
    type: TOGGLE_DISPLAY_CANCEL_METHOD
  };
}

export function resetDisplayExperienceDetail() {
  return {
    type: RESET_DISPLAY_EXPERIENCE_DETAIL
  };
}

function requestBeginning(group) {
  return {
    type: REQUEST_BEGINNING,
    group
  };
}

function requestSuccess(group, responseData) {
  var items, property;
  var navigationList       = {};
  var navigationEntityList = {};
  var navigationIndexList  = [];

  if (responseData.hasOwnProperty('items')) {
    items = responseData.items;
  }

  switch(group) {
    case GROUP_PAGE_INDEX_EXPERIENCE_LIST:
      var entity = {};

      items.map(item => Object.assign(entity, {[item.id]: item}))

      return {
        type: REQUEST_SUCCESS,
        group,
        index: items.map(item => Number(item.id)),
        entity: entity,
        isThisLastPage: responseData.hasOwnProperty('isThisLastPage') ? true : undefined
      };

    case GROUP_PAGE_PROFILE:
      if (responseData.hasOwnProperty('status')) {
        delete responseData.status;
      }

      return {
        type: REQUEST_SUCCESS,
        group,
        responseData
      };

    case GROUP_HEADER_NAVIGATION:
      if (responseData.hasOwnProperty('status')) {
        delete responseData.status;
      }

      for(property in items) {

        // generate navigation list by filtering API response data
        navigationIndexList = items[property].map(item => item.id);
        navigationList = Object.assign({}, navigationList, {[property]: navigationIndexList});

        // generate navigation entity list by filtering API response data
        items[property].map(item => {
          navigationEntityList = Object.assign({}, navigationEntityList, {[item.id]: item});
        });
      }

      return {
        type: REQUEST_SUCCESS,
        group,
        index: navigationList,
        entity: navigationEntityList
      };

    case GROUP_PAGE_EXPERIENCE_DETAIL:
      if (responseData.hasOwnProperty('status')) {
        delete responseData.status;
      }

      return {
        type: REQUEST_SUCCESS,
        group,
        selected: responseData.id,
        entity: {[responseData.id]: responseData}
      };

    case GROUP_ENTITY:
      return {
        type: REQUEST_SUCCESS,
        group,
        experienceId: items
      };

    case GROUP_PAGE_SEARCH_EXPERIENCE_LIST:
      var entity = {};

      items.map(item => Object.assign(entity, {[item.id]: item}));

      return {
        type: REQUEST_SUCCESS,
        group,
        index: items.map(item => Number(item.id)),
        entity: entity,
        isThisLastPage: responseData.hasOwnProperty('isThisLastPage') ? true : undefined
      };
  }

}

export function requestUpdate(group) {
  return {
    type: REQUEST_UPDATE,
    group
  };
}

export function modifyNavigationType(type) {
  return {
    type: MODIFY_NAVIGATION_TYPE,
    selectedType: type
  };
}

export function resetEntityExperienceFavorite() {
  return {
    type: RESET_ENTITY_EXPERIENCE_FAVORITE
  };
}

export function resetPageIndexExperienceList() {
  return {
    type: RESET_PAGE_INDEX_EXPERIENCE_LIST
  };
}

export function toggleEntityFavourite(experienceId) {
  return {
    type: TOGGLE_ENTITY_FAVORITE,
    experienceId
  };
}

export function toggleDisplayFilterPickerRegion() {
  return {
    type: TOGGLE_DISPLAY_FILTERPICKER_REGION
  };
}

export function toggleDisplayFilterPickerType() {
  return {
    type: TOGGLE_DISPLAY_FILTERPICKER_TYPE
  };
}

export function toggleDisplayDialogFilter() {
  return {
    type: TOGGLE_DIALOG_FILTER
  };
}

export function resetPageSearchExperienceList() {
  return {
    type: RESET_PAGE_SEARCH_EXPERIENCE_LIST
  };
}

function increasePageSearchCurrentPage() {
  return {
    type: INCREASE_PAGE_SEARCH_CURRENT_PAGE
  };
}

export function resetPageSearchCurrentPage() {
  return {
    type: RESET_PAGE_SEARCH_CURRENT_PAGE
  };
}

export function resetPageExperienceDetail() {
  return {
    type: RESET_PAGE_EXPERIENCE_DETAIL
  };
}

function increasePageIndexCurrentPage() {
  return {
    type: INCREASE_PAGE_INDEX_CURRENT_PAGE
  };
}

export function resetPageIndexCurrentPage() {
  return {
    type: RESET_PAGE_INDEX_CURRENT_PAGE
  };
}


/* * * * * * * * * * * * *
 *                       *
 * Thunk Action Creators *
 *                       *
 * * * * * * * * * * * * */

 // This is invoked directly by logic of application
 export function fetchData(group, requestData = null) {
   return (dispatch, getState) => {
     if (shouldFetchIfNeeded(group, getState())) {
       switch(group) {
         case GROUP_PAGE_INDEX_EXPERIENCE_LIST:
          return dispatch(getExperienceList(group, requestData));

         case GROUP_PAGE_PROFILE:
          return dispatch(getProfile());

         case GROUP_HEADER_NAVIGATION:
          return dispatch(getNavigationList());

         case GROUP_PAGE_EXPERIENCE_DETAIL:
          return dispatch(getExperienceDetail(requestData.experienceId));

         case GROUP_PAGE_SEARCH_EXPERIENCE_LIST:
          return dispatch(getExperienceList(group, requestData));
       }
     }
   };
 };

// Utility function
function shouldFetchIfNeeded(group, state) {
  var groupState;

  switch(group) {
    case GROUP_PAGE_INDEX_EXPERIENCE_LIST:
      groupState = state.pageIndex.experienceList;
      break;

    case GROUP_PAGE_PROFILE:
      groupState = state.pageProfile;
      break;

    case GROUP_HEADER_NAVIGATION:
      groupState = state.headerNavigation;

    case GROUP_PAGE_EXPERIENCE_DETAIL:
      groupState = state.pageExperienceDetail;

    case GROUP_PAGE_SEARCH_EXPERIENCE_LIST:
      groupState = state.pageSearch.experienceList;
      break;
  }

  if (isEmpty(groupState)) {
    return true;
  } else if (groupState.isFetching) {
    return false;
  } else {
    return groupState.needUpdate;
  }
}

// Logic of invoke API actually without Header、Input Data
function getExperienceList(group, requestBody) {
  return dispatch => {
    dispatch(requestBeginning(group));

    const itemLimit   = 6;
    const currentPage = requestBody.current_page;
    const region      = requestBody.region;
    const type        = requestBody.type;

    var apiPath       = `http://${apiServerUrl}/api/${apiVersion}/experience`;
    var queryString   = `?item_limit=${ itemLimit }&current_page=${ currentPage }&region=${ region }&type=${ type }`;
    const hasLoggedIn = verifyCookie();
    var apiOption     = {};

    apiPath = apiPath + queryString;

    apiOption = {
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    };

    if (hasLoggedIn) {
      const cookie   = getCookie();
      const identity = {
        member_id: cookie.member_id,
        token: cookie.token
      };

      apiOption.headers = Object.assign(apiOption.headers, identity);
    }

    fetch(apiPath, apiOption)
    .then(response => {
      if (response.status === 200) {
        return response.json();

      } else {
        console.log(`API 呼叫失敗 : ${response.status}`);
      }

    })
    .then(responseData => {

      if(group === GROUP_PAGE_SEARCH_EXPERIENCE_LIST) {
        dispatch(increasePageSearchCurrentPage());
      }

      if(group === GROUP_PAGE_INDEX_EXPERIENCE_LIST) {
        dispatch(increasePageIndexCurrentPage());
      }

      return dispatch(requestSuccess(group, responseData))
    });
  }
}

export function login(requestData) {
  return dispatch => {
    const email      = requestData.email;
    const password   = requestData.password;
    const rememberMe = requestData.rememberMe;
    const apiPath    = `http://${apiServerUrl}/api/${apiVersion}/token?email=${email}&password=${password}`;

    // You can dispatch Progress Bar at this line. If you needed
    fetch(apiPath)
    .then(responseData => {
      if (responseData.status === 200) {
        return responseData.json();

      } else {
        throw {message: 'API Error'};
      }

    })
    .then(responseData => {
      var memberInfo     = responseData;
      var currentDate    = new Date();
      var expirationDate = null;

      delete memberInfo.status;

      if(rememberMe) {
        currentDate.setUTCDate(currentDate.getUTCDate() + NINETY_DAYS);
        expirationDate = currentDate.toUTCString();
      }

      setCookie(memberInfo, expirationDate);
      dispatch(toggleDisplayDialogLogin());
      dispatch(toggleHasLoggedIn());
      dispatch(getProfile());
      // 後面沒有 then()，因此不需要透過 return 傳遞任何值，給它
    })
    .catch(err => {console.log(`Error : ${err}`)});
  }
};

export function logout() {
  return dispatch => {
    deleteCookie();
    dispatch(toggleHasLoggedIn());
    dispatch(requestUpdate(GROUP_PAGE_EXPERIENCE_DETAIL));
  }
};

export function getFavourite() {
  return dispatch => {
    dispatch(requestBeginning(GROUP_ENTITY));

    const apiPath     = `http://${apiServerUrl}/api/${apiVersion}/favourite`;
    const hasLoggedIn = verifyCookie();

    var apiOption = {};

    apiOption = {
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    };

    if (hasLoggedIn) {
      const cookie      = getCookie();
      const identity    = {
        member_id: cookie.member_id,
        token: cookie.token
      };

      apiOption.headers = Object.assign(apiOption.headers, identity);
    }

    fetch(apiPath, apiOption)
    .then(response => {
      if (response.status === 200) {
        return response.json();

      } else {
        console.log(`API 呼叫失敗 : ${response.status}`);
      }

    })
    .then(responseData => {
      dispatch(requestSuccess(GROUP_ENTITY, responseData));
    })
    .catch(err => {console.log(`Error : ${err}`)});
  }
};

export function addFavourite(experienceId) {
  return (dispatch, getState) => {
    const apiPath     = `http://${apiServerUrl}/api/${apiVersion}/favourite`;
    const hasLoggedIn = verifyCookie();
    const cookie      = getCookie();
    const identity    = {
      member_id: cookie.member_id,
      token: cookie.token
    };
    const requestBody = {
      experience_id: experienceId
    };

    var apiOption = {};

    apiOption     = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    };

    if (hasLoggedIn) {
      apiOption.headers = Object.assign(apiOption.headers, identity);
    }

    // You can dispatch Progress Bar at this line. If you needed

    fetch(apiPath, apiOption)
    .then(responseData => {
      if (responseData.status === 200) {
        return responseData.json();

      } else {
        throw {message: 'API Error'};
      }

    })
    .then(responseData => {
      if (responseData.status === 'ok') {
        dispatch(toggleEntityFavourite(experienceId));
      } else {
        throw {message: 'API Error'};
      }

    })
    .catch(err => {console.log(`Error : ${err}`)});
  }
};

export function deleteFavourite(experienceId) {
  return dispatch => {
    const apiPath     = `http://${apiServerUrl}/api/${apiVersion}/favourite`;
    const hasLoggedIn = verifyCookie();
    const cookie      = getCookie();
    const identity    = {
      member_id: cookie.member_id,
      token: cookie.token
    };
    const requestBody = {
      experience_id: experienceId
    };

    var apiOption = {};

    apiOption     = {
      method: 'DELETE',
      body: JSON.stringify(requestBody),
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    };

    if (hasLoggedIn) {
      apiOption.headers = Object.assign(apiOption.headers, identity);
    }

    // You can dispatch Progress Bar at this line. If you needed

    fetch(apiPath, apiOption)
    .then(responseData => {
      if (responseData.status === 200) {
        return responseData.json();

      } else {
        throw {message: 'API Error'};
      }

    })
    .then(responseData => {
      if (responseData.status === 'ok') {
        dispatch(toggleEntityFavourite(experienceId));
      } else {
        throw {message: 'API Error'};
      }

    })
    .catch(err => {console.log(`Error : ${err}`)});
  }
};

export function signup(requestData) {
  return dispatch => {
    const apiPath     = `http://${apiServerUrl}/api/${apiVersion}/signup`;
    const requestBody = {
      email      : requestData.email,
      first_name : requestData.firstname,
      last_name  : requestData.lastname,
      password   : requestData.password,
      birthday   : requestData.birthday
    };

    var apiOption     = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    };

    // You can dispatch Progress Bar at this line. If you need

    fetch(apiPath, apiOption)
    .then(responseData => {
      if (responseData.status === 200) {
        return responseData.json();

      } else {
        throw {message: 'API Error'};
      }

    })
    .then(responseData => {
      dispatch(toggleDisplayDialogSignup());

      if (responseData.status === 'ok') {
        // You can dispatch Welcome Dialog at this line. If you need
      } else {
        throw {message: 'API Error'};
      }

    })
    .catch(err => {console.log(`Error : ${err}`)});
  }
};

function getProfile() {
  return dispatch => {
    dispatch(requestBeginning(GROUP_PAGE_PROFILE));

    const apiPath     = `http://${apiServerUrl}/api/${apiVersion}/profile`;
    const hasLoggedIn = verifyCookie();
    const cookie      = getCookie();
    const identity    = {
      member_id: cookie.member_id,
      token: cookie.token
    };

    var apiOption = {};

    apiOption = {
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    };

    if (hasLoggedIn) {
      apiOption.headers = Object.assign(apiOption.headers, identity);
    }

    fetch(apiPath, apiOption)
    .then(response => {
      if (response.status === 200) {
        return response.json();

      } else {
        console.log(`API 呼叫失敗 : ${response.status}`);
      }

    })
    .then(responseData => {
      var memberInfo     = Object.assign({}, {first_name: responseData.first_name});
      var cookie         = getCookie();
      var expirationDate = cookie.hasOwnProperty('expiration_date') ? cookie.expiration_date : null;

      setCookie(memberInfo, expirationDate);

      dispatch(requestSuccess(GROUP_PAGE_PROFILE, responseData));
    })
    .catch(err => {console.log(`Error : ${err}`)});
  }
}

export function updateProfile(requestBody) {
  return dispatch => {
    const apiPath     = `http://${apiServerUrl}/api/${apiVersion}/profile`;
    const hasLoggedIn = verifyCookie();
    const cookie      = getCookie();
    const identity    = {
      member_id: cookie.member_id,
      token: cookie.token
    };

    var apiOption = {};

    apiOption     = {
      method: 'PUT',
      body: JSON.stringify(requestBody),
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    };

    if (hasLoggedIn) {
      apiOption.headers = Object.assign(apiOption.headers, identity);
    }

    // You can dispatch Progress Bar at this line. If you needed

    fetch(apiPath, apiOption)
    .then(responseData => {
      if (responseData.status === 200) {
        return responseData.json();

      } else {
        throw {message: 'API Error'};
      }

    })
    .then(responseData => {
      if (responseData.status === 'ok') {
        dispatch(requestUpdate(GROUP_PAGE_PROFILE));
        dispatch(fetchData(GROUP_PAGE_PROFILE));

      } else {
        throw {message: 'API Error'};
      }

    })
    .catch(err => {console.log(`Error : ${err}`)});
  }
};

function getNavigationList() {
  return dispatch => {
    dispatch(requestBeginning(GROUP_HEADER_NAVIGATION));

    const apiPath     = `http://${apiServerUrl}/api/${apiVersion}/navigation`;

    var apiOption = {};

    apiOption = {
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    };

    fetch(apiPath, apiOption)
    .then(response => {
      if (response.status === 200) {
        return response.json();

      } else {
        console.log(`API 呼叫失敗 : ${response.status}`);
      }

    })
    .then(responseData => {
      dispatch(requestSuccess(GROUP_HEADER_NAVIGATION, responseData));
    })
    .catch(err => {console.log(`Error : ${err}`)});
  }
};

function getExperienceDetail(experienceId) {
  return dispatch => {
    dispatch(requestBeginning(GROUP_PAGE_EXPERIENCE_DETAIL));

    const id          = Number(experienceId);
    const apiPath     = `http://${apiServerUrl}/api/${apiVersion}/experience/${ id }`;
    const hasLoggedIn = verifyCookie();
    var apiOption     = {};

    apiOption = {
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    };

    if (hasLoggedIn) {
      const cookie   = getCookie();
      const identity = {
        member_id: cookie.member_id,
        token: cookie.token
      };

      apiOption.headers = Object.assign(apiOption.headers, identity);
    }

    fetch(apiPath, apiOption)
    .then(response => {
      if (response.status === 200) {
        return response.json();

      } else {
        console.log(`API 呼叫失敗 : ${response.status}`);
      }

    })
    .then(responseData => {
      dispatch(requestSuccess(GROUP_PAGE_EXPERIENCE_DETAIL, responseData));
    })
    .catch(err => {console.log(`Error : ${err}`)});
  }
};
