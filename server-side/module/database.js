const mysql = require('mysql');


// database config
const singleQueryConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345678',
  database : 'lovely_day'
});

const multipleQueryConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345678',
  database : 'lovely_day',
  multipleStatements: true
});

singleQueryConnection.connect();
multipleQueryConnection.connect();

exports.singleQuery   = singleQueryConnection;
exports.multipleQuery = multipleQueryConnection;
