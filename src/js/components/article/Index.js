var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var _ = require('lodash');

var Header = require('../common/layout/Header');
var Article = require('./Article');

var ArticleStore = require('../../stores/ArticleStore');
var ArticleActions = require('../../actions/ArticleActions');

function filterCurrent(articles) {
  return _.filter(articles, (_, id) => {
    return id === this.getParams().id;
  })[0] || {};
}

var Index = React.createClass({
  mixins: [
    Reflux.connectFilter(ArticleStore, 'article', filterCurrent),
    Router.State,
    Router.Navigation
  ],

  getInitialState() {
    return {
      article: ArticleStore.getDefaultData(filterCurrent.bind(this))
    }
  },

  removeArticle(e) {
    e.preventDefault();
    ArticleActions.removeArticle(this.getParams().id, this);
  },

  changeReadState(e) {
    e.preventDefault();
    ArticleActions.changeReadState(this.getParams().id);
  },

  render() {
    var readState = this.state.article.read ? 'Mark as unread' : 'Mark as read';

    return (
      <div>
        <Header>
          <a href="#" onClick={this.removeArticle}>Remove</a>
          <a href="#" onClick={this.changeReadState}>{readState}</a>
        </Header>

        <div className='content'>
          <Article article={this.state.article} />
        </div>
      </div>
    );
  }
});

module.exports = Index;
