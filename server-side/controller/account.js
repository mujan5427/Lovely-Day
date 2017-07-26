const isEmpty      = require('is-empty');
const error        = require('../helpers/error');
const account      = require('../module/account');
const verification = require('../helpers/verification');


// Required : email、password
exports.getToken = function(req, res) {
  const inputData  = req.query;
  const columnName = ['email', 'password'];

  try {
    verification.verifyColumnIsExist(columnName, inputData);
    account.verifyLoginInfo(inputData, res);

  } catch(err) {
    error.analysisErrorObject(err, res);
  }
};

// Required : member_id、token
exports.updateProfile = function(req, res) {
  const inputData        = Object.assign({}, req.body, req.headers);
  const headerColumnName = ['member_id', 'token'];
  const columnName       = headerColumnName;

  try {
    verification.verifyColumnIsExist(columnName, inputData);
    verification.verifyToken(inputData.member_id, inputData.token);
    account.update(inputData, res);

  } catch(err) {
    error.analysisErrorObject(err, res);
  }
};

// Required : email
exports.checkEmail = function(req, res) {
  const inputData  = req.query;
  const columnName = ['email'];

  try {
    verification.verifyColumnIsExist(columnName, inputData);
    account.checkEmail(inputData, res);

  } catch(err) {
    error.analysisErrorObject(err, res);
  }
};

// Required : email、first_name、last_name、password、birthday
exports.signup = function(req, res) {
  const inputData  = req.body;
  const columnName = ['email', 'first_name', 'last_name', 'password', 'birthday'];

  try {
    verification.verifyColumnIsExist(columnName, inputData);
    account.add(inputData, res);

  } catch(err) {
    error.analysisErrorObject(err, res);
  }
};

// Required : member_id、token
exports.getProfile = function(req, res) {
  const inputData        = req.headers;
  const headerColumnName = ['member_id', 'token'];
  const columnName       = headerColumnName;

  try {
    verification.verifyColumnIsExist(columnName, inputData);
    verification.verifyToken(inputData.member_id, inputData.token)
    account.get(inputData, res);

  } catch(err) {
    error.analysisErrorObject(err, res);
  }
};
