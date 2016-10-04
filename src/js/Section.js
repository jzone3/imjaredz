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
			selected: null
		};
	},
	componentWillReceiveProps(nextProps) {
		if (!nextProps.isSelected) {
			this.setState({selected: null});
		}
	},
	render(){
		return (<div>
			<h2 className="sectionTitle">{this.props.title}</h2>
			<div className="row">
				{ this._render_section_items() }
			</div>
		</div>);
	},
	_render_section_items() {
		return this._get_all_keys(this.props.items).map((k) => {
			var v = this.props.items[k];
			return (<Item
				img={v.img}
				title={v.title}
				desc={v.desc}
				isSelected={this.state.selected === k}
				onclick={this._item_onclick}
				key={k}
				itemId={k} />);
		});
	},
	_item_onclick(newSelected) {
		this.props.onclick(this.props.sectionId);
		this.setState({selected: newSelected});
	},
	_get_all_keys(items) {
		return items ? Object.keys(items) : [];
	}
});

module.exports = Section;