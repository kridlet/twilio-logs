import twilioLog from './models/twilioModels.js';

const afterDate = '2020-07-16';
const beforeDate = '2020-07-17';
const messageLimit = 10;

twilioLog.fetchSmsMessages(afterDate, beforeDate, messageLimit);
