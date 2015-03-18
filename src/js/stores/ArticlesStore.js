var Reflux = require('reflux');
var { into, seq, filter, compose, map, take } = require('transducers.js');
require('whatwg-fetch');

var constants = require('../constants');

var FilterStore = require('./FilterStore');
var FirebaseStore = require('./FirebaseStore');

var ArticlesActions = require('../actions/ArticlesActions');
var FirebaseActions = require('../actions/FirebaseActions');
var NotificationActions = require('../actions/NotificationActions');


var ArticlesStore = Reflux.createStore({

  listenables: ArticlesActions,


  init() {
    this.listenTo(FilterStore, ArticlesActions.filterChange);
    this.listenTo(FirebaseStore, ArticlesActions.receiveArticles);

    this.filters = FilterStore.getFilters();
    this.articles = {};
  },


  onFilterChange(filters) {
    this.filters = filters;
    this.trigger(this.getArticles())
  },


  onReceiveArticles(articles) {
    this.articles = articles || {};
    this.trigger(this.getArticles());
  },


  onRemoveArticle(id, sourceComponent) {
    FirebaseActions.removeItem(id);
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
    FirebaseActions.updateItem(id, article);
    NotificationActions.create(`Item has been marked as "${article.read ? 'read' : 'unread'}"`);
  },


  getArticle(id) {
    return this.filterById(id);
  },


  getArticles() {
    return this.filteredArticles();
  },


  filterById(id) {
    return into({}, compose(
      filter(([_id, _]) => id === _id),
      map(([_, a]) => a),
      take(1)
    ), this.getArticles());
  },


  filteredArticles() {
    var articles = this.articles;
    var transformations = [];

    if (this.filters.search) {
      let search = RegExp(this.filters.search, 'i');
      transformations.push(filter(([_, a]) => a.title.match(search) || a.url.match(search)));
    }

    if (this.filters.unreadOnly) {
      transformations.push(filter(([_, a]) => !a.read));
    }

    return seq(articles, compose.apply(null, transformations));
  }

});

module.exports = ArticlesStore;
