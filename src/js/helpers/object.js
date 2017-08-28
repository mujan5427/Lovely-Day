/***
 * Examining the object contains a specified property.
 *
 * @param  {Object} examinedTarget
 * @param  {String} propertyPath
 *
 * @return {Boolean}
 */
export function hasPropertyInDeep(examinedTarget, propertyPath) {
  const properties    = propertyPath.split('.');
  const propertyCount = properties.length;
  var startIndex      = 0;
  var objectBeingChecked = examinedTarget;
  var propertyBeingChecked;

  if(isEmpty(objectBeingChecked) || isEmpty(propertyPath)) {
    return false;
  }

  for(startIndex; startIndex < propertyCount; startIndex++) {
    propertyBeingChecked = properties[startIndex];

    if(!objectBeingChecked.hasOwnProperty(propertyBeingChecked)) {
      return false;

    } else {
      objectBeingChecked = objectBeingChecked[propertyBeingChecked];
    }
  }

  return true;
};
