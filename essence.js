// these are packages, loaded with npm or yarn (i.e. yarn add twilio)
// this will create packages.json and load the libraries into node_modules
const Twilio = require('twilio')
const mysql = require('mysql')

// twilio log data comes back with different date formats. using moment to standardize
const moment = require('moment')

// environmental variables - loaded when instantiating node with flag, like node -r dotenv/config logPullDb.js or with:
// import dotenv from 'dotenv';
// dotenv.config();
// see the .env.sample file for referrence
const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbName = 'twilioLog'
const twilioClient = new Twilio(accountSid, authToken)
const dbClient = mysql.createConnection({
  port: 3306,
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  charset: 'utf8mb4' // necessary to store emojis in mysql db
})

// add the individual twilio log record into the mysql db
const logMessages = (message) => {
  let sql = 'INSERT INTO smsLog (accountSid, body, dateCreated, dateUpdated, dateSent, direction, errorCode, errorMessage, \`from\`, messageingServiceSid, numMedia, numSegments, price, sid, status, \`to\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE accountSid=VALUES(accountSid)'
  dbClient.query(sql, [message.accountSid, message.body, moment(message.dateCreated).format('YYYY-MM-DD HH:MM:SS'), moment(message.dateUpdated).format('YYYY-MM-DD HH:MM:SS'), moment(message.dateSent).format('YYYY-MM-DD HH:MM:SS'), message.direction, message.errorCode, message.errorMessage, message.from, message.messageingServiceSid, message.numMedia, message.numSegments, message.price, message.sid, message.status, message.to], function (err, result) {
    if (err) throw err
  })
}

// grab the latest log date that we have stored locally
const mostRecentLog = (twilioAccountSid, fetchMessagesCallback) => {
  let sql = 'SELECT MAX(dateSent) AS mostRecentLog FROM smsLog WHERE accountSid = ?'
  dbClient.query(sql, [twilioAccountSid], function (err, result) {
    if (err) throw err
    // call fetchMessages (function passed in as callback) with the formatted most recent date as the parameter
    // the most recent date has 5 minutes shaved off, to account for twilio log wierdness
    fetchMessagesCallback(moment(result[0].mostRecentLog).subtract(5, 'minutes').format('YYYY-MM-DD'))
  })
}

// grab all the SMS log records for the provided API account, that were generated after the provided date
// notes on twilio's quirks:
//  1. logs are returned in descending order by date (so crashed jobs need to be re-run)
//  2. log dates seem, well, i don't know. but i am pulling 5 minutes more than necessary to ensure full accounting
const fetchMessages = (afterDate) => {
  twilioClient.messages.each(
    {
      // parameters for the log search
      dateSentAfter: afterDate
    }, (messages) => { logMessages(messages) }
  )
}

mostRecentLog(accountSid, fetchMessages)
