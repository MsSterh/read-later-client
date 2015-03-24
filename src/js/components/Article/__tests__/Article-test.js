jest.dontMock('../Article');

import React from 'react/addons';
import Article from '../Article';

var TestUtils = React.addons.TestUtils;

describe('Article', () => {
  var article;
  var data = {
    title: 'Backend Apps with Webpack',
    url: 'http://jlongster.com/Backend-Apps-with-Webpack--Part-I',
    content: 'Webpack is an amazing tool. It calls itself a "module bundler"'
  };

  beforeEach(() => {
    var component = TestUtils.renderIntoDocument(
      <Article article={data} />
    );

    article = TestUtils.findRenderedDOMComponentWithTag(component, 'article');
  });

  it('contains article title', () => {
    expect(article.getDOMNode().textContent).toContain('Backend Apps with Webpack');
  });

  it('contains article content', () => {
    expect(article.getDOMNode().textContent).toContain('Webpack is an amazing tool. It calls itself a "module bundler"');
  });
});
