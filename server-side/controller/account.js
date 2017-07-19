const account      = require('../module/account');
const verification = require('../helpers/verification');


exports.getToken = function(req, res) {
  var inputData          = req.query;
  const columnName       = ['account', 'password'];

  if (!verification.verifyInputColumn(columnName, inputData)) {

    res.status(403).end();
  } else {
    account.verifyLoginInfo(inputData, res);

  }
};
