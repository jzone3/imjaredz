import ReactDOM from 'react-dom';
import React 	from 'react';

var Child = React.createClass({
  render: function(){
    return (
      <div>
        click here to scroll to <b>{this.props.name}</b>.
      </div>
    )
  }
});

module.exports = Child;