jest.dontMock('../Index');
jest.dontMock('../Article');
jest.dontMock('../../Header/Index');
jest.dontMock('../../../utils/test');

import React from 'react/addons';

import IndexComponent from '../Index';
import Article from '../Article';
import Header from '../../Header/Index';
import { makeStubbedDescriptor } from '../../../utils/test';

import ArticleActions from '../../../actions/ArticleActions';
import ArticleStore from '../../../stores/ArticleStore';

const TestUtils = React.addons.TestUtils;

describe('Index', () => {
  var Index,

  articleData = {
    title: 'Backend Apps with Webpack',
    url: 'http://jlongster.com/Backend-Apps-with-Webpack--Part-I',
    content: 'Webpack is an amazing tool. It calls itself a "module bundler"'
  };

  beforeEach(() => {
    ArticleStore.getArticle = jest.genMockFunction().mockImplementation(() => {
      return articleData;
    });

    var ArticleStubbed = makeStubbedDescriptor(IndexComponent, {}, {
      getCurrentParams() {
        return { id: 'sometestid' }
      }
    });

    Index = TestUtils.renderIntoDocument(<ArticleStubbed />);
  });

  it('has Header', () => {
    TestUtils.findRenderedComponentWithType(Index, Header);
  });

  it('has button for removing article', () => {
    var HeaderComponent = TestUtils.findRenderedComponentWithType(Index, Header);
    var RemoveButton = TestUtils.findRenderedDOMComponentWithClass(HeaderComponent, 'remove');

    TestUtils.Simulate.click(RemoveButton);

    // Need to test both ArticleActions.removeArticle call params.
    // But fuck is this hard
    expect(ArticleActions.removeArticle).toBeCalled();
    expect(ArticleActions.removeArticle.mock.calls[0][0]).toBe('sometestid');
  });

  it('has button for changing read state', () => {
    var HeaderComponent = TestUtils.findRenderedComponentWithType(Index, Header);
    var ChangeStateButton = TestUtils.findRenderedDOMComponentWithClass(HeaderComponent, 'change-state');

    TestUtils.Simulate.click(ChangeStateButton);

    expect(ArticleActions.changeReadState).toBeCalled();
    expect(ArticleActions.changeReadState.mock.calls[0][0]).toBe('sometestid');
  });

  it('renders Article component with article data', () => {
    var ArticleComponent = TestUtils.findRenderedComponentWithType(Index, Article);
    expect(ArticleComponent.props.article).toEqual(articleData);
  });
});
