import React from 'react';
import Reflux from 'reflux';
import { into, map } from 'transducers.js';

import ArticlesStore from '../../stores/ArticlesStore';
import Article from './Article';
import UnreadFilter from './UnreadFilter';
import Search from './Search';
import Header from '../Header/Index';

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

        <div className='main'>
          <div className='articles_list'>
            {articleNodes}
          </div>
        </div>
      </div>
    );
  }
});

export default ArticlesList;
