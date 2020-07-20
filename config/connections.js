// import dotenv from 'dotenv';
// dotenv.config();
// instead initialize node with: node -r dotenv/config server.js
import mysql from 'mysql';
import dbConnect from '../dbKeys.js';

// connection information
const dbConnection = mysql.createConnection({
  port: 3306,
  host: dbConnect.dbHost,
  user: dbConnect.dbUser,
  password: dbConnect.dbPassword,
});

// connect to db and validate function/permission - create db, create table, select from table
dbConnection.connect((connectErr) => {
  if (connectErr) {
    console.error(`error connecting: ${connectErr.stack}`); // log messages should go somewhere useful
    return;
  }
  dbConnection.query('CREATE DATABASE IF NOT EXISTS twilioLog', (createDbErr) => {
    if (createDbErr) {
      console.error(`error creating database: ${createDbErr.stack}`); // log messages should go somewhere useful
      return;
    }
    let sql = 'USE twilioLog;';
    dbConnection.query(sql, (useDbErr) => {
      if (useDbErr) throw useDbErr;
      sql = 'CREATE TABLE IF NOT EXISTS smsLog (accountSid varchar(32) DEFAULT NULL, body varchar(1600) DEFAULT NULL, dateCreated datetime DEFAULT NULL, dateSent datetime DEFAULT NULL, direction varchar(10) DEFAULT NULL, errorCode smallint(6) DEFAULT NULL, errorMessage varchar(500) DEFAULT NULL, `from` varchar(15) DEFAULT NULL, messageingServiceSid varchar(32) DEFAULT NULL, numMedia tinyint(4) DEFAULT NULL, numSegments tinyint(4) DEFAULT NULL, price decimal(7,5) DEFAULT NULL, sid varchar(32) DEFAULT NULL, `status` varchar(15) DEFAULT NULL, `to` varchar(15) DEFAULT NULL);';
      dbConnection.query(sql, (createTblErr) => {
        if (createTblErr) throw createTblErr;
        sql = 'select * from smsLog limit 100';
        dbConnection.query(sql, (selectTblErr, selectTblResult) => {
          if (selectTblErr) throw selectTblErr;
          if (!selectTblResult.length > 100) {
            console.log('smsLog table contains data'); // log messages should go somewhere useful
          }
        });
        console.log('smsLog table created'); // log messages should go somewhere useful
      });
      console.log('using twilioLog'); // log messages should go somewhere useful
    });
    console.log('twilioLog database created'); // log messages should go somewhere useful
  });
  console.log(`connected as id ${dbConnection.threadId}`); // log messages should go somewhere useful
});

// Export connection
export default dbConnection;
