var React = require('react');
var Reflux = require('reflux');

var NotificationStore = require('../../stores/NotificationStore');

var Notification = React.createClass({
  mixins: [Reflux.connect(NotificationStore)],

  getInitialState() {
    return { active: false }
  },

  render() {
    var content;

    if (this.state.active) {
      content = <div>{this.state.text}</div>
    }

    return(
      <div className="notification">
        {content}
      </div>
    );
  }
});

module.exports = Notification;
