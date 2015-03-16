var Firebase = require('firebase');
var Reflux = require('reflux');
var _ = require('lodash');

var config = require('../config');
var ArticleActions = require('../actions/ArticleActions');
var NotificationActions = require('../actions/NotificationActions');

var articlesRef = new Firebase(config.FIREBASE_APP_URL).child('articles');

var ArticleStore = Reflux.createStore({
  listenables: ArticleActions,

  init() {
    articlesRef.on("value", ArticleActions.receiveArticles);
  },

  onReceiveArticles(snapshot) {
    this.trigger(this.last=snapshot.val() || {});
  },

  onRemoveArticle(id, sourceComponent) {
    articlesRef.child(id).remove();
    sourceComponent.transitionTo('/');
    NotificationActions.create('Item has been successfully removed');
  },

  onChangeReadState(id) {
    var article = _.filter(this.getDefaultData(), (_, _id) => {
      return _id === id;
    })[0];

    article.read = !article.read;
    articlesRef.child(id).update(article);

    NotificationActions.create(`Item has been marked as "${article.read ? 'read' : 'unread'}"`);
  },

  getDefaultData(filter) {
    var cachedData = this.last || {};
    return _.isFunction(filter) ? filter(cachedData) : cachedData;
  }
});

module.exports = ArticleStore;
