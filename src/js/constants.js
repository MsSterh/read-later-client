import constants from './config';

if (process.env.FIREBASE_APP_URL && process.env.READABILITY_APP_URL) {
  constants = {
    FIREBASE_APP_URL: process.env.FIREBASE_APP_URL,
    READABILITY_APP_URL: process.env.READABILITY_APP_URL
  }
}

export default constants;
