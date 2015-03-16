var React = require('react');
var FilterActions = require('../../actions/FilterActions');

var Filter = React.createClass({
  switchDisplayFilter(e) {
    e.preventDefault();
    FilterActions.switchDisplayFilter(this.props.showAll);
  },

  render() {
    var content = this.props.showAll ? 'Show "unread" only' : 'Show All';

    return (
      <div>
        <a href="#" onClick={this.switchDisplayFilter}>{content}</a>
      </div>
    );
  }
});

module.exports = Filter;
