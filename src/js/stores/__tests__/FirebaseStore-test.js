jest.dontMock('../FirebaseStore');
jest.dontMock('../../constants');
jest.dontMock('../../actions/FirebaseActions');

import Firebase from 'firebase';
import constants from '../../constants';
import FirebaseStore from '../FirebaseStore';
import FirebaseActions from '../../actions/FirebaseActions';

describe('FirebaseStore', () => {
  var snapshotMock, listener, articlesRef;

  beforeEach(() => {
    var fireRef = new Firebase(constants.FIREBASE_APP_URL);

    snapshotMock = {
      val() {
        return {
          content: 'test content'
        }
      }
    }

    listener = jest.genMockFunction();
    articlesRef = fireRef.child('articles');
  });

  describe('init', () => {
    it('subscribes to changes in Firebase', () => {
      spyOn(FirebaseActions, 'receiveData');
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
    it('removes data from firebase', () => {
      var id;
      var article = { content: 'test content' };

      articlesRef.push(article);
      id = articlesRef._lastAutoId;

      expect(articlesRef.getData()[id]).toEqual(article);

      FirebaseActions.removeItem(id);
      jest.runOnlyPendingTimers();

      expect(articlesRef.getData()[id]).toEqual(undefined);
    });
  });

  describe('updateItem', () => {
    it('updates data in firebase', () => {
      var id;
      var article = { content: 'test content' },
      newArticle = { content: 'new test content' };

      articlesRef.push(article);
      id = articlesRef._lastAutoId;

      expect(articlesRef.getData()[id]).toEqual(article);

      FirebaseActions.updateItem(id, newArticle);
      jest.runOnlyPendingTimers();

      expect(articlesRef.getData()[id]).toEqual(newArticle);
    });
  });
});
