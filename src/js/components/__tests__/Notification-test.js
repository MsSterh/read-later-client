jest.dontMock('../Notification');

import React from 'react/addons';
import NotificationComponent from '../Notification';

const TestUtils = React.addons.TestUtils;

describe('Notification', () => {
  var Notification;

  beforeEach(() => {
    Notification = TestUtils.renderIntoDocument(<NotificationComponent />);
  });

  it('does not display notification if is not active', () => {
    Notification.setState({ active: false });
    expect(Notification.getDOMNode().textContent).toEqual('');
  });

  it('displays notification if active', () => {
    Notification.setState({
      active: true,
      text: 'all is ok'
    });

    expect(Notification.getDOMNode().textContent).toEqual('all is ok');
  });

  it('adds notification type to container class', () => {
    Notification.setState({
      type: 'warning'
    });

    expect(Notification.getDOMNode().className).toContain('warning');
  });

  it('has type "notice" by default', () => {
    expect(Notification.getDOMNode().className).toContain('notice');
  });
});
