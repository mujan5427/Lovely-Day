import fetch from 'isomorphic-fetch';
import { setCookie } from '../helpers/cookie';

export const LOGGEDIN                         = 'LOGGEDIN';
export const LOGGEDOUT                        = 'LOGGEDOUT';
export const TOGGLE_DISPLAYDIALOGLOGIN        = 'TOGGLE_DISPLAYDIALOGLOGIN';
export const TOGGLE_DISPLAYDIALOGSIGNUP       = 'TOGGLE_DISPLAYDIALOGSIGNUP';
export const TOGGLE_DISPLAYMENUMAIN           = 'TOGGLE_DISPLAYMENUMAIN';
export const TOGGLE_DISPLAYMENUNAVIGATION     = 'TOGGLE_DISPLAYMENUNAVIGATION';
export const REQUEST_BEGINNING                = 'REQUEST_BEGINNING';
export const REQUEST_SUCCESS                  = 'REQUEST_SUCCESS';
export const GROUP_PAGE_INDEX_EXPERIENCE_LIST = 'GROUP_PAGE_INDEX_EXPERIENCE_LIST';

const apiServerUrl         = 'localhost:3000';
const apiVersion           = '1.0';


/* * * * * * * * * * * * *
 *                       *
 *    Action Creators    *
 *                       *
 * * * * * * * * * * * * */

export function login() {
  return {
    type: LOGGEDIN
  };
}

export function logout() {
  return {
    type: LOGGEDOUT
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
  return {
    type: REQUEST_SUCCESS,
    group,
    responseData
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
  }
}

// Logic of invoke API actually without Header、Input Data
function getExperienceList(group) {
  return dispatch => {
    dispatch(requestBeginning(group));

    const apiPath = `http://${apiServerUrl}/api/${apiVersion}/experience?item_limit=6&current_page=1&region=none&type=hand_made,outdoor`;

    fetch(apiPath)
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

export function getToken(requestData) {
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
      dispatch(login());
      // 後面沒有 then()，因此不需要透過 return 傳遞任何值，給它
    })
    .catch(err => console.log(`Error : ${err}`));
  }
};
