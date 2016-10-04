import ReactDOM from 'react-dom';
import React 	from 'react';
import classNames from 'classnames';

var Item = React.createClass({
	propTypes: {
		img: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired,
		isSelected: React.PropTypes.bool.isRequired,
		onclick: React.PropTypes.func.isRequired,
		itemId: React.PropTypes.string.isRequired,
		desc: React.PropTypes.string.isRequired
	},
	render: function(){
		return (
			<div className={classNames("itemWrapper", {"item-expanded": this.props.isSelected, "item-thumbnail": !this.props.isSelected})} onClick={this._onclick} >
				<div className="title">{ this.props.title }</div>
				<div className="description">{ this.props.desc }</div>
			</div>
		)
	},
	_onclick() {
		console.log("CLICK!");
		this.props.onclick(this.props.itemId);
	}
});

module.exports = Item;