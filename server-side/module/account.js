const db          = require('./database');
const sha3_256    = require('js-sha3').sha3_256;
const PRIVATE_KEY = 'lovelyday';


var account = {
  verifyLoginInfo: function (loginInfo, res) {
    const sqlStatement = `
      SELECT id
      FROM \`account\`
      WHERE \`account\` = ?
      AND \`password\` = ?`;

    const sqlPlaceholder = [loginInfo.account, sha3_256(`${ loginInfo.password }${ PRIVATE_KEY }`)];

    db.query(sqlStatement, sqlPlaceholder, (error, rows) => {

      if (rows.length > 0) {
        var responseData = {
          token: sha3_256(`${ new Date().getTime() }${ PRIVATE_KEY }`)
        };

        res.json(responseData);
      } else {
        res.status(403).end();

      }
    });
  }
};

module.exports = account;
