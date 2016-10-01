import ReactDOM from 'react-dom';
import React 	from 'react';
import Item from './Item';

var Sections = React.createClass({
	propTypes: {
		title: React.PropTypes.object.isRequired,
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
			closed: Object.keys(this.props.items),
			selected: null
		};
	},
	render(){
		return (
			<div className="sectionTitle">{this.props.title}</div>
			{_render_section_items()}
		)
	},
	_render_section_items() {
		return items.map((k, v) => {
			<Item
				img={v.img}
				title={v.title}
				selected={selected == k}
				onclick={_item_onclick}
				key={k} />
		})
	},
	_item_onclick(new_key) {
		var updated_closed = this.state.closed.slice();
		updated_closed.push(new_key);
		updated_closed.pop(this.state.selected);
		this.setState({selected: new_key, closed: updated_closed});
	}
});

module.exports = Sections;