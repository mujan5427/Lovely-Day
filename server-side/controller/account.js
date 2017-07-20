const isEmpty      = require('is-empty');
const account      = require('../module/account');
const verification = require('../helpers/verification');


exports.getToken = function(req, res) {
  var inputData          = req.query;
  const columnName       = ['account', 'password'];

  if (!verification.verifyColumnIsExist(columnName, inputData)) {

    res.status(403).end();
  } else {
    account.verifyLoginInfo(inputData, res);

  }
};

exports.updateProfile = function(req, res) {
  var inputData           = Object.assign({}, req.body, req.headers)
  const headerColumnName  = ['member_id', 'token'];

  if (!isEmpty(req.body)) {
    if (!verification.verifyColumnIsExist(headerColumnName, inputData)) {

      res.status(403).end();
    } else {
      if (!verification.verifyToken(inputData.member_id, inputData.token)) {

        res.status(403).end();
      } else {

        account.update(inputData, res);
      }
    }

  } else {
    res.status(403).end();

  }
};
