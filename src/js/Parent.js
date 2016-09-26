import ReactDOM from 'react-dom';
import React 	from 'react';
import Child 	from './Child.js';

var Parent = React.createClass({
  render: function(){
    return (
      <div>
        <div> My name is Jared Zoneraich. </div>
        <Child name="projects"/>
      </div>
    )
  }
});

module.exports = Parent;