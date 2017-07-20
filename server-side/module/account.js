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
          member_id: rows[0].id,
          token: sha3_256(`${ rows[0].id }${ PRIVATE_KEY }`)
        };

        res.json(responseData);
      } else {
        res.status(403).end();

      }
    });
  },
  generateToken: function (memberId) {
    return sha3_256(`${ memberId }${ PRIVATE_KEY }`);
  },
  update: function (inputData, res) {
    const sqlStatement = `
      UPDATE \`account\`
      SET ?
      WHERE id = ?
      LIMIT 1`;

    var needToModifyColumn = {};

    if (inputData.first_name) { needToModifyColumn['first_name'] = inputData.first_name }
    if (inputData.last_name) { needToModifyColumn['last_name'] = inputData.last_name }
    if (inputData.gender) { needToModifyColumn['gender'] = inputData.gender }
    if (inputData.birthday) { needToModifyColumn['birthday'] = inputData.birthday }
    if (inputData.language) { needToModifyColumn['language'] = inputData.language }
    if (inputData.education_level) { needToModifyColumn['education_level'] = inputData.education_level }
    if (inputData.interest) { needToModifyColumn['interest'] = inputData.interest }

    var memberId         = Number(inputData.member_id);
    const sqlPlaceholder = [needToModifyColumn, memberId];

    db.query(sqlStatement, sqlPlaceholder, (error, rows) => {

      if (error === null && rows.affectedRows === 1) {
        res.status(200).end();

      } else {
        res.status(403).end();

      }
    });
  }
};

module.exports = account;
