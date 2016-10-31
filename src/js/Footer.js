import ReactDOM from 'react-dom';
import React 	from 'react';

var Footer = React.createClass({
  render: function(){
    return (
      <div className="footer">
        { false ? <div className="centeredText">
          <div className="contactIcons row">
            <div className="col-md-2 col-md-offset-1"><a href="mailto:me@imjaredz.com">Email</a></div>
            <div className="col-md-2"><a href="resume.pdf">Resume</a></div>
            <div className="col-md-2"><a href="http://www.linkedin.com/in/imjaredz">LinkedIn</a></div>
            <div className="col-md-2"><a href="https://github.com/jzone3">Github</a></div>
            <div className="col-md-2"><a href="https://twitter.com/imjaredz">Twitter</a></div>
          </div>
        </div> : null}
        <p>{"Thanks for visiting! Contact me at "}<a href="mailto:me@imjaredz.com">{"me@imjaredz.com"}</a></p>
      </div>
    )
  }
});

module.exports = Footer;