jest.dontMock('../UnreadFilter');
jest.dontMock('../../../utils/test');

import React from 'react/addons';

import UnreadFilterComponent from '../UnreadFilter';
import FilterActions from '../../../actions/FilterActions';
import { makeStubbedDescriptor } from '../../../utils/test';

const TestUtils = React.addons.TestUtils;

describe('UnreadFilter', () => {
  var UnreadFilter

  beforeEach(() => {
    UnreadFilter = TestUtils.renderIntoDocument(<UnreadFilterComponent />);
  });

  it('displays "Show All" by default', () => {
    expect(UnreadFilter.getDOMNode().textContent).toEqual('Show "unread" only')
  });

  it('displays "Show All" if unreadOnly is true', () => {
    UnreadFilter.setState({
      unreadOnly: true
    });

    expect(UnreadFilter.getDOMNode().textContent).toEqual('Show All')
  });

  it('displays "Show unread only" if unreadOnly is false', () => {
    UnreadFilter.setState({
      unreadOnly: false
    });

    expect(UnreadFilter.getDOMNode().textContent).toEqual('Show "unread" only');
  });

  it('invokes action to change read state', () => {
    var link = TestUtils.findRenderedDOMComponentWithTag(UnreadFilter, 'a');

    UnreadFilter.setState({
      unreadOnly: true
    });

    TestUtils.Simulate.click(link.getDOMNode());
    expect(FilterActions.switchDisplayFilter).toBeCalledWith(true);
  });
});
