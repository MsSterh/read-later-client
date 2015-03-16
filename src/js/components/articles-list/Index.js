var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');

var ArticleStore = require('../../stores/ArticleStore');

var Article = require('./Article');
var Header = require('../common/layout/Header');

var Index = React.createClass({
  mixins: [Reflux.connect(ArticleStore, 'articles')],

  getInitialState() {
    return {
      articles: ArticleStore.getDefaultData()
    };
  },

  render() {
    var articleNodes = _.map(this.state.articles, (article, id) => {
      article.id = id;
      return <Article key={id} article={article} />
    });

    return (
      <div>
        <Header></Header>

        <div className='content'>
          {articleNodes}
        </div>
      </div>
    );
  }
});

module.exports = Index;
