import React from 'react';
import LinkToOriginal from '../LinkToOriginal';
import { Link } from 'react-router';

import truncate from 'html-truncate';
import striptags from 'striptags';

var Article = React.createClass({
  shortContent() {
    return truncate(striptags(this.props.article.content), 300)
  },

  params() {
    return { id: this.props.id }
  },

  render() {
    return (
      <article>
        <Link to="article" params={this.params()}>
          <h1>
            {this.props.article.title}
          </h1>
        </Link>
        <p>{this.shortContent()}</p>
        <footer>
          <LinkToOriginal url={this.props.article.url} />
        </footer>
      </article>
    );
  }
});

export default Article;
