import React from 'react';
import Highlight from 'react-highlight';
import LinkToOriginal from '../LinkToOriginal';

var Article = React.createClass({
  render() {
    return (
      <article>
        <header>
          <h1>{this.props.article.title}</h1>
          <LinkToOriginal url={this.props.article.url} />
        </header>

        <Highlight innerHTML={true} >
          {this.props.article.content}
        </Highlight>
      </article>
    );
  }
});

export default Article;
