const isEmpty     = require('is-empty');
const db          = require('./database');
const errorConfig = require('../error_config');


exports.getAllExperience = function (inputData) {
  const itemLimit   = Number(inputData.item_limit);
  const currentPage = Number(inputData.current_page) <= 1 ? 0 : (Number(inputData.current_page) - 1) * itemLimit;
  var syntheticWhereCondition, accountId, sqlStatement, sqlPlaceholder, type,
      region, responseData, preparedData, images;


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

  sqlStatement = `
    SELECT experience.id, experience.title, experience.price, experience.content, experience.brief, experience.cancel_method, experience.images, experience.region, experience.type, IF(favorite.favorited, 'true', 'false') as favorited
    FROM experience
    LEFT JOIN \`favorite\` ON experience.id = favorite.experience_id AND favorite.account_id = ?
    LEFT JOIN \`host\` ON host.experience_id = experience.id
    ${syntheticWhereCondition}
    ORDER BY id ASC
    LIMIT ?, ?`;

  sqlPlaceholder = [accountId, currentPage, itemLimit];

  return new Promise(function(resolve, reject) {
    db.singleQuery.query(sqlStatement, sqlPlaceholder, (error, rows) => {
      if (error) {
        return reject({type: 'database', message: error.code});
      }

      if (rows.length > 0) {

        preparedData = rows.map(row => {
          images = row.images.split(',');
          images = images.map(image => `/assets/${ image }.jpg`);

          Object.assign(row, {favorited: row.favorited === 'true'});
          Object.assign(row, {images: images});

          return row;
        });

        responseData = {
          status: 'ok',
          dataCount: rows.length,
          items: preparedData
        };

        resolve(responseData);
      } else {
        reject({type: 'client', message: errorConfig.client[6].message});
      }
    });
  });
};

exports.getExperienceDetail = function (inputData) {
  const experienceId = inputData.experience_id;
  const accountId    = Number(inputData.member_id);
  var sqlStatement, sqlPlaceholder, images, responseData;


  if (isEmpty(accountId)) {
    sqlStatement = `
      SELECT experience.id, experience.title, experience.price, experience.content, experience.brief, experience.cancel_method, experience.images, experience.region, experience.type, IF(false, 'true', 'false') as favorited,
      host.name as host_name, host.image as host_image
      FROM \`experience\`
      LEFT JOIN \`host\` ON host.experience_id = experience.id
      WHERE experience.id = ?`;

      sqlPlaceholder = [experienceId];

  } else {
    sqlStatement = `
      SELECT experience.id, experience.title, experience.price, experience.content, experience.brief, experience.cancel_method, experience.images, experience.region, experience.type,  IF(favorite.favorited, 'true', 'false') as favorited,
      host.name as host_name, host.image as host_image
      FROM \`experience\`
      LEFT JOIN \`favorite\` ON experience.id = favorite.experience_id AND favorite.account_id = ?
      LEFT JOIN \`host\` ON host.experience_id = experience.id
      WHERE experience.id = ?`;

      sqlPlaceholder = [accountId, experienceId];

  }

  return new Promise(function(resolve, reject) {
    db.singleQuery.query(sqlStatement, sqlPlaceholder, (error, rows) => {
      if (error) {
        return reject({type: 'database', message: error.code});
      }

      if (rows.length > 0) {
        images       = rows[0].images.split(',');
        images       = images.map(image => `/assets/${ image }.jpg`);

        responseData = Object.assign({}, {status: 'ok'}, rows[0]);
        responseData = Object.assign({}, responseData, {host: {name: rows[0].host_name, image: rows[0].host_image}});
        responseData = Object.assign({}, responseData, {favorited: responseData.favorited === 'true'});
        responseData = Object.assign({}, responseData, {images: images});

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
  var sqlStatement1, sqlStatement2, sqlStatement3, sqlStatement4, sqlStatement5,
      sqlStatement6, sqlStatement7;
  var syntheticStatement;
  var outdoor_images, summer_camp_images, baking_images, lover_images,
      group_images, play_with_child_images, hand_made_images;
  var preparedOutdoorData, preparedSummerCampData, preparedBakingData,
      preparedLoverData, preparedGroupData, preparedPlayWithChildData,
      preparedHandMadeData;
  var responseData;


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

  syntheticStatement = `${sqlStatement1};${sqlStatement2};${sqlStatement3};${sqlStatement4};${sqlStatement5};${sqlStatement6};${sqlStatement7}`;

  return new Promise(function(resolve, reject) {
    db.multipleQuery.query(syntheticStatement, function (error, rows) {
      if (error) {
        return reject({type: 'database', message: error.code});
      }

      preparedOutdoorData = rows[0].map(row => {
        outdoor_images = row.images.split(',');
        outdoor_images = outdoor_images.map(image => `/assets/${ image }.jpg`);

        return Object.assign({}, row, {images: outdoor_images});
      });

      preparedSummerCampData = rows[1].map(row => {
        summer_camp_images = row.images.split(',');
        summer_camp_images = summer_camp_images.map(image => `/assets/${ image }.jpg`);

        return Object.assign({}, row, {images: summer_camp_images});
      });

      preparedBakingData = rows[2].map(row => {
        baking_images = row.images.split(',');
        baking_images = baking_images.map(image => `/assets/${ image }.jpg`);

        return Object.assign({}, row, {images: baking_images});
      });

      preparedLoverData = rows[3].map(row => {
        lover_images = row.images.split(',');
        lover_images = lover_images.map(image => `/assets/${ image }.jpg`);

        return Object.assign({}, row, {images: lover_images});
      });

      preparedGroupData = rows[4].map(row => {
        group_images = row.images.split(',');
        group_images = group_images.map(image => `/assets/${ image }.jpg`);

        return Object.assign({}, row, {images: group_images});
      });

      preparedPlayWithChildData = rows[5].map(row => {
        play_with_child_images = row.images.split(',');
        play_with_child_images = play_with_child_images.map(image => `/assets/${ image }.jpg`);

        return Object.assign({}, row, {images: play_with_child_images});
      });

      preparedHandMadeData = rows[6].map(row => {
        hand_made_images = row.images.split(',');
        hand_made_images = hand_made_images.map(image => `/assets/${ image }.jpg`);

        return Object.assign({}, row, {images: hand_made_images});
      });

      if (rows.length > 0) {
        responseData = {
          status: 'ok',
          items: {
            outdoor: preparedOutdoorData,
            summer_camp: preparedSummerCampData,
            baking: preparedBakingData,
            lover: preparedLoverData,
            group: preparedGroupData,
            play_with_child: preparedPlayWithChildData,
            hand_made: preparedHandMadeData
          }
        };

        resolve(responseData);
      } else {
        reject({type: 'client', message: errorConfig.client[6].message});
      }
    });
  });
};
