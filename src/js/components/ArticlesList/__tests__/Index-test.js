jest.dontMock('../Index');
jest.dontMock('../Article');
jest.dontMock('../../../utils/test');

import React from 'react/addons';
import IndexComponent from '../Index';
import ArticlesStore from '../../../stores/ArticlesStore';
import { makeStubbedDescriptor } from '../../../utils/test';

const TestUtils = React.addons.TestUtils;

describe('Index', () => {
  var Index,
  articlesData = {
    'article1': {
      title: 'Backend Apps with Webpack',
      url: 'http://jlongster.com/Backend-Apps-with-Webpack--Part-I',
      content: 'Webpack is an amazing tool. It calls itself a "module bundler"'
    },
    'article2': {
      title: 'Sweet.js Tutorial #2: Recursive Macros and Custom Pattern Classes',
      url: 'http://jlongster.com/Sweet.js-Tutorial--2--Recursive-Macros-and-Custom-Pattern-Classes',
      content: 'Now we will look at a few techniques which help build more complex macros'
    }
  }

  beforeEach(() => {
    ArticlesStore.getArticles.mockImplementation(() => articlesData)
    var IndexStubbed = makeStubbedDescriptor(IndexComponent)
    Index = TestUtils.renderIntoDocument(<IndexStubbed />);
    Index.setState({
      articles: articlesData
    });
  });

  it('renders articles', () => {
    expect(Index.getDOMNode().textContent).toMatch(/Backend Apps with Webpack/);
    expect(Index.getDOMNode().textContent).toMatch(/Recursive Macros and Custom Pattern Classes/);
  });
});
