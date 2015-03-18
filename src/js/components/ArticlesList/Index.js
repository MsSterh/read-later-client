var React = require('react');
var Reflux = require('reflux');
var { into, map } = require('transducers.js');

var ArticlesStore = require('../../stores/ArticlesStore');
var Article = require('./Article');
var UnreadFilter = require('./UnreadFilter');
var Search = require('./Search');
var Header = require('../Header/Index');

var ArticlesList = React.createClass({
  mixins: [Reflux.connect(ArticlesStore, 'articles')],

  getInitialState() {
    return {
      articles: ArticlesStore.getArticles()
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
