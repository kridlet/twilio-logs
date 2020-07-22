// import dotenv from 'dotenv';
// dotenv.config();
// instead initialize node with: node -r dotenv/config server.js
import Twilio from 'twilio';
import twilioConnect from '../twilioKeys.js';

const twilioClient = new Twilio(twilioConnect.accountSid, twilioConnect.authToken);

// Export connection
export default twilioClient;
