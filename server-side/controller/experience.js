const isEmpty      = require('is-empty');
const error        = require('../helpers/error');
const experience   = require('../module/experience');
const verification = require('../helpers/verification');


exports.getExperienceList = function(req, res) {
  var inputData           = Object.assign({}, req.query, req.headers)
  const requestColumnName = ['item_limit', 'current_page', 'type', 'region'];
  const columnName        = requestColumnName;

  try {
    verification.verifyColumnIsExist(columnName, inputData);

    if (!isEmpty(inputData.member_id)) { verification.verifyToken(inputData.member_id, inputData.token); }

    experience.getAllExperience(inputData, res);

  } catch(err) {
    error.analysisErrorObject(err, res);
  }
};

exports.getExperience = function(req, res) {
  var inputData           = Object.assign({}, req.params, req.headers);
  const requestColumnName = ['experience_id'];
  const columnName        = requestColumnName;

  try {
    verification.verifyColumnIsExist(columnName, inputData);

    if (!isEmpty(inputData.member_id)) { verification.verifyToken(inputData.member_id, inputData.token); }

    experience.getExperienceDetail(inputData, res);

  } catch(err) {
    error.analysisErrorObject(err, res);
  }
};

exports.getExperienceForNavigation = function(req, res) {
  try {
    experience.getExperienceListByType(res);

  } catch(err) {
    error.analysisErrorObject(err, res);
  }
};
