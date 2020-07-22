import dbLog from './models/dbModel.js';
import twilioModel from './models/twilioModel.js';
import twilioConnect from './twilioKeys.js';

// add the individual twilio log record into the mysql db
// logMessages(message);

// grab the latest log date that we have stored locally
// mostRecentLog(twilioAccountSid, fetchMessagesCallback);

// grab all the SMS log records for the provided API account, that were generated after the provided date
// notes on twilio's quirks:
//  1. logs are returned in descending order by date (so crashed jobs need to be re-run)
//  2. log dates seem, well, i don't know. but i am pulling 5 minutes more than necessary to ensure full accounting
// fetchMessages(afterDate);

dbLog.mostRecentLog(twilioConnect.accountSid, twilioModel.fetchMessages);
