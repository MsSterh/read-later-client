jest.dontMock('parseUri');
jest.dontMock('../LinkToOriginal');

import React from 'react/addons';
import LinkToOriginalComponent from '../LinkToOriginal';

const TestUtils = React.addons.TestUtils;

describe('LinkToOriginal', () => {
  var LinkToOriginal,
  url = 'http://example.com/example?ho=hey';

  beforeEach(() => {
    LinkToOriginal = TestUtils.renderIntoDocument(<LinkToOriginalComponent url={url} />);
  });

  it('is <A> tag', () => {
    expect(LinkToOriginal.getDOMNode().tagName).toEqual('A');
  });

  it('displays host', () => {
    expect(LinkToOriginal.getDOMNode().textContent).toEqual('example.com');
  });

  it('has original url as href', () => {
    expect(LinkToOriginal.getDOMNode().href).toEqual(url);
  });
});
