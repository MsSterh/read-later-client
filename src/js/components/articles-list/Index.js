var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');

var Article = require('./Article');
var ArticleStore = require('../../stores/ArticleStore');

var Index = React.createClass({
  mixins: [Reflux.connect(ArticleStore, 'articles')],

  getInitialState() {
    return {
      articles: {}
    };
  },

  render() {
    var articleNodes = _.map(this.state.articles, (article, id) => {
      article.id = id;
      return <Article key={id} article={article} />
    });

    return (
      <div classNames='articles-list'>
        {articleNodes}
      </div>
    );
  }
});

module.exports = Index;
