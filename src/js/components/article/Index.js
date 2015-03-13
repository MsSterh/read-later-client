var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var _ = require('lodash');

var Article = require('./Article');
var ArticleStore = require('../../stores/ArticleStore');

function currentArticle(articles) {
  return _.filter(articles, (_, id) => {
    return id === this.getParams().id;
  })[0] || {};
}

var Index = React.createClass({
  mixins: [
    Reflux.connectFilter(ArticleStore, 'article', currentArticle),
    Router.State
  ],

  getInitialState() {
    return {
      article: ArticleStore.getDefaultData(currentArticle.bind(this))
    }
  },

  render() {
    return (
      <Article article={this.state.article} />
    );
  }
});

module.exports = Index;
