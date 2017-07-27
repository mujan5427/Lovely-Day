const error        = require('../helpers/error');
const favourite    = require('../module/favourite');
const verification = require('../helpers/verification');

// Required : member_id、token、experience_id
exports.addFavourite = function(req, res) {

  const inputData           = Object.assign({}, req.body, req.headers)
  const headerColumnName  = ['member_id', 'token'];
  const requestColumnName = ['experience_id'];
  const columnName        = headerColumnName.concat(requestColumnName);

  try {
    verification.verifyColumnIsExist(columnName, inputData);
    verification.verifyToken(inputData.member_id, inputData.token);
    favourite.add(inputData, res);

  } catch(err) {
    error.analysisErrorObject(err, res);
  }
};

// Required : member_id、token、experience_id
exports.deleteFavourite = function(req, res) {

  const inputData           = Object.assign({}, req.body, req.headers)
  const headerColumnName  = ['member_id', 'token'];
  const requestColumnName = ['experience_id'];
  const columnName        = headerColumnName.concat(requestColumnName);

  try {
    verification.verifyColumnIsExist(columnName, inputData);
    verification.verifyToken(inputData.member_id, inputData.token);
    favourite.delete(inputData, res);

  } catch(err) {
    error.analysisErrorObject(err, res);
  }
};
