const errorConfig = require('../error_config');
const account     = require('../module/account');


exports.verifyColumnIsExist = function (needToVerifiedColumn, inputData) {
  const verifiedColumnLength = needToVerifiedColumn.length;
  var count                  = 0;

  for (count; count < verifiedColumnLength; count++) {

    // which has no the column
    if (!inputData.hasOwnProperty(needToVerifiedColumn[count])) {
      throw {type: 'client', message: errorConfig.client[1]};

    } else {

      // which is empty string
      if (inputData[needToVerifiedColumn[count]] === '') {
        throw {type: 'client', message: errorConfig.client[2]};

      }
    }
  }
};

exports.verifyToken = function (memberId, token) {
  if (account.generateToken(memberId) !== token) {
    throw {type: 'client', message: errorConfig.client[3]};
  }
};
