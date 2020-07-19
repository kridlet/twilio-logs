import Twilio from 'twilio';
import { appendFile } from 'fs';

const client = new Twilio(accountSid, authToken);

// testing setup
const afterDate = '2020-07-16';
const beforeDate = '2020-07-17';
const messageLimit = 1000;
const fullLogFile = 'smsLog.json';

const logMessages = (messages) => {
  // add full message to the log file
  appendFile(fullLogFile, JSON.stringify(messages, null, 4), function (err) {
    if (err) console.log(err);
  });
};

const fetchMessages = () => {
  client.messages
    .each(
      {
        limit: messageLimit,
        dateSentAfter: afterDate,
        dateSentBefore: beforeDate
      }, (messages) => {
        logMessages(messages);
      }
    );
};
