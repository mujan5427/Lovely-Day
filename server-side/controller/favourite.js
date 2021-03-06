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
    favourite.add(inputData)
    .then(value => res.json(value))
    .catch(err => { error.analysisErrorObject(err, res) });

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
    favourite.delete(inputData)
    .then(value => res.json(value))
    .catch(err => { error.analysisErrorObject(err, res) });

  } catch(err) {
    error.analysisErrorObject(err, res);
  }
};

exports.getFavourite = function(req, res) {
  const inputData        = req.headers;
  const headerColumnName = ['member_id', 'token'];
  const columnName       = headerColumnName;

  try {
    verification.verifyColumnIsExist(columnName, inputData);
    verification.verifyToken(inputData.member_id, inputData.token)
    favourite.get(inputData)
    .then(value => res.json(value))
    .catch(err => { error.analysisErrorObject(err, res) });

  } catch(err) {
    error.analysisErrorObject(err, res);
  }
};
