require('dotenv').config();
const mysql = require('mysql');
const keys = require('../keys.js');

// connection information
const connection = mysql.createConnection({
  port: 3306,
  host: keys.dbConnect.dbHost,
  user: keys.dbConnect.dbUser,
  password: keys.dbConnect.dbPassword,
  database: keys.dbConnect.dbName,
});

// connect to db
// Connect to the database
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  connection.query("CREATE DATABASE IF NOT EXISTS twilio_logs", function (err, result) {
    if (err) {
      console.error("error creating database: " + err.stack);
      return;
    }
    var sql = "USE twilio_logs;";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        var sql = "CREATE TABLE IF NOT EXISTS smsLogs (id int(11) NOT NULL AUTO_INCREMENT, SID varchar(40) DEFAULT NULL, dateImported datetime DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;";
        connection.query(sql, function (err, result) {
          if (err) throw err;
          var sql = "select * from smsLogs";
          connection.query(sql, function (err, result) {
            if (err) throw err;
          });
          console.log("smsLogs table created");
        });
      console.log("using twilio_logs");
    });
    console.log("twilio_logs database created");
  });
  console.log("connected to as id " + connection.threadId);
});

// Export connection
module.exports = connection;