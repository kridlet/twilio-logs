// Import MySQL connection.
import twilioClient from '../config/twilioConnect.js';
import dbLog from './dbModel.js';
const twilioLog = {
  fetchMessages: (afterDate) => {
    // console.log ('after date = '+afterDate);
    twilioClient.messages.each(
      {
        // parameters for the log search
        dateSentAfter: afterDate
      }, (messages) => { dbLog.logMessages(messages) }
    )
  },
};

export default twilioLog;
