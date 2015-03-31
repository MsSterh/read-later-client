jest.dontMock('../Index');
jest.dontMock('../AddArticleForm');
jest.dontMock('../../../utils/test');

import React from 'react/addons';
import HeaderComponent from '../Index';
import ArticlesActions from '../../../actions/ArticlesActions';
import { makeStubbedDescriptor } from '../../../utils/test';

const TestUtils = React.addons.TestUtils;

describe('Header', () => {
  var Header;

  beforeEach(() => {
    var HeaderStubbed = makeStubbedDescriptor(HeaderComponent);
    Header = TestUtils.renderIntoDocument(<HeaderStubbed>test</HeaderStubbed>);
  });

  it('contains link to home page', () => {
    var linkToHome = TestUtils.findRenderedDOMComponentWithTag(Header, 'a');
    expect(linkToHome.getDOMNode().textContent).toEqual('Read Now');
  });

  it('renders form for adding an url', () => {
    TestUtils.findRenderedDOMComponentWithTag(Header, 'form')
  });

  it('invokes addArticle action on form submit', () => {
    var url = 'http://example.com/example';
    var form = TestUtils.findRenderedDOMComponentWithTag(Header, 'form')
    var inputField = TestUtils.findRenderedDOMComponentWithClass(form, 'add-url');

    inputField.getDOMNode().value = url;
    TestUtils.Simulate.submit(form);

    expect(ArticlesActions.addArticle).toBeCalledWith(url);
  });
});
