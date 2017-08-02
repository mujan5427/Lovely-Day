const ONE_WEEK_MILLISECOND = 604800000;

export function setCookie(memberInfo) {
  var property, expiratioDate;
  var currentDate = new Date();

  currentDate.setTime(currentDate.getTime() + ONE_WEEK_MILLISECOND);
  expiratioDate = currentDate.toUTCString();

  for(property in memberInfo) {
    document.cookie = `${property}=${memberInfo[property]};expires=${expiratioDate};path=/`;
  }
};

export function getCookie() {
  var cookieString = document.cookie;
  var cookieObject = {};

  if (!isEmpty(cookieString)) {
    var cookieArray  = cookieString.split(';');

    cookieArray.map(cookie => {
      var cookieKeyValuePair = cookie.split('=');
      var cookieName = cookieKeyValuePair[0].trim();
      var cookieValue = cookieKeyValuePair[1].trim();

      Object.assign(cookieObject, {[cookieName]: cookieValue})
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
