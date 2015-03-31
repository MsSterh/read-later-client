jest.dontMock('../FirebaseStore');
jest.dontMock('../../constants');
jest.dontMock('../../actions/FirebaseActions');

import Firebase from 'firebase';
import constants from '../../constants';
import FirebaseStore from '../FirebaseStore';
import FirebaseActions from '../../actions/FirebaseActions';

describe('FirebaseStore', () => {
  var snapshotMock, listener;

  beforeEach(() => {
    snapshotMock = {
      val() {
        return {
          content: 'test content'
        }
      }
    }
  });

  beforeEach(() => {
    listener = jest.genMockFunction();
  });

  describe('init', () => {
    it('subscribes to changes in Firebase', () => {
      var fireRef = new Firebase(constants.FIREBASE_APP_URL);
      var articlesRef = fireRef.child('articles');

      spyOn(FirebaseActions, 'receiveData').andCallThrough();
      FirebaseStore.init();

      articlesRef.push('stuff');
      expect(FirebaseActions.receiveData).toHaveBeenCalled();
    });
  });

  describe('receiveData', () => {
    it('triggers with new state', () => {
      FirebaseStore.listen(listener);
      FirebaseActions.receiveData(snapshotMock);
      jest.runOnlyPendingTimers();

      expect(listener).toBeCalledWith({ content: 'test content' });
    });
  });

  describe('removeItem', () => {
    it('triggers with new state', () => {
    });
  });

  describe('updateItem', () => {
    it('triggers with new state', () => {
    });
  });
});
