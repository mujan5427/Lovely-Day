const db          = require('./database');
const isEmpty     = require('is-empty');
const errorConfig = require('../error_config');
const sha3_256    = require('js-sha3').sha3_256;
const PRIVATE_KEY = 'lovelyday';


exports.verifyLoginInfo = function(loginInfo) {
  const sqlStatement = `
    SELECT id
    FROM \`account\`
    WHERE \`email\` = ?
    AND \`password\` = ?`;

  const email    = loginInfo.email;
  const password = sha3_256(`${ loginInfo.password }${ PRIVATE_KEY }`);

  const sqlPlaceholder = [email, password];

  return new Promise(function(resolve, reject) {
    db.singleQuery.query(sqlStatement, sqlPlaceholder, (error, rows) => {
      if (error) {
        return reject({type: 'database', message: error.code});
      }

      if (rows.length > 0) {
        var responseData = {
          status: 'ok',
          member_id: rows[0].id,
          token: sha3_256(`${ rows[0].id }${ PRIVATE_KEY }`)
        };

        resolve(responseData);
      } else {
        reject({type: 'client', message: errorConfig.client[5].message});
      }

    });
  });
};

exports.generateToken = function (memberId) {
  return sha3_256(`${ memberId }${ PRIVATE_KEY }`);
};

exports.update = function (inputData) {
  const sqlStatement = `
    UPDATE \`account\`
    SET ?
    WHERE id = ?
    LIMIT 1`;

  var needToModifyColumn = {};

  if (inputData.first_name) { needToModifyColumn['first_name'] = inputData.first_name }
  if (inputData.last_name) { needToModifyColumn['last_name'] = inputData.last_name }
  if (inputData.birthday) { needToModifyColumn['birthday'] = inputData.birthday }

  if (inputData.hasOwnProperty('gender')) {
    needToModifyColumn['gender'] = !isEmpty(inputData.gender) ? inputData.gender : null;
  }

  if (inputData.hasOwnProperty('language')) {
    needToModifyColumn['language'] = !isEmpty(inputData.language) ? inputData.language : null;
  }

  if (inputData.hasOwnProperty('education_level')) {
    needToModifyColumn['education_level'] = !isEmpty(inputData.education_level) ? inputData.education_level : null;
  }

  if (inputData.hasOwnProperty('interest')) {
    needToModifyColumn['interest'] = !isEmpty(inputData.interest) ? inputData.interest : null;
  }

  var memberId = Number(inputData.member_id);

  const sqlPlaceholder = [needToModifyColumn, memberId];

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

exports.checkEmail = function(inputData) {
  const sqlStatement = `
    SELECT email
    FROM \`account\`
    WHERE \`email\` = ?`;

  const sqlPlaceholder = [inputData.email];

  return new Promise(function(resolve, reject) {
    db.singleQuery.query(sqlStatement, sqlPlaceholder, (error, rows) => {
      if (error) {
        return reject({type: 'database', message: error.code});
      }

      if (rows.length > 0) {
        reject({type: 'client', message: errorConfig.client[4].message});

      } else {
        var responseData = {
          status: 'ok'
        };

        resolve(responseData);
      }
    });
  });
};

exports.add = function(inputData) {
  const sqlStatement = `
    INSERT INTO \`account\` (email, first_name, last_name, password, birthday)
    VALUES (?, ?, ?, ?, ?)`;

  const email      = inputData.email;
  const first_name = inputData.first_name;
  const last_name  = inputData.last_name;
  const password   = sha3_256(`${ inputData.password }${ PRIVATE_KEY }`);
  const birthday   = inputData.birthday;

  const sqlPlaceholder = [email, first_name, last_name, password, birthday];

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

exports.get = function(inputData) {
  const sqlStatement = `
    SELECT *
    FROM \`account\`
    WHERE \`id\` = ?
    LIMIT 1`;

  const memberId = inputData.member_id;

  const sqlPlaceholder = [memberId];

  return new Promise(function(resolve, reject) {
    db.singleQuery.query(sqlStatement, sqlPlaceholder, (error, rows) => {
      if (error) {
        return reject({type: 'database', message: error.code});
      }

      const year     = rows[0].birthday.getFullYear();
      const month    = (rows[0].birthday.getMonth()+1);
      const day      = rows[0].birthday.getDate();
      const birthday = `${ year }-${ month }-${ day }`;
      const interest = rows[0].interest !== null ? rows[0].interest.split(',') : rows[0].interest;

      if (rows.length > 0) {
        var responseData = {
          status: 'ok',
          first_name: rows[0].first_name,
          last_name: rows[0].last_name,
          gender: rows[0].gender,
          birthday: birthday,
          email: rows[0].email,
          language: rows[0].language,
          education_level: rows[0].education_level,
          interest: interest
        };

        resolve(responseData);
      } else {
        reject({type: 'client', message: errorConfig.client[6].message});

      }
    });
  });
};
