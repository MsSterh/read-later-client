var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var _ = require('lodash');

var Header = require('../common/Header');
var Article = require('./Article');

var ArticleStore = require('../../stores/ArticleStore');
var ArticleActions = require('../../actions/ArticleActions');

function currentArticle(articles) {
  return _.filter(articles, (_, id) => {
    return id === this.getParams().id;
  })[0] || {};
}

var Index = React.createClass({
  mixins: [
    Reflux.connectFilter(ArticleStore, 'article', currentArticle),
    Router.State,
    Router.Navigation
  ],

  getInitialState() {
    return {
      article: ArticleStore.getDefaultData(currentArticle.bind(this))
    }
  },

  removeArticle(e) {
    e.preventDefault();
    ArticleActions.removeArticle(this.state.article.id, this)
  },

  render() {
    return (
      <div>
        <Header>
          <a href="#" onClick={this.removeArticle}>Remove</a>
        </Header>

        <div className='content'>
          <Article article={this.state.article} />
        </div>
      </div>
    );
  }
});

module.exports = Index;
