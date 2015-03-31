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

  it('displays host', () => {
    expect(LinkToOriginal.getDOMNode().textContent).toEqual('example.com');
  });
});
