const db = require('./database');


var experience = {
  getAllExperience: function (inputData, res) {
    const sqlStatement = `
      SELECT experience.*,  IF(favorite.favorited, 'true', 'false') as favorited
      FROM experience
      LEFT JOIN favorite ON experience.id = favorite.experience_id AND favorite.account_id = ?
      LEFT JOIN account ON account.id = favorite.account_id
      ORDER BY id ASC
      LIMIT ?, ?`;

    var accountId   = Number(inputData.member_id);
    var itemLimit   = Number(inputData.item_limit);
    var currentPage = Number(inputData.current_page) <= 1 ? 0 : (Number(inputData.current_page) - 1) * itemLimit;

    const sqlPlaceholder = [accountId, currentPage, itemLimit];

    db.query(sqlStatement, sqlPlaceholder, (error, rows) => {

      if (rows.length > 0) {
        var responseData = {
          dataCount: rows.length,
          item: rows.map(row => Object.assign({}, row, {favorited: row.favorited === 'true'}))
        };

        res.json(responseData);
      } else {
        res.status(403).end();

      }
    });
  }
};

module.exports = experience;
