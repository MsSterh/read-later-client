var React = require('react');
var Reflux = require('reflux');
var { into, map } = require('transducers.js');

var ArticleStore = require('../../stores/ArticlesStore');
var Article = require('./Article');
var UnreadFilter = require('./UnreadFilter');
var Search = require('./Search');
var Header = require('../Header/Index');

var ArticlesList = React.createClass({
  mixins: [Reflux.connect(ArticleStore, 'articles')],

  getInitialState() {
    return {
      articles: ArticleStore.getArticles()
    };
  },

  render() {
    var articleNodes = into([], map(([id, article]) => {
      return <Article key={id} id={id} article={article} />
    }), this.state.articles);

    return (
      <div>
        <Header>
          <Search />
          <UnreadFilter />
        </Header>

        <div className='main-container'>
          <div className='main'>
            {articleNodes}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ArticlesList;
