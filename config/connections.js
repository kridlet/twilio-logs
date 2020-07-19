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
  connection.query("CREATE DATABASE IF NOT EXISTS twilioLogs", function (err, result) {
    if (err) {
      console.error("error creating database: " + err.stack);
      return;
    }
    var sql = "USE twilio_logs;";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        var sql = `/*
        Source Server Type    : MySQL
        Source Host           : masterdb.echo19.com       
        Target Server Type    : MySQL
        File Encoding         : utf-8
        Date: 07/19/2020
       */
       
       SET NAMES utf8mb4;
       SET FOREIGN_KEY_CHECKS = 0;
       
       -- ----------------------------
       --  Table structure for SmsLog
       -- ----------------------------
       DROP TABLE IF EXISTS \`SmsLog\`;
       CREATE TABLE \`SmsLog\` (
         \`accountSid\` varchar(32) DEFAULT NULL,
         \`body\` varchar(1600) DEFAULT NULL,
         \`dateCreated\` datetime DEFAULT NULL,
         \`dateSent\` datetime DEFAULT NULL,
         \`direction\` varchar(10) DEFAULT NULL,
         \`errorCode\` smallint(6) DEFAULT NULL,
         \`errorMessage\` varchar(500) DEFAULT NULL,
         \`from\` varchar(15) DEFAULT NULL,
         \`messageingServiceSid\` varchar(32) DEFAULT NULL,
         \`numMedia\` tinyint(4) DEFAULT NULL,
         \`numSegments\` tinyint(4) DEFAULT NULL,
         \`price\` decimal(7,5) DEFAULT NULL,
         \`sid\` varchar(32) DEFAULT NULL,
         \`status\` varchar(15) DEFAULT NULL,
         \`to\` varchar(15) DEFAULT NULL
       ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
       
       SET FOREIGN_KEY_CHECKS = 1;
       `;
        connection.query(sql, function (err, result) {
          if (err) throw err;
          var sql = "select * from SmsLog";
          connection.query(sql, function (err, result) {
            if (err) throw err;
          });
          console.log("SmsLog table created");
        });
      console.log("using twilioLogs");
    });
    console.log("twilioLogs database created");
  });
  console.log("connected to as id " + connection.threadId);
});

// Export connection
module.exports = connection;