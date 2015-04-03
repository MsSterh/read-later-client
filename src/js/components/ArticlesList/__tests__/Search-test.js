jest.dontMock('../Search');
jest.dontMock('../../FancyInput');
jest.dontMock('../../../stores/FilterStore');

import { debounce } from 'lodash';
import React from 'react/addons';
import SearchComponent from '../Search';
import FilterActions from '../../../actions/FilterActions';

const TestUtils = React.addons.TestUtils;

describe('Search', () => {
  var Search, InputTag, debounceMock;

  // OMG debounce mock
  beforeEach(() => {
    debounceMock = (fn) => {
      debounceMock.fn = fn;
      return debounceMock.bind(null, fn);
    }

    debounceMock.invoke = () => {
      debounceMock.fn();
    }

    debounce.mockImplementation(debounceMock);
  });

  beforeEach(() => {
    Search = TestUtils.renderIntoDocument(
      <SearchComponent />
    );

    InputTag = TestUtils.findRenderedDOMComponentWithTag(Search, 'input');
  });

  afterEach(() => {
    debounce.mockClear();
  });

  it('has empty search state', () => {
    expect(Search.state.search).toEqual('');
  });

  it('gets new state after input change', () => {
    TestUtils.Simulate.change(InputTag.getDOMNode(), { target: { value: 'clojure' } });
    expect(Search.state.search).toEqual('clojure');
  });

  it('waits 500 msec before invoking search action', function() {
    TestUtils.Simulate.change(InputTag.getDOMNode(), { target: { value: 'clojure' } });

    expect(debounce.mock.calls.length).toBe(1);
    expect(debounce.mock.calls[0][1]).toBe(500);
  });

  it('invokes search action after 500 msec', () => {
    TestUtils.Simulate.change(InputTag.getDOMNode(), { target: { value: 'clojure' } });

    expect(FilterActions.search).not.toBeCalled();
    debounceMock.invoke();
    expect(FilterActions.search).toBeCalledWith('clojure');
  });
});
