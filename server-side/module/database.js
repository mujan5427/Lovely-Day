const mysql = require('mysql');


// database config
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345678',
  database : 'lovely_day'
});

connection.connect();

module.exports = connection;
