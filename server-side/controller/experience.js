const experience = require('../module/experience');

exports.getExperienceList = function(req, res) {

  experience.getAllExperience(res);
};
