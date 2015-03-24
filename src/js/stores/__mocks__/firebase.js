var MockFirebase = require('mockfirebase').MockFirebase;

var firebaseStub = function (url) {
  fireRef = new MockFirebase(url)
  fireRef.autoFlush();
  return fireRef;
}

module.exports = firebaseStub;
