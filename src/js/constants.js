var constants;

if (process.env.FIREBASE_APP_URL && process.env.READABILITY_APP_URL) {
  constants = {
    FIREBASE_APP_URL: process.env.FIREBASE_APP_URL,
    READABILITY_APP_URL: process.env.READABILITY_APP_URL
  }
} else {
  constants = require('./config');
}

module.exports = constants;
