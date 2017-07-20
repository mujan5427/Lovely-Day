const db = require('./database');


var favourite = {
  add: function (inputData, res) {
    const sqlStatement = `
      INSERT INTO \`favorite\` (account_id, experience_id)
      VALUES (?, ?)`;

    var memberId     = Number(inputData.member_id);
    var experienceId = Number(inputData.experience_id);

    const sqlPlaceholder = [memberId, experienceId];

    db.query(sqlStatement, sqlPlaceholder, (error, rows) => {

      if (error === null && rows.affectedRows === 1) {
        res.status(200).end();

      } else {
        res.status(403).end();

      }
    });
  }
};

module.exports = favourite;
