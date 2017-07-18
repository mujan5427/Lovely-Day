const express    = require('express');
const experience = require('../controller/experience');

const router      = express.Router();
const API_VERSION = `1.0`;


router.get(`/${ API_VERSION }/experience`, function (req, res) {

  experience.getExperienceList(req, res);
});

module.exports = router;
