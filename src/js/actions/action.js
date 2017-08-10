import fetch from 'isomorphic-fetch';
import { setCookie, getCookie, deleteCookie } from '../helpers/cookie';

export const TOGGLE_HASLOGGEDIN               = 'TOGGLE_HASLOGGEDIN';
export const TOGGLE_DISPLAYDIALOGLOGIN        = 'TOGGLE_DISPLAYDIALOGLOGIN';
export const TOGGLE_DISPLAYDIALOGSIGNUP       = 'TOGGLE_DISPLAYDIALOGSIGNUP';
export const TOGGLE_DISPLAYMENUMAIN           = 'TOGGLE_DISPLAYMENUMAIN';
export const TOGGLE_DISPLAYMENUNAVIGATION     = 'TOGGLE_DISPLAYMENUNAVIGATION';
export const REQUEST_BEGINNING                = 'REQUEST_BEGINNING';
export const REQUEST_SUCCESS                  = 'REQUEST_SUCCESS';
export const REQUEST_UPDATE                   = 'REQUEST_UPDATE';
export const GROUP_PAGE_INDEX_EXPERIENCE_LIST = 'GROUP_PAGE_INDEX_EXPERIENCE_LIST';

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

function requestBeginning(group) {
  return {
    type: REQUEST_BEGINNING,
    group
  };
}

function requestSuccess(group, responseData) {
  const items = responseData.item;

  switch(group) {
    case GROUP_PAGE_INDEX_EXPERIENCE_LIST:
      var entity = {};

      items.map(item => Object.assign(entity, {[item.id]: item}))

      return {
        type: REQUEST_SUCCESS,
        group,
        index: items.map(item => Number(item.id)),
        entity: entity
      };
  }

}

function requestUpdate(group) {
  return {
    type: REQUEST_UPDATE,
    group
  };
}


/* * * * * * * * * * * * *
 *                       *
 * Thunk Action Creators *
 *                       *
 * * * * * * * * * * * * */

 // This is invoked directly by logic of application
 export function fetchData(group) {
   return (dispatch, getState) => {
     if (shouldFetchIfNeeded(group, getState())) {
       switch(group) {
         case GROUP_PAGE_INDEX_EXPERIENCE_LIST:
          return dispatch(getExperienceList(group));
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
function getExperienceList(group) {
  return (dispatch, getState) => {
    dispatch(requestBeginning(group));

    const apiPath = `http://${apiServerUrl}/api/${apiVersion}/experience?item_limit=6&current_page=1&region=none&type=hand_made,outdoor`;
    const state   = getState();
    const headers = getCookie();
    var apiOption = {};

    if (state.hasLoggedIn) {
      apiOption = {headers: headers};
    }

    fetch(apiPath, apiOption)
    .then(response => {
      if (response.status === 200) {
        return response.json();

      } else {
        console.log(`API 呼叫失敗 : ${response.status}`);
      }

    })
    .then(responseData => dispatch(requestSuccess(group, responseData)));
  }
}

export function login(requestData) {
  return dispatch => {
    const email     = requestData.email;
    const password  = requestData.password;
    const apiPath   = `http://${apiServerUrl}/api/${apiVersion}/token?email=${email}&password=${password}`;

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
      var memberInfo = responseData;
      delete memberInfo.status;

      setCookie(memberInfo);
      dispatch(toggleDisplayDialogLogin());
      dispatch(toggleHasLoggedIn());
      dispatch(requestUpdate(GROUP_PAGE_INDEX_EXPERIENCE_LIST));
      // 後面沒有 then()，因此不需要透過 return 傳遞任何值，給它
    })
    .catch(err => {console.log(`Error : ${err}`)});
  }
};

export function logout() {
  return dispatch => {
    deleteCookie();
    dispatch(toggleHasLoggedIn());
    dispatch(requestUpdate(GROUP_PAGE_INDEX_EXPERIENCE_LIST));
  }
};

export function addFavourite(experienceId) {
  return (dispatch, getState) => {
    const apiPath     = `http://${apiServerUrl}/api/${apiVersion}/favourite`;
    const state       = getState();
    const headers     = getCookie();
    const requestBody = {
      experience_id: experienceId
    };
    var apiOption     = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    };

    if (state.hasLoggedIn) {
      apiOption.headers = Object.assign(apiOption.headers, headers);
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
        dispatch(requestUpdate(GROUP_PAGE_INDEX_EXPERIENCE_LIST));
      } else {
        throw {message: 'API Error'};
      }

    })
    .catch(err => {console.log(`Error : ${err}`)});
  }
};

export function deleteFavourite(experienceId) {
  return (dispatch, getState) => {
    const apiPath     = `http://${apiServerUrl}/api/${apiVersion}/favourite`;
    const state       = getState();
    const headers     = getCookie();
    const requestBody = {
      experience_id: experienceId
    };
    var apiOption     = {
      method: 'DELETE',
      body: JSON.stringify(requestBody),
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    };

    if (state.hasLoggedIn) {
      apiOption.headers = Object.assign(apiOption.headers, headers);
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
        dispatch(requestUpdate(GROUP_PAGE_INDEX_EXPERIENCE_LIST));
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
