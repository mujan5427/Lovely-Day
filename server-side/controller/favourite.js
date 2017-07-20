const favourite    = require('../module/favourite');
const verification = require('../helpers/verification');


exports.addFavourite = function(req, res) {

  var inputData           = Object.assign({}, req.body, req.headers)
  const headerColumnName  = ['member_id', 'token'];
  const requestColumnName = ['experience_id'];
  const columnName        = headerColumnName.concat(requestColumnName);

  if (!verification.verifyColumnIsExist(columnName, inputData)) {

    res.status(403).end();
  } else {
    if (!verification.verifyToken(inputData.member_id, inputData.token)) {

      res.status(403).end();
    } else {

      favourite.add(inputData, res);
    }
  }
};

exports.deleteFavourite = function(req, res) {

  var inputData           = Object.assign({}, req.body, req.headers)
  const headerColumnName  = ['member_id', 'token'];
  const requestColumnName = ['experience_id'];
  const columnName        = headerColumnName.concat(requestColumnName);

  if (!verification.verifyColumnIsExist(columnName, inputData)) {

    res.status(403).end();
  } else {
    if (!verification.verifyToken(inputData.member_id, inputData.token)) {

      res.status(403).end();
    } else {

      favourite.delete(inputData, res);
    }
  }
};
