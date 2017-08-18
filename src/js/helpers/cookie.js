export const ONE_WEEK_MILLISECOND = 604800000;

export function setCookie(memberInfo, expirationDate = null) {
  var property;

  if(memberInfo.hasOwnProperty('member_id') && !isEmpty(memberInfo.member_id)) {
    memberInfo.expiration_date = expirationDate;
  }

  for(property in memberInfo) {
    if(!isEmpty(expirationDate)) {
      document.cookie = `${property}=${encodeURIComponent(memberInfo[property])};expires=${expirationDate};path=/`;

    } else {
      document.cookie = `${property}=${encodeURIComponent(memberInfo[property])};path=/`;

    }
  }
};

export function getCookie() {
  var cookieString = document.cookie;
  var cookieObject = {};

  if (!isEmpty(cookieString)) {
    var cookieArray  = cookieString.split(';');

    cookieArray.map(cookie => {
      var cookieKeyValuePair = cookie.split('=');
      var cookieName         = cookieKeyValuePair[0].trim();
      var cookieValue        = cookieKeyValuePair[1].trim();

      Object.assign(cookieObject, {[cookieName]: decodeURIComponent(cookieValue)})
    });
  }

  return cookieObject;
};

export function deleteCookie() {
  var property;
  const cookieObject  = getCookie();
  const expiratioDate = 'Thu, 01 Jan 1970 00:00:00 UTC';

  for(property in cookieObject) {
    document.cookie = `${property}=;expires=${expiratioDate};path=/`;
  }
};

export function verifyCookie() {
  const cookieObject = getCookie();

  if (cookieObject.hasOwnProperty('member_id') && !isEmpty(cookieObject.member_id) &&
      cookieObject.hasOwnProperty('token') && !isEmpty(cookieObject.token)) {
      return true;

  } else {
    return false;

  }
};
