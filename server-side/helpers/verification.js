exports.verifyInputColumn = function (needToVerifiedColumn, inputData) {
  const verifiedColumnLength = needToVerifiedColumn.length;
  var count                  = 0;

  for (count; count < verifiedColumnLength; count++) {

    // which has the columns
    if (!inputData.hasOwnProperty(needToVerifiedColumn[count])) {
      return false;

    } else {

      // which is empty string
      if (inputData[needToVerifiedColumn[count]] === '') {
        return false;

      }
    }
  }

  return true;
};
