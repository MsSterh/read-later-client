jest.dontMock('./helpers');
jest.dontMock('../ArticlesStore');
jest.dontMock('../FirebaseStore');
jest.dontMock('../FilterStore');
jest.dontMock('../../actions/ArticlesActions');

import { invokeSync } from './helpers';

import 'whatwg-fetch';    // stupid globals
import { READABILITY_APP_URL } from '../../constants';
import ArticlesStore from '../ArticlesStore';
import FirebaseStore from '../FirebaseStore';
import FilterStore from '../FilterStore';
import FirebaseActions from '../../actions/FirebaseActions';
import ArticlesActions from '../../actions/ArticlesActions';
import NotificationActions from '../../actions/NotificationActions';

describe('ArticlesStore', () => {
  beforeEach(() => {
    ArticlesStore.init();
  });

  describe('init', () => {
    it('subscribes to changes in Firebase store', () => {
      spyOn(ArticlesActions, 'receiveArticles');

      invokeSync(() => {
        ArticlesStore.init();
        FirebaseStore.trigger({ 'some':  'article' });
      });

      expect(ArticlesActions.receiveArticles).toHaveBeenCalledWith({ 'some':  'article' });
    });

    it('subscribes to changes in Filter store', () => {
      spyOn(ArticlesActions, 'filterChange');

      invokeSync(() => {
        ArticlesStore.init();
        FilterStore.trigger({ 'search':  'clojure' });
      });

      expect(ArticlesActions.filterChange).toHaveBeenCalledWith({ 'search':  'clojure' });
    });

    it('gets filters state', () => {
      // more like functional test
      expect(ArticlesStore.filters).toEqual({
        search: '',
        unreadOnly: true
      });
    });

    it('sets articles to an empty object', () => {
      expect(ArticlesStore.articles).toEqual({});
    });
  });

  describe('filterChange', () => {
    beforeEach(() => {
      spyOn(ArticlesStore, 'getArticles').andReturn({
        'some': 'articles'
      });
    });

    it('updates filters', () => {
      invokeSync(() => ArticlesActions.filterChange({ 'search': 'clojure' }));
      expect(ArticlesStore.filters).toEqual({ 'search': 'clojure' });
    });

    it('triggers new articles', () => {
      var listener = jest.genMockFunction();
      ArticlesStore.listen(listener);

      invokeSync(() => ArticlesActions.filterChange({ search: 'clojure' }));
      expect(listener).toBeCalledWith({ 'some': 'articles' });
    });
  });

  describe('receiveArticles', () => {
    it('updates articles state', () => {
      invokeSync(() => ArticlesActions.receiveArticles({ 'some': 'articles' }));
      expect(ArticlesStore.articles).toEqual({ 'some': 'articles' });
    });


    it('sets articles state to empty object if no payload', () => {
      invokeSync(() => ArticlesActions.receiveArticles());
      expect(ArticlesStore.articles).toEqual({});
    });

    it('triggers new articles', () => {
      var listener = jest.genMockFunction();
      ArticlesStore.listen(listener);

      invokeSync(() => ArticlesActions.receiveArticles({ 'some': 'articles' }));
      expect(listener).toBeCalledWith({ 'some': 'articles' });
    });
  });

  describe('addArticle', () => {
    var fetchMock = new Promise(() => {});
    var articleUrl = 'http://example.com/path';
    var requestParams = {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: articleUrl
    };

    beforeEach(() => {
      spyOn(global, 'fetch').andReturn(fetchMock);
      invokeSync(() => ArticlesActions.addArticle(articleUrl));
    });

    it('sends post request to readability app', () => {
      expect(global.fetch).toHaveBeenCalledWith(READABILITY_APP_URL, requestParams);
    });

    it('notifies about success when responded with 200', () => {
    });

    it('notifies about error when not responded with 200', () => {
    });
  });

  describe('getArticles', () => {
  });
});
