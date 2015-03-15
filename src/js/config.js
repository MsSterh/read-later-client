var config = process.env.FIREBASE_APP_URL ? { FIREBASE_APP_URL: process.env.FIREBASE_APP_URL } : require('./firebaseCredentials');

module.exports = config
