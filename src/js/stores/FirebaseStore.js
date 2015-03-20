import Firebase from 'firebase';
import Reflux from 'reflux';

import constants from '../constants';
import FirebaseActions from '../actions/FirebaseActions';

var articlesRef = new Firebase(constants.FIREBASE_APP_URL).child('articles');

var FirebaseStore = Reflux.createStore({
  listenables: FirebaseActions,

  init() {
    articlesRef.on('value', FirebaseActions.receiveData);
  },

  onReceiveData(snapshot) {
    this.trigger(snapshot.val());
  },

  onRemoveItem(id) {
    articlesRef.child(id).remove();
  },

  onUpdateItem(id, value) {
    articlesRef.child(id).update(value);
  }
});

export default FirebaseStore;
