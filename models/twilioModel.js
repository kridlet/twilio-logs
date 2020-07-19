// Import MySQL connection.
import { query } from '../config/connections.js';

const twilioLogDb = {
  selectAll(cb) {
    const queryString = 'SELECT * FROM smsLog limit 10;';
    query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne(sid, cb) {
    const queryString = `INSERT INTO smsLog (SID) VALUES ('${sid}', 0)`;
    query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
};

// Export the database functions for the controller
export default twilioLogDb;
