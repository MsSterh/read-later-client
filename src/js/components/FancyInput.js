import React from 'react/addons';

const cx = React.addons.classSet;

var FancyInput = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired
  },

  getInitialState() {
    return { active: false }
  },

  wrapInput(input) {
    return React.addons.cloneWithProps(input, {
      onFocus: () => this.setState({ active: true }),
      onBlur: () => this.setState({ active: false }),
    });
  },

  render() {
    var activeClass = this.state.active ? 'active' : '';
    var classes = cx('input', this.props.className, activeClass);

    return (
      <div className={classes}>
        {this.wrapInput(this.props.children)}
        <span>
          {this.props.label}
        </span>
      </div>
    );
  }
});

export default FancyInput;
