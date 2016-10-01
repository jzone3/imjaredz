import ReactDOM from 'react-dom';
import React 	from 'react';

var IntroText = React.createClass({
  render: function(){
    return (
      <div className="fullPage">
        <div className="centeredText">
        	<span className="firstLine">{"Hi, I'm Jared Zoneraich. "}</span>
        	{"My name is Jared Zoneraich. My name is Jared Zoneraich. My name is Jared Zoneraich. My name is Jared Zoneraich. My name is Jared Zoneraich."}
        </div>
      </div>
    )
  }
});

module.exports = IntroText;