import ReactDOM from 'react-dom';
import React 	from 'react';

var Item = React.createClass({
	propTypes: {
		img: React.PropTypes.String.isRequired;
		title: React.PropTypes.String.isRequired;
		selected: React.PropTypes.bool.isRequired;
		onclick: React.PropTypes.func.isRequired;
		key: React.PropTypes.String.isRequired;
		title: React.PropTypes.object.isRequired,
		items: React.PropTypes.object.isRequired
	},
	render: function(){
		return (
			<div className="wrapper">
			</div>
		)
	},
	_onclick() {
		this.props.onclick(this.props.key);
	}
});

module.exports = Item;