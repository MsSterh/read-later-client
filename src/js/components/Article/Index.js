import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

import Header from '../Header/Index';
import Article from './Article';
import Notification from '../Notification';

import ArticleStore from '../../stores/ArticleStore';
import ArticleActions from '../../actions/ArticleActions';

var ArticleComponent = React.createClass({
  mixins: [
    Reflux.listenTo(ArticleStore, 'onArticleUpdate'),
    Router.State,
    Router.Navigation
  ],

  getInitialState() {
    return {
      article: ArticleStore.getArticle(this.getParams().id)
    }
  },

  onArticleUpdate(articles) {
    this.setState({
      article: ArticleStore.getArticle(this.getParams().id)
    });
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
    var readState = this.state.article && this.state.article.read ? 'Mark as unread' : 'Mark as read';

    return (
      <div>
        <Header>
          <div className='article_actions'>
            <a className='remove' href='#' onClick={this.removeArticle}>Remove</a>
            <a className='change-state' href='#' onClick={this.changeReadState}>{readState}</a>
          </div>
        </Header>

        <Notification />

        <div className='main'>
          <div className='article'>
            <Article article={this.state.article} />
          </div>
        </div>
      </div>
    );
  }
});

export default ArticleComponent;
