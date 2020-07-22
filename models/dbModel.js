// Import MySQL connection.
import dbClient from '../config/dbConnect.js';
import moment from 'moment';
import fs from 'fs';
const fullLogFile = 'smsLog.json';

const dbLog = {
// add the individual twilio log record into the mysql db
  logMessages: (message) => {
    let sql = 'INSERT INTO smsLog (accountSid, body, dateCreated, dateUpdated, dateSent, direction, errorCode, errorMessage, \`from\`, messageingServiceSid, numMedia, numSegments, price, sid, status, \`to\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE accountSid=VALUES(accountSid)'
    dbClient.query(sql, [message.accountSid, message.body, moment(message.dateCreated).format('YYYY-MM-DD HH:MM:SS'), moment(message.dateUpdated).format('YYYY-MM-DD HH:MM:SS'), moment(message.dateSent).format('YYYY-MM-DD HH:MM:SS'), message.direction, message.errorCode, message.errorMessage, message.from, message.messageingServiceSid, message.numMedia, message.numSegments, message.price, message.sid, message.status, message.to], function (err, result) {
      if (err) throw err;
      fs.appendFile(fullLogFile, JSON.stringify(message, null, 4), function (err) {
        if (err) console.log(err)
      })
      return result;
    })
  },
  // grab the latest log date that we have stored locally
  mostRecentLog: (twilioAccountSid, fetchMessagesCallback) => {
    let sql = 'SELECT MAX(dateSent) AS mostRecentLog FROM smsLog WHERE accountSid = ?'
    dbClient.query(sql, [twilioAccountSid], function (err, result) {
      if (err) throw err
      // call fetchMessages (function passed in as callback) with the formatted most recent date as the parameter
      // console.log ('most recent date database date = '+result[0].mostRecentLog);
      fetchMessagesCallback(moment(result[0].mostRecentLog).format('YYYY-MM-DD'));
      return result;
    })
  }
};

// Export the database functions for the controller
export default dbLog;
