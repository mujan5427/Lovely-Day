import errorMessageConfig from '../errorMessageConfig';
import { changeFormState, hasErrorMessage } from './localState';


export function validator(type, source) {
  var patten, errorMessage;

  if (isEmpty(source)) {
    return errorMessageConfig[3];

  } else {
    switch(type) {
      case 'email':
        patten       = /^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.+\w+$/g;
        errorMessage = errorMessageConfig[1];
        break;

      case 'password':
        patten       = /^[a-z0-9][a-z0-9]{3,7}$/g;
        errorMessage = errorMessageConfig[2];
        break;
    }

    return patten.test(source) ? true : errorMessage;
  }
};

export function verifyRequiredField(localState) {
  var property, needToModifiedState;
  var formDataLocalState = localState.formData;

  // Verify required field
  for(property in formDataLocalState) {
    if (formDataLocalState[property].hasOwnProperty('isRequired') &&
        (isEmpty(formDataLocalState[property].value) || formDataLocalState[property].value === false)) {

      needToModifiedState = {
        errorMessage: errorMessageConfig[3]
      };

      localState = changeFormState(localState, property, needToModifiedState);
    }
  }

  return {
    hasErrorMessage: hasErrorMessage(localState),
    state: localState
  };
};

export function verifyNeedToVerifiedField(localState) {
  var property, validationValue, errorMessage, needToModifiedState;
  var formDataLocalState = localState.formData;

  // Verify need to verified field
  for(property in formDataLocalState) {
    if (formDataLocalState[property].hasOwnProperty('needToVerified')) {
      validationValue = validator(property, formDataLocalState[property].value);

      if (validationValue !== true) {
        errorMessage = validationValue;

        needToModifiedState = {
          errorMessage: errorMessage
        };

        localState = changeFormState(localState, property, needToModifiedState);
      }
    }
  }

  return {
    hasErrorMessage: hasErrorMessage(localState),
    state: localState
  };
};
