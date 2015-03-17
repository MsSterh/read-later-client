var Firebase = require('firebase');
var Reflux = require('reflux');
var _ = require('lodash');

require('whatwg-fetch');

var constants = require('../constants');
var FilterStore = require('./FilterStore');
var ArticleActions = require('../actions/ArticleActions');
var NotificationActions = require('../actions/NotificationActions');

var articlesRef = new Firebase(constants.FIREBASE_APP_URL).child('articles');

var ArticleStore = Reflux.createStore({
  listenables: ArticleActions,


  init() {
    articlesRef.on("value", ArticleActions.receiveArticles);
    this.listenTo(FilterStore, this.onFilterChange);
    this.filters = FilterStore.getFilters();
  },

  onFilterChange(filters) {
    this.filters = filters;
    this.trigger(this.getArticles())
  },

  onReceiveArticles(snapshot) {
    this.last = snapshot.val() || {};
    this.trigger(this.getArticles());
  },

  onRemoveArticle(id, sourceComponent) {
    articlesRef.child(id).remove();
    sourceComponent.transitionTo('/');
    NotificationActions.create('Item has been successfully removed');
  },

  onAddArticle(url) {
    fetch(constants.READABILITY_APP_URL, {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: `url=${ url }`
    })
    .then(() => {
      NotificationActions.create('Item has been successfully added');
    })
    .catch(error => {
      NotificationActions.create('error', error);
    });
  },

  onChangeReadState(id) {
    var article = this.filterById(id);

    article.read = !article.read;
    articlesRef.child(id).update(article);

    NotificationActions.create(`Item has been marked as "${article.read ? 'read' : 'unread'}"`);
  },

  getArticle(id) {
    return this.filterById(id);
  },

  getArticles() {
    return this.filteredArticles();
  },

  filterById(id) {
    return _.filter(this.getArticles(), (_, _id) => {
      return _id === id;
    })[0];
  },

  filteredArticles() {
    var articles = this.last || {};

    if (this.filters.unreadOnly) {
      articles = _.filter(articles, a => {
        return !a.read;
      });
    }

    return articles;
  }
});

module.exports = ArticleStore;
