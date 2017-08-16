import fetch from 'isomorphic-fetch';
import { setCookie, getCookie, deleteCookie, verifyCookie, ONE_WEEK_MILLISECOND } from '../helpers/cookie';

export const TOGGLE_HASLOGGEDIN               = 'TOGGLE_HASLOGGEDIN';
export const TOGGLE_DISPLAYDIALOGLOGIN        = 'TOGGLE_DISPLAYDIALOGLOGIN';
export const TOGGLE_DISPLAYDIALOGSIGNUP       = 'TOGGLE_DISPLAYDIALOGSIGNUP';
export const TOGGLE_DISPLAYMENUMAIN           = 'TOGGLE_DISPLAYMENUMAIN';
export const TOGGLE_DISPLAYMENUNAVIGATION     = 'TOGGLE_DISPLAYMENUNAVIGATION';
export const REQUEST_BEGINNING                = 'REQUEST_BEGINNING';
export const REQUEST_SUCCESS                  = 'REQUEST_SUCCESS';
export const REQUEST_UPDATE                   = 'REQUEST_UPDATE';
export const GROUP_PAGE_INDEX_EXPERIENCE_LIST = 'GROUP_PAGE_INDEX_EXPERIENCE_LIST';
export const GROUP_PAGE_PROFILE               = 'GROUP_PAGE_PROFILE';
export const COPY_PROFILE_FROM_COOKIE         = 'COPY_PROFILE_FROM_COOKIE';

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
  var items;

  if (responseData.hasOwnProperty('item')) {
    items = responseData.item;
  }

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

    case GROUP_PAGE_PROFILE:
      if (responseData.hasOwnProperty('status')) {
        delete responseData.status;
      }

      return {
        type: REQUEST_SUCCESS,
        group,
        responseData
      };
  }

}

function requestUpdate(group) {
  return {
    type: REQUEST_UPDATE,
    group
  };
}

export function copyProfileFromCookie(cookieObject) {
  return {
    type: COPY_PROFILE_FROM_COOKIE,
    cookieObject
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
  return dispatch => {
    dispatch(requestBeginning(group));

    var apiPath       = `http://${apiServerUrl}/api/${apiVersion}/experience`;
    var queryString   = `?item_limit=6&current_page=1&region=none&type=hand_made,outdoor`;
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
      var memberInfo  = responseData;
      var currentDate = new Date();
      var expirationDate;

      delete memberInfo.status;

      currentDate.setTime(currentDate.getTime() + ONE_WEEK_MILLISECOND);
      expirationDate = currentDate.toUTCString();

      setCookie(memberInfo, expirationDate);
      dispatch(toggleDisplayDialogLogin());
      dispatch(toggleHasLoggedIn());
      dispatch(requestUpdate(GROUP_PAGE_INDEX_EXPERIENCE_LIST));
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
    dispatch(requestUpdate(GROUP_PAGE_INDEX_EXPERIENCE_LIST));
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
        dispatch(requestUpdate(GROUP_PAGE_INDEX_EXPERIENCE_LIST));
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

export function getProfile() {
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
        // dispatch requestUpdate() for page profile
      } else {
        throw {message: 'API Error'};
      }

    })
    .catch(err => {console.log(`Error : ${err}`)});
  }
};
