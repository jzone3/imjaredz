import ReactDOM from 'react-dom';
import React 	from 'react';
import Item from './Item';

var Section = React.createClass({
	propTypes: {
		isSelected: React.PropTypes.bool.isRequired,
		onclick: React.PropTypes.func.isRequired,
		title: React.PropTypes.string.isRequired,
		sectionId: React.PropTypes.number.isRequired,
		items: React.PropTypes.object.isRequired
		/*
			{"HACKATHONS": 
				{title: "Hackathons",
				img: "img/SDFSDF.jpg",
				desc: "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."}
			}
		*/
	},
	getInitialState() {
		return {
			closed: this._get_all_keys(this.props.items),
			selected: null
		};
	},
	componentWillReceiveProps(nextProps) {
		this.setState({selected: null, closed: this._get_all_keys(nextProps.items)});
	},
	render(){
		return (<div>
			<div className="sectionTitle">{this.props.title}</div>,
			{ this._render_section_items() }
		</div>);
	},
	_render_section_items() {
		return this._get_all_keys(this.props.items).map((k) => {
			var v = this.props.items[k];
			return (<Item
				img={v.img}
				title={v.title}
				selected={this.state.selected === k}
				onclick={this._item_onclick}
				key={k}
				itemId={k} />);
		});
	},
	_item_onclick(newSelected) {
		this.props.onclick(this.props.sectionId);
		var updated_closed = this._get_all_keys(nextProps.items);
		updated_closed.pop(newSelected);
		this.setState({selected: newSelected, closed: updated_closed});
	},
	_get_all_keys(items) {
		return items ? Object.keys(items) : [];
	}
});

module.exports = Section;