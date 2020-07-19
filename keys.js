module.exports = {
  dbConnect = {
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
  },
  twilioConnect = {
    accountSid: process.env.TWILIO_SID,
    authToken: process.env.TWILIO_TOKEN,
  }
}

