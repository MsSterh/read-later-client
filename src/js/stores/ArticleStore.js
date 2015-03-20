import Reflux from 'reflux';
import { into, filter, compose, map, take } from 'transducers.js';

import constants from '../constants';

import FirebaseStore from './FirebaseStore';
import FirebaseActions from '../actions/FirebaseActions';
import NotificationActions from '../actions/NotificationActions';
import ArticleActions from '../actions/ArticleActions';

var ArticleStore = Reflux.createStore({
  listenables: ArticleActions,

  init() {
    this.listenTo(FirebaseStore, ArticleActions.receiveArticle);
    this.articles = {};
  },

  onReceiveArticle(articles) {
    this.articles = articles || {};
    this.trigger();                  // Do not pass data to event
  },

  onRemoveArticle(id, sourceComponent) {
    FirebaseActions.removeItem(id);
    sourceComponent.transitionTo('/');
    NotificationActions.create('Item has been successfully removed');
  },

  onChangeReadState(id) {
    var article = this.filterById(id);
    article.read = !article.read;
    FirebaseActions.updateItem(id, article);
    NotificationActions.create(`Item has been marked as "${article.read ? 'read' : 'unread'}"`);
  },

  getArticle(id) {
    return this.filterById(id);
  },

  filterById(id) {
    return into({}, compose(
      filter(([_id, _]) => id === _id),
      map(([_, a]) => a),
      take(1)
    ), this.articles);
  }
});

export default ArticleStore;
