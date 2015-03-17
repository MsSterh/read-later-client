var React = require('react');

var AddArticleForm = React.createClass({
  onSubmitHandler(e) {
    e.preventDefault();
    var value = this.refs.url.getDOMNode().value.trim();
    this.refs.url.getDOMNode().value = '';
    this.props.onSubmitHandler(value);
  },

  render() {
    return (
      <div className='add_url'>
        <form onSubmit={this.onSubmitHandler}>
          <input type='text' placeholder='http://...' ref='url' />
          <input type='submit' value='+ ADD URL' />
        </form>
      </div>
    );
  }
});

module.exports = AddArticleForm;
