jest.dontMock('q');
jest.dontMock('../ArticlesStore');
jest.dontMock('../FirebaseStore');
jest.dontMock('../FilterStore');
jest.dontMock('../../actions/ArticlesActions');

import { invokeSync } from '../../utils/test';

import 'whatwg-fetch';    // stupid globals
import Q from 'q';
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
    var fetchMock;
    var articleUrl = 'http://example.com/path';
    var requestParams = {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `url=${articleUrl}`
    };

    beforeEach(() => {
      fetchMock = Q.defer();
      spyOn(global, 'fetch').andReturn(fetchMock.promise);
      invokeSync(() => ArticlesActions.addArticle(articleUrl));
    });

    it('sends post request to readability app', () => {
      expect(global.fetch).toHaveBeenCalledWith(READABILITY_APP_URL, requestParams);
    });

    it('notifies about success when responded with 200', () => {
      fetchMock.resolve({ status: 200 });
      jest.runAllTicks();
      expect(NotificationActions.create)
        .toBeCalledWith('Item has been successfully added');
    });

    it('notifies about error when not responded with 200', () => {
      fetchMock.resolve({ status: 400, statusText: 'Something was wrong' });
      jest.runAllTicks();
      expect(NotificationActions.create)
        .toBeCalledWith('error', 'Something was wrong');
    });
  });

  describe('getArticles', () => {
    var articles;

    beforeEach(() => {
      articles = {
        article1: {
          title: 'Lessons in the Fundamentals',
          url: 'http://swannodette.github.io/2015/03/09/lessons-in-the-fundamentals/',
          content: 'For the very first time ClojureScript ...',
          read: true
        },
        article2: {
          title: 'Scripting ClojureScript with JavaScript',
          url: 'http://swannodette.github.io/2015/03/10/scripting-clojurescript-with-javascript/',
          content: 'The following code demonstrates how to script the ClojureScript ...',
          read: false
        }
      };

      invokeSync(() => ArticlesActions.receiveArticles(articles));
    });

    it('returns articles collection', () => {
      invokeSync(() => ArticlesActions.filterChange({
        unreadOnly: false,
        search: ''
      }));

      expect(ArticlesStore.getArticles()).toEqual(articles);
    });

    it('filters articles by title', () => {
      invokeSync(() => ArticlesActions.filterChange({
        unreadOnly: false,
        search: 'Lessons'
      }));

      expect(ArticlesStore.getArticles()).toEqual({
        article1: articles.article1
      });
    });

    it('filters articles by url', () => {
      invokeSync(() => ArticlesActions.filterChange({
        unreadOnly: false,
        search: 'scripting-clojurescript-with'
      }));

      expect(ArticlesStore.getArticles()).toEqual({
        article2: articles.article2
      });
    });

    it('filters articles by read state', () => {
      invokeSync(() => ArticlesActions.filterChange({
        unreadOnly: true
      }));

      expect(ArticlesStore.getArticles()).toEqual({
        article2: articles.article2
      });
    });
  });
});
