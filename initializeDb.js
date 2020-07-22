import dbConnection from './config/dbConnect.js';

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
      sql = 'CREATE TABLE IF NOT EXISTS smsLog (accountSid varchar(34) DEFAULT NULL, body varchar(1600) CHARACTER SET utf8mb4 DEFAULT NULL, dateCreated datetime DEFAULT NULL, dateUpdated datetime DEFAULT NULL, dateSent datetime DEFAULT NULL, direction varchar(15) DEFAULT NULL, errorCode smallint(6) DEFAULT NULL, errorMessage varchar(500) DEFAULT NULL, `from` varchar(15) DEFAULT NULL, messageingServiceSid varchar(34) DEFAULT NULL, numMedia tinyint(4) DEFAULT NULL, numSegments tinyint(4) DEFAULT NULL, price decimal(7,5) DEFAULT NULL, sid varchar(34) NOT NULL, `status` varchar(15) DEFAULT NULL, `to` varchar(15) DEFAULT NULL, PRIMARY KEY (sid), KEY dateSent (dateSent,accountSid) USING BTREE) DEFAULT CHARSET=utf8mb4;';
      dbConnection.query(sql, (createTblErr) => {
        if (createTblErr) throw createTblErr;
        console.log('smsLog table created'); // log messages should go somewhere useful
      });
      console.log('using twilioLog'); // log messages should go somewhere useful
    });
    console.log('twilioLog database created'); // log messages should go somewhere useful
  });
  console.log(`connected as id ${dbConnection.threadId}`); // log messages should go somewhere useful
});