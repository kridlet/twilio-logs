
import Twilio from 'twilio';
import twilioConnect from '../twilioKeys.js';
import logDb from './dbModel.js'

const twilioLog = {
  fetchSmsMessages(afterDate, beforeDate, messageLimit) {
    const client = new Twilio(twilioConnect.accountSid, twilioConnect.authToken);
    client.messages
      .list({
        limit: messageLimit,
        dateSentAfter: afterDate,
        dateSentBefore: beforeDate,
      })
      .then(messages => messages.forEach((m) => {
        console.log(m.body);
        logDb.insertOne(m.accountSid, m.body, m.dateCreated,
          m.dateSent, m.direction, m.errorCode, m.errorMessage,
          m.from, m.messageingServiceSid, m.numMedia, m.numSegments,
          m.price, m.sid, m.status, m.to);
      }));
  },
};

export default twilioLog;
