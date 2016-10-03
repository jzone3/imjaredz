import ReactDOM from 'react-dom';
import React 	from 'react';

var Item = React.createClass({
	propTypes: {
		img: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired,
		selected: React.PropTypes.bool.isRequired,
		onclick: React.PropTypes.func.isRequired,
		itemId: React.PropTypes.string.isRequired
	},
	render: function(){
		return (
			<div className={{"itemWrapper": true, "expanded": this.props.selected}}>
				<div className="title">{ this.props.title }</div>
			</div>
		)
	},
	_onclick() {
		this.props.onclick(this.props.itemId);
	}
});

module.exports = Item;