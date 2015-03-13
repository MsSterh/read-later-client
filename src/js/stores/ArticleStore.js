var Firebase = require('firebase');
var Reflux = require('reflux');
var ArticleActions = require('../actions/ArticleActions');

var articlesRef = new Firebase("https://read-later.firebaseio.com/articles");

var ArticleStore = Reflux.createStore({
  listenables: ArticleActions,

  init() {
    articlesRef.on("value", ArticleActions.receiveArticles);
  },

  onReceiveArticles(snapshot) {
    this.trigger(this.last=snapshot.val() || {});
  },

  getDefaultData() {
    return this.last || {};
  }
});

module.exports = ArticleStore;
