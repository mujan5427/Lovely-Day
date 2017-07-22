const express    = require('express');
const experience = require('../controller/experience');
const account    = require('../controller/account');
const favourite  = require('../controller/favourite');

const router      = express.Router();
const API_VERSION = `1.0`;


router.get(`/${ API_VERSION }/token`, function (req, res) {

  account.getToken(req, res);
});

router.get(`/${ API_VERSION }/experience`, function (req, res) {

  experience.getExperienceList(req, res);
});

router.post(`/${ API_VERSION }/favourite`, function (req, res) {

  favourite.addFavourite(req, res);
});

router.delete(`/${ API_VERSION }/favourite`, function (req, res) {

  favourite.deleteFavourite(req, res);
});

router.put(`/${ API_VERSION }/profile`, function (req, res) {

  account.updateProfile(req, res);
});

router.get(`/${ API_VERSION }/check/email`, function (req, res) {

  account.checkEmail(req, res);
});

router.post(`/${ API_VERSION }/signup`, function (req, res) {

  account.signup(req, res);
});

module.exports = router;
