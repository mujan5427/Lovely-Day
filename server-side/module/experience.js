const isEmpty     = require('is-empty');
const db          = require('./database');
const errorConfig = require('../error_config');


exports.getAllExperience = function (inputData) {

  // check type、region
  var syntheticWhereCondition, accountId, type, region;

  if (inputData.type !== 'none' || inputData.region !== 'none') {
    type   = inputData.type.split(',');
    region = inputData.region.split(',');
    type   = type.map(item => `'${item}'`);
    region = region.map(item => `'${item}'`);

    if (inputData.type === 'none') {
      syntheticWhereCondition = `WHERE region IN (${region})`;
    }
    if (inputData.region === 'none') {
      syntheticWhereCondition = `WHERE type IN (${type})`;
    }
    if (inputData.type !== 'none' && inputData.region !== 'none') {
      syntheticWhereCondition = `WHERE type IN (${type}) AND region IN (${region})`;
    }

  } else {
    syntheticWhereCondition = '';
  }

  // check member_id
  if (isEmpty(inputData.member_id)) {
    accountId = 0;

  } else {
    accountId = Number(inputData.member_id);

  }

  const sqlStatement = `
    SELECT experience.*,  IF(favorite.favorited, 'true', 'false') as favorited
    FROM experience
    LEFT JOIN \`favorite\` ON experience.id = favorite.experience_id AND favorite.account_id = ?
    LEFT JOIN \`host\` ON host.experience_id = experience.id
    ${syntheticWhereCondition}
    ORDER BY id ASC
    LIMIT ?, ?`;

  const itemLimit   = Number(inputData.item_limit);
  const currentPage = Number(inputData.current_page) <= 1 ? 0 : (Number(inputData.current_page) - 1) * itemLimit;

  const sqlPlaceholder = [accountId, currentPage, itemLimit];

  return new Promise(function(resolve, reject) {
    db.singleQuery.query(sqlStatement, sqlPlaceholder, (error, rows) => {
      if (error) {
        return reject({type: 'database', message: error.code});
      }

      if (rows.length > 0) {
        var responseData = {
          status: 'ok',
          dataCount: rows.length,
          item: rows.map(row => Object.assign({}, row, {favorited: row.favorited === 'true'}))
        };

        resolve(responseData);
      } else {
        reject({type: 'client', message: errorConfig.client[6].message});
      }
    });
  });
};

exports.getExperienceDetail = function (inputData) {
  var sqlStatement, sqlPlaceholder;

  if (isEmpty(inputData.member_id)) {
    sqlStatement = `
      SELECT experience.*, IF(false, 'true', 'false') as favorited,
      host.name as host_name, host.image as host_image
      FROM \`experience\`
      LEFT JOIN \`host\` ON host.experience_id = experience.id
      WHERE experience.id = ?`;

      const experienceId = inputData.experience_id;

      sqlPlaceholder = [experienceId];

  } else {
    sqlStatement = `
      SELECT experience.*,  IF(favorite.favorited, 'true', 'false') as favorited,
      host.name as host_name, host.image as host_image
      FROM \`experience\`
      LEFT JOIN \`favorite\` ON experience.id = favorite.experience_id AND favorite.account_id = ?
      LEFT JOIN \`host\` ON host.experience_id = experience.id
      WHERE experience.id = ?`;

      const experienceId = inputData.experience_id;
      const accountId    = Number(inputData.member_id);

      sqlPlaceholder = [accountId, experienceId];

  }

  return new Promise(function(resolve, reject) {
    db.singleQuery.query(sqlStatement, sqlPlaceholder, (error, rows) => {
      if (error) {
        return reject({type: 'database', message: error.code});
      }

      if (rows.length > 0) {
        var responseData;

        responseData = Object.assign({}, {status: 'ok'}, rows[0]);
        responseData = Object.assign({}, responseData, {host: {name: rows[0].host_name, image: rows[0].host_image}});
        responseData = Object.assign({}, responseData, {favorited: responseData.favorited === 'true'});
        responseData = Object.assign({}, responseData, {images: responseData.images.split(',')});

        delete responseData.host_name;
        delete responseData.host_image;

        resolve(responseData);
      } else {
        reject({type: 'client', message: errorConfig.client[6].message});
      }
    });
  });
};

exports.getExperienceListByType = function() {
  sqlStatement1 = `
    SELECT id, title, images, price
    FROM \`experience\`
    WHERE \`type\` = 'outdoor'
    ORDER BY id DESC
    LIMIT 4`;
  sqlStatement2 = `
    SELECT id, title, images, price
    FROM \`experience\`
    WHERE \`type\` = 'summer_camp'
    ORDER BY id DESC
    LIMIT 4`;
  sqlStatement3 = `
    SELECT id, title, images, price
    FROM \`experience\`
    WHERE \`type\` = 'baking'
    ORDER BY id DESC
    LIMIT 4`;
  sqlStatement4 = `
    SELECT id, title, images, price
    FROM \`experience\`
    WHERE \`type\` = 'lover'
    ORDER BY id DESC
    LIMIT 4`;
  sqlStatement5 = `
    SELECT id, title, images, price
    FROM \`experience\`
    WHERE \`type\` = 'group'
    ORDER BY id DESC
    LIMIT 4`;
  sqlStatement6 = `
    SELECT id, title, images, price
    FROM \`experience\`
    WHERE \`type\` = 'play_with_child'
    ORDER BY id DESC
    LIMIT 4`;
  sqlStatement7 = `
    SELECT id, title, images, price
    FROM \`experience\`
    WHERE \`type\` = 'hand_made'
    ORDER BY id DESC
    LIMIT 4`;

  var syntheticStatement = `${sqlStatement1};${sqlStatement2};${sqlStatement3};${sqlStatement4};${sqlStatement5};${sqlStatement6};${sqlStatement7}`;

  return new Promise(function(resolve, reject) {
    db.multipleQuery.query(syntheticStatement, function (error, rows) {
      if (error) {
        return reject({type: 'database', message: error.code});
      }

      if (rows.length > 0) {
        var responseData = {
          status: 'ok',
          items: {
            outdoor: rows[0],
            summer_camp: rows[1],
            baking: rows[2],
            lover: rows[3],
            group: rows[4],
            play_with_child: rows[5],
            hand_made: rows[6]
          }
        };

        resolve(responseData);
      } else {
        reject({type: 'client', message: errorConfig.client[6].message});
      }
    });
  });
};
