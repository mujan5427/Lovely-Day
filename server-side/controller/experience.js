const isEmpty      = require('is-empty');
const experience   = require('../module/experience');
const verification = require('../helpers/verification');


exports.getExperienceList = function(req, res) {
  var inputData           = Object.assign({}, req.query, req.headers)
  const headerColumnName  = ['member_id', 'token'];
  const requestColumnName = ['item_limit', 'current_page'];
  const columnName        = headerColumnName.concat(requestColumnName);

  if (!verification.verifyColumnIsExist(columnName, inputData)) {

    res.status(403).end();
  } else {
    if (!verification.verifyToken(inputData.member_id, inputData.token)) {

      res.status(403).end();
    } else {

      experience.getAllExperience(inputData, res);
    }
  }
};

exports.getExperience = function(req, res) {
  var inputData           = Object.assign({}, req.params, req.headers);
  const requestColumnName = ['experience_id'];
  const columnName        = requestColumnName;

  if (!verification.verifyColumnIsExist(columnName, inputData)) {
    res.status(500).end();

  } else {
    if (!isEmpty(inputData.member_id) && !verification.verifyToken(inputData.member_id, inputData.token)) {
      res.status(500).end();

    } else {
      experience.getExperienceDetail(inputData, res);

    }
  }
};
