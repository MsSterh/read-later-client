var Firebase = require('firebase');
var Reflux = require('reflux');
var ArticleActions = require('../actions/ArticleActions');
var _ = require('lodash');

var articlesRef = new Firebase("https://read-later.firebaseio.com/articles");

var ArticleStore = Reflux.createStore({
  listenables: ArticleActions,

  init() {
    articlesRef.on("value", ArticleActions.receiveArticles);
  },

  onReceiveArticles(snapshot) {
    this.trigger(this.last=snapshot.val() || {});
  },

  getDefaultData(filter) {
    var cachedData = this.last || {};
    return _.isFunction(filter) ? filter(cachedData) : cachedData;
  }
});

module.exports = ArticleStore;
