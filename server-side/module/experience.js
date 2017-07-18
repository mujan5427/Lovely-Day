const db = require('./database');

// This is example of experience module
var experience = {
  getAllExperience: function (res) {
    db.query(`SELECT name, price FROM experience`, (error, rows) => {

      var responseData = {
        dataCount: rows.length,
        item: rows
      };

      res.json(responseData);
      db.end();
    });
  }
};

module.exports = experience;
