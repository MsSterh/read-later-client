jest.dontMock('../ArticleStore');
jest.dontMock('../FirebaseStore');
jest.dontMock('../../actions/ArticleActions');

import ArticleStore from '../ArticleStore';
import FirebaseStore from '../FirebaseStore';
import FirebaseActions from '../../actions/FirebaseActions';
import ArticleActions from '../../actions/ArticleActions';
import NotificationActions from '../../actions/NotificationActions';

describe('ArticleStore', () => {
  beforeEach(() => {
    ArticleStore.init();
  });

  describe('init', () => {
    it('subscribes to changes in Firebase store', () => {
      spyOn(ArticleActions, 'receiveArticle');

      ArticleStore.init();
      FirebaseStore.trigger({ 'some':  'article' });
      jest.runOnlyPendingTimers();

      expect(ArticleActions.receiveArticle).toHaveBeenCalledWith({ 'some':  'article' });
    });

    it('sets articles to an empty object', () => {
      expect(ArticleStore.articles).toEqual({});
    });
  });

  describe('receiveArticle', () => {
    it('updates article collection', () => {
      ArticleActions.receiveArticle({ 'some': 'article' });
      jest.runOnlyPendingTimers();
      expect(ArticleStore.articles).toEqual({ 'some': 'article' });
    });

    it('sets articles to empty object if was invoked with empty value', () => {
      ArticleActions.receiveArticle();
      jest.runOnlyPendingTimers();
      expect(ArticleStore.articles).toEqual({});
    });

    it('triggers', () => {
      var listener = jest.genMockFunction();

      ArticleStore.listen(listener);
      ArticleActions.receiveArticle({ 'some': 'article' });
      jest.runOnlyPendingTimers();

      expect(listener).toBeCalled();
    });
  });

  describe('removeArticle', () => {
    var componentMock;

    beforeEach(() => {
      componentMock = {
        transitionTo: jest.genMockFunction()
      };

      ArticleActions.removeArticle('someId', componentMock);
      jest.runOnlyPendingTimers();
    });

    it('invokes removeItem action', () => {
      expect(FirebaseActions.removeItem).toBeCalledWith('someId');
    });

    it('makes transition to root', () => {
      expect(componentMock.transitionTo).toBeCalledWith('/');
    });

    it('creates notification', () => {
      expect(NotificationActions.create).toBeCalled();
    });
  });

  describe('changeReadState', () => {
    it('reverses acticle read state', () => {
    });

    it('invokes updateItem action', () => {
    });

    it('creates notification', () => {
    });
  });

  describe('getArticle', () => {
    it('searches article by id', () => {
    });

    it('returns null if not finds one', () => {
    });
  });
});
