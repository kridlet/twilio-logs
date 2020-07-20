// Import MySQL connection.
import dbConnection from '../config/connections.js';

const logDb = {
  selectAll(cb) {
    const queryString = 'SELECT * FROM smsLog limit 10;';
    dbConnection(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne(accountSid, body, dateCreated, dateSent, direction, errorCode, errorMessage, from, messageingServiceSid, numMedia, numSegments, price, sid, status, to, cb) {
    const queryString = `INSERT INTO smsLog (accountSid, body, dateCreated, dateSent, direction, errorCode, errorMessage, from, messageingServiceSid, numMedia, numSegments, price, sid, status, to) VALUES ('${accountSid}', '${body}', '${dateCreated}', '${dateSent}', '${direction}', '${errorCode}', '${errorMessage}', '${from}', '${messageingServiceSid}', '${numMedia}', '${numSegments}', '${price}', '${sid}', '${status}', '${to}')`;
    dbConnection(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
};

// Export the database functions for the controller
export default logDb;
