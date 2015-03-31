var MockFirebase = require('mockfirebase').MockFirebase;

var FirebaseStub = function(url) {
  fireRef = new MockFirebase(url)
  fireRef.autoFlush();
  return fireRef;
}

module.exports = FirebaseStub;
