const express    = require('express');
const experience = require('../controller/experience');
const account    = require('../controller/account');

const router      = express.Router();
const API_VERSION = `1.0`;


router.get(`/${ API_VERSION }/token`, function (req, res) {

  account.getToken(req, res);
});

router.get(`/${ API_VERSION }/experience`, function (req, res) {

  experience.getExperienceList(req, res);
});

module.exports = router;
