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
		itemNumber: React.PropTypes.number.isRequired,
		desc: React.PropTypes.string.isRequired
	},
	getInitialState() {
	    return {
	          selected: false
	    };
	},
	render: function(){
		// <img src={"img/" + this.props.img}/>
		return (
			<div 
				onClick={this._onclick}
				className={classNames("itemWrapper", "col-md-4", {
					"item-expanded": this.props.isSelected,
					// "col-md-12": this.props.isSelected,
					// "col-md-4": !this.props.isSelected,
					"item-thumbnail": !this.props.isSelected})}
				id={this.props.itemId} >
				<div className="item">
					<div className="image" style={{backgroundImage: 'url(img/' + this.props.img + ')'}}></div>
					<div className="title">{ this.props.title }</div>
				</div>
			</div>
		)
	},
	_onclick() {
		console.log("CLICK!");
		this.props.onclick(!this.props.isSelected, this.props.itemId, this.props.itemNumber);
		// this.setState({selected: !this.state.selected});
	}
});

module.exports = Item;