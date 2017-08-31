const db          = require('./database');
const errorConfig = require('../error_config');


exports.add = function (inputData) {
  const sqlStatement = `
    INSERT INTO \`favorite\` (account_id, experience_id)
    VALUES (?, ?)`;

  const memberId     = Number(inputData.member_id);
  const experienceId = Number(inputData.experience_id);

  const sqlPlaceholder = [memberId, experienceId];

  return new Promise(function(resolve, reject) {
    db.singleQuery.query(sqlStatement, sqlPlaceholder, (error, rows) => {
      if (error) {
        return reject({type: 'database', message: error.code});
      }

      if (rows.affectedRows === 1) {
        var responseData = {
          status: 'ok'
        };

        resolve(responseData);

      } else {
        reject({type: 'client', message: errorConfig.client[5].message});

      }
    });
  });
};

exports.delete = function (inputData) {
  const sqlStatement = `
    DELETE FROM \`favorite\`
    WHERE account_id = ? AND experience_id = ?
    LIMIT 1`;

  var memberId     = Number(inputData.member_id);
  var experienceId = Number(inputData.experience_id);

  const sqlPlaceholder = [memberId, experienceId];

  return new Promise(function(resolve, reject) {
    db.singleQuery.query(sqlStatement, sqlPlaceholder, (error, rows) => {
      if (error) {
        return reject({type: 'database', message: error.code});
      }

      if (rows.affectedRows === 1) {
        var responseData = {
          status: 'ok'
        };

        resolve(responseData);

      } else {
        reject({type: 'client', message: errorConfig.client[5].message});

      }
    });
  });
};

exports.get = function (inputData) {
  const sqlStatement = `SELECT experience_id FROM \`favorite\` WHERE account_id = ?`;

  const memberId     = Number(inputData.member_id);

  const sqlPlaceholder = [memberId];

  return new Promise(function(resolve, reject) {
    db.singleQuery.query(sqlStatement, sqlPlaceholder, (error, rows) => {
      if (error) {
        return reject({type: 'database', message: error.code});
      }

      if (rows.length > 0) {

        var responseData = {
          status: 'ok',
          items: rows.map(row => row.experience_id)
        };

        resolve(responseData);

      } else {
        reject({type: 'client', message: errorConfig.client[5].message});

      }
    });
  });
};
