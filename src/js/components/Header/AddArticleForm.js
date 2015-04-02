import React from 'react';
import FancyInput from '../FancyInput';

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
          <FancyInput className='add-url' label='http://...'>
            <input type='text' />
          </FancyInput>
        </form>
      </div>
    );
  }
});

export default AddArticleForm;
