jest.dontMock('../Article');

import React from 'react/addons';
import ArticleComponent from '../Article';

const TestUtils = React.addons.TestUtils;

describe('Article', () => {
  var ArticleTag;

  var data = {
    title: 'Backend Apps with Webpack',
    url: 'http://jlongster.com/Backend-Apps-with-Webpack--Part-I',
    content: 'Webpack is an amazing tool. It calls itself a "module bundler"'
  };

  beforeEach(() => {
    var Article = TestUtils.renderIntoDocument(
      <ArticleComponent article={data} />
    );

    ArticleTag = TestUtils.findRenderedDOMComponentWithTag(Article, 'article');
  });

  it('contains article title', () => {
    expect(ArticleTag.getDOMNode().textContent).toContain('Backend Apps with Webpack');
  });

  it('contains article content', () => {
    expect(ArticleTag.getDOMNode().textContent).toContain('Webpack is an amazing tool. It calls itself a "module bundler"');
  });
});
