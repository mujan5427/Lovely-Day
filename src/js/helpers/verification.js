import errorMessageConfig from '../errorMessageConfig';

export const EMAIL    = 'email';
export const PASSWORD = 'password';


export function validator(type, source) {
  var patten, errorMessage;

  if (isEmpty(source)) {
    return errorMessageConfig[3];

  } else {
    switch(type) {
      case EMAIL:
        patten       = /^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.+\w+$/g;
        errorMessage = errorMessageConfig[1];
        break;

      case PASSWORD:
        patten       = /^[a-z0-9][a-z0-9]{3,7}$/g;
        errorMessage = errorMessageConfig[2];
        break;
    }

    return patten.test(source) ? true : errorMessage;
  }
};
