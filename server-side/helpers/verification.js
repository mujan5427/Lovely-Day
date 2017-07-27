const isEmpty     = require('is-empty');
const errorConfig = require('../error_config');
const account     = require('../module/account');


exports.verifyColumnIsExist = function (needToVerifiedColumn, inputData) {
  const verifiedColumnLength = needToVerifiedColumn.length;
  var count                  = 0;

  for (count; count < verifiedColumnLength; count++) {

    // which has no the column
    if (!inputData.hasOwnProperty(needToVerifiedColumn[count])) {
      throw {type: 'client', message: errorConfig.client[1].message};

    } else {

      // which is empty string
      if (isEmpty(inputData[needToVerifiedColumn[count]])) {
        throw {type: 'client', message: errorConfig.client[2].message};

      }
    }
  }
};

exports.verifyToken = function (memberId, token) {
  if (account.generateToken(memberId) !== token) {
    throw {type: 'client', message: errorConfig.client[3].message};
  }
};
