const isEmpty      = require('is-empty');
const error        = require('../helpers/error');
const experience   = require('../module/experience');
const verification = require('../helpers/verification');


// Required : item_limit、current_page、type、region
exports.getExperienceList = function(req, res) {
  const inputData           = Object.assign({}, req.query, req.headers)
  const requestColumnName = ['item_limit', 'current_page', 'type', 'region'];
  const columnName        = requestColumnName;

  try {
    verification.verifyColumnIsExist(columnName, inputData);

    if (!isEmpty(inputData.member_id)) { verification.verifyToken(inputData.member_id, inputData.token); }

    experience.getExperienceListTotal(inputData)
    .then(value => experience.getAllExperience(inputData, value.total))
    .then(value => res.json(value))
    .catch(err => { error.analysisErrorObject(err, res) });

  } catch(err) {
    error.analysisErrorObject(err, res);
  }
};

// Required : experience_id
exports.getExperience = function(req, res) {
  const inputData           = Object.assign({}, req.params, req.headers);
  const requestColumnName = ['experience_id'];
  const columnName        = requestColumnName;

  try {
    verification.verifyColumnIsExist(columnName, inputData);

    if (!isEmpty(inputData.member_id)) { verification.verifyToken(inputData.member_id, inputData.token); }

    experience.getExperienceDetail(inputData)
    .then(value => res.json(value))
    .catch(err => { error.analysisErrorObject(err, res) });

  } catch(err) {
    error.analysisErrorObject(err, res);
  }
};

exports.getExperienceForNavigation = function(req, res) {
  try {
    experience.getExperienceListByType()
    .then(value => res.json(value))
    .catch(err => { error.analysisErrorObject(err, res) });

  } catch(err) {
    error.analysisErrorObject(err, res);
  }
};
