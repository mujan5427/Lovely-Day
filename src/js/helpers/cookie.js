const ONE_WEEK_MILLISECOND = 604800000;

export function setCookie(memberInfo) {
  var property, expiratioDate;
  var currentDate = new Date();

  currentDate.setTime(currentDate.getTime() + ONE_WEEK_MILLISECOND);
  expiratioDate = currentDate.toUTCString();

  for(property in memberInfo) {
    document.cookie = `${property}=${memberInfo[property]};expires=${expiratioDate}`;
  }
};
