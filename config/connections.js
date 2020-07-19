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
connection.connect(funtion (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  
})