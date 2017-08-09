export function changeFormState(originalLocalState, formElementName, needToModifiedState) {
  var localStateBackup;

  localStateBackup                           = JSON.parse(JSON.stringify(originalLocalState));
  localStateBackup.formData[formElementName] = Object.assign({}, localStateBackup.formData[formElementName], needToModifiedState);

  return localStateBackup;
};

export function hasErrorMessage(localState) {
  var property;
  var formDataLocalState = localState.formData;

  for(property in formDataLocalState) {
    if (formDataLocalState[property].hasOwnProperty('errorMessage') && !isEmpty(formDataLocalState[property].errorMessage)) {
      return true;
    }
  }

  return false;
};
