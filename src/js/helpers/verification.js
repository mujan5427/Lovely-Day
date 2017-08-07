export const EMAIL    = 'email';
export const PASSWORD = 'password';


export function validator(type, source) {
  var patten;

  switch(type) {
    case EMAIL:
      patten = /^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.+\w+$/g;
      break;
    case PASSWORD:
      patten = /^[a-z0-9][a-z0-9]{3,7}$/g;
      break;
  }

  return patten.test(source);
};
