jest.dontMock('./helpers');
jest.dontMock('../ArticleStore');
jest.dontMock('../FirebaseStore');
jest.dontMock('../../actions/ArticleActions');

import { invokeSync } from './helpers';

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

      invokeSync(() => {
        ArticleStore.init();
        FirebaseStore.trigger({ 'some':  'article' });
      });

      expect(ArticleActions.receiveArticle).toHaveBeenCalledWith({ 'some':  'article' });
    });

    it('sets articles to an empty object', () => {
      expect(ArticleStore.articles).toEqual({});
    });
  });

  describe('receiveArticle', () => {
    it('updates article collection', () => {
      invokeSync(() => ArticleActions.receiveArticle({ 'some': 'article' }));
      expect(ArticleStore.articles).toEqual({ 'some': 'article' });
    });

    it('sets articles to empty object if was invoked with empty value', () => {
      invokeSync(() => ArticleActions.receiveArticle());
      expect(ArticleStore.articles).toEqual({});
    });

    it('triggers', () => {
      var listener = jest.genMockFunction();

      ArticleStore.listen(listener);
      invokeSync(() => ArticleActions.receiveArticle({ 'some': 'article' }));

      expect(listener).toBeCalled();
    });
  });

  describe('removeArticle', () => {
    var componentMock;

    beforeEach(() => {
      componentMock = {
        transitionTo: jest.genMockFunction()
      };

      invokeSync(() => ArticleActions.removeArticle('someId', componentMock));
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
    var articlesMock;

    beforeEach(() => {
      articlesMock = {
        someId: {
          read: false
        }
      };

      ArticleStore.init();
      invokeSync(() => ArticleActions.receiveArticle(articlesMock));
    });

    it('invokes updateItem action', () => {
      spyOn(FirebaseActions, 'updateItem');
      invokeSync(() => ArticleActions.changeReadState('someId'));
      expect(FirebaseActions.updateItem).toHaveBeenCalledWith('someId', { 'read': true });
    });

    it('creates notification', () => {
      spyOn(NotificationActions, 'create');
      invokeSync(() => ArticleActions.changeReadState('someId'));
      expect(NotificationActions.create).toHaveBeenCalled();
    });
  });

  describe('getArticle', () => {
    var articlesMock;

    beforeEach(() => {
      articlesMock = {
        someId: {
          content: 'test content'
        }
      };

      ArticleStore.init();
      invokeSync(() => ArticleActions.receiveArticle(articlesMock));
    });

    it('searches article by id', () => {
      expect(ArticleStore.getArticle('someId').content).toEqual('test content');
    });

    it('returns empty object if not finds one', () => {
      expect(ArticleStore.getArticle('wrongId')).toEqual({});
    });
  });
});
