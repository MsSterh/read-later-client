jest.dontMock('../Article');
jest.dontMock('../../../utils/test');

import React from 'react/addons';
import truncate from 'html-truncate';
import striptags from 'striptags';

import ArticleComponent from '../Article';
import { makeStubbedDescriptor } from '../../../utils/test';

const TestUtils = React.addons.TestUtils;

describe('Article', () => {
  var Article,
  articleData = {
    title: 'Backend Apps with Webpack',
    url: 'http://jlongster.com/Backend-Apps-with-Webpack--Part-I',
    content: 'Webpack is an amazing tool. It calls itself a "module bundler"'
  };

  beforeEach(() => {
    var ArticleStubbed = makeStubbedDescriptor(ArticleComponent, { article: articleData }, {});
    Article = TestUtils.renderIntoDocument(<ArticleStubbed />);
  });

  it('shortens content', () => {
    expect(truncate).toBeCalled();
  });

  it('removes html tags', () => {
    expect(striptags).toBeCalledWith(articleData.content);
  });
});
