import ReactDOM from 'react-dom';
import React 	from 'react';

var IntroText = React.createClass({
  render: function(){
    return (
      <div className="fullPage">
        <div className="centeredText">
        	<span className="firstLine">{"Hi, I'm Jared Zoneraich. "}</span>
        	<span dangerouslySetInnerHTML={{__html: this.props.data.text}} />
          <br/><br/><br/>
          <div className="contactIcons row">
            <div className="col-md-2 col-md-offset-1"><a href="mailto:me@imjaredz.com">Email</a></div>
            <div className="col-md-2"><a href="http://imjaredz.com/resume.pdf">Resume</a></div>
            <div className="col-md-2"><a href="http://www.linkedin.com/in/imjaredz">LinkedIn</a></div>
            <div className="col-md-2"><a href="https://github.com/jzone3">Github</a></div>
            <div className="col-md-2"><a href="https://twitter.com/imjaredz">Twitter</a></div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = IntroText;