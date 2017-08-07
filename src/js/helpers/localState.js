export function changeFormState(formElementName, propertyName, value) {
  var localStateBackup, modifiedLocalState;

  localStateBackup = Object.assign({}, this.state);
  localStateBackup.formData[formElementName][propertyName] = value;
  modifiedLocalState = Object.assign({}, this.state, localStateBackup);

  return modifiedLocalState;
};
