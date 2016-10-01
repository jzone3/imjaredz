import ReactDOM from 'react-dom';
import React 	from 'react';

var BootstrapWrapper = React.createClass({
  render: function(){
    return (
      <div className="wrapper">
        { this.props.children }
      </div>
    )
  }
});

module.exports = BootstrapWrapper;