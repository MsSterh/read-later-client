import { MockFirebase } from 'mockfirebase';

var FirebaseStub = function(url) {
  FirebaseStub._singletonInstance = FirebaseStub._singletonInstance || {};

  if (!FirebaseStub._singletonInstance[url]) {
    fireRef = new MockFirebase(url);
    fireRef.autoFlush();
    FirebaseStub._singletonInstance[url] = fireRef;
  }

  return FirebaseStub._singletonInstance[url];
}

export default FirebaseStub;
