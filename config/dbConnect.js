// import dotenv from 'dotenv';
// dotenv.config();
// instead initialize node with: node -r dotenv/config server.js
import mysql from 'mysql';
import dbConnect from '../dbKeys.js';

// connection information
const dbClient = mysql.createConnection({
  port: 3306,
  host: dbConnect.dbHost,
  user: dbConnect.dbUser,
  password: dbConnect.dbPassword,
  database: dbConnect.dbName,
  charset: 'utf8mb4' // necessary to store emojis in mysql db
});

// Export connection
export default dbClient;
