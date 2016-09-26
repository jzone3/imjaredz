import ReactDOM from 'react-dom';
import React 	from 'react';
import Child 	from './Child.js';

var Parent = React.createClass({
  render: function(){
    return (
      <div>
        <div> This is the parent. </div>
        <Child name="child"/>
      </div>
    )
  }
});

module.exports = Parent;