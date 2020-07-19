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
      sql = 'CREATE TABLE IF NOT EXISTS smsLog (id int(11) NOT NULL AUTO_INCREMENT, SID varchar(40) DEFAULT NULL, dateImported datetime DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;';
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
