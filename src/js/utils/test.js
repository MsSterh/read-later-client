import React from 'react';
import assign from 'object-assign';

export function makeStubbedDescriptor(Component, props, stubs) {
  return React.createClass({
    childContextTypes: {
      goBack: React.PropTypes.func.isRequired,
      getCurrentParams: React.PropTypes.func.isRequired,
      getCurrentPath: React.PropTypes.func.isRequired,
      getCurrentRoutes: React.PropTypes.func.isRequired,
      getCurrentPathname: React.PropTypes.func.isRequired,
      getCurrentQuery: React.PropTypes.func.isRequired,
      isActive: React.PropTypes.func.isRequired,
      makePath: React.PropTypes.func.isRequired,
      makeHref: React.PropTypes.func.isRequired,
      transitionTo: React.PropTypes.func.isRequired,
      replaceWith: React.PropTypes.func.isRequired
    },

    getChildContext() {
      return assign({
        getCurrentParams() {},
        goBack() {},
        getCurrentPath() {},
        getCurrentRoutes() {},
        getCurrentPathname() {},
        getCurrentQuery() {},
        isActive() {},
        makePath() {},
        makeHref() {},
        transitionTo() {},
        replaceWith() {}
      }, stubs)
    },

    render() {
      return <Component {...props}/>;
    }
  });
};

export function invokeSync(fn) {
  fn();
  jest.runOnlyPendingTimers();
}
