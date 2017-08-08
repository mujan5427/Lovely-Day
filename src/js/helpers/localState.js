export function changeFormState(formElementName, propertyName, value) {
  var localStateBackup, modifiedLocalState;

  localStateBackup = Object.assign({}, this.state);
  localStateBackup.formData[formElementName][propertyName] = value;
  modifiedLocalState = Object.assign({}, this.state, localStateBackup);

  return modifiedLocalState;
};

export function hasErrorMessage(localState) {
  var property;

  for(property in localState) {
    if (localState[property].hasOwnProperty('errorMessage') && !isEmpty(localState[property].errorMessage)) {
      return true;
    }
  }

  return false;
};
