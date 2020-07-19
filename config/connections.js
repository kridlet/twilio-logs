/* eslint-disable no-console */
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
connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  connection.query('CREATE DATABASE IF NOT EXISTS twilioLog', (err) => {

    if (err) {
      console.error(`error creating database: ${err.stack}`);
      return;
    }
    let sql = 'USE twilioLog;';
    connection.query(sql, (err) => {
      if (err) throw err;
      sql =        var sql = `     
     SET NAMES utf8;
     SET FOREIGN_KEY_CHECKS = 0;
     DROP TABLE IF EXISTS \`smsLog\`;
     CREATE TABLE \`smsLog\` (
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
      connection.query(sql, (err) => {
        if (err) throw err;
        sql = 'select * from smsLog';
        connection.query(sql, (err) => {
          if (err) throw err;
        });
        console.log('smsLog table created');
      });
      console.log('using twilioLog');
    });
    console.log('twilioLog database created');
  });
  console.log(`connected as id ${connection.threadId}`);
});

// Export connection
module.exports = connection;
