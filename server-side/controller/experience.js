const experience   = require('../module/experience');
const verification = require('../helpers/verification');


exports.getExperienceList = function(req, res) {
  var inputData           = Object.assign({}, req.query, req.headers)
  const headerColumnName  = ['member_id', 'token'];
  const requestColumnName = ['item_limit', 'current_page'];
  const columnName        = headerColumnName.concat(requestColumnName);

  if (!verification.verifyInputColumn(columnName, inputData)) {

    res.status(403).end();
  } else {
    experience.getAllExperience(inputData, res);
  }
};
