import React from 'react';
import Reflux from 'reflux';

import NotificationStore from '../stores/NotificationStore';

const cx = React.addons.classSet;

var Notification = React.createClass({
  mixins: [Reflux.connect(NotificationStore)],

  getInitialState() {
    return NotificationStore.getDefaultState()
  },

  render() {
    var content,
    htmlClass = this.state.type || 'notice',
    classes = cx('notification', htmlClass);

    if (this.state.active) {
      content = <div>{this.state.text}</div>
    }

    return(
      <div className={classes}>
        {content}
      </div>
    );
  }
});

export default Notification;
