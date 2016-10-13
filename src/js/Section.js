import ReactDOM from 'react-dom';
import React 	from 'react';
import Item from './Item';
import classNames from 'classnames';

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
			selectedId: null,
			selectedItem: null
		};
	},
	componentWillReceiveProps(nextProps) {
		if (!nextProps.isSelected) {
			this.setState({selectedId: null});
		}
	},
	render(){
		return (<div className="section">
			<h2 className="sectionTitle">{this.props.title}</h2>
			{ this._render_section_items().map((items, i) => (
				<div key={i + "row"}>
					<div className="row">{items}</div>
					{ this._render_row_expander(i) }
				</div>
				)) }
		</div>);
	},
	_render_section_items() {
		var items = this._get_all_keys(this.props.items).map((k, i) => {
			var v = this.props.items[k];
			return (<Item
				img={v.img}
				title={v.title}
				desc={v.desc}
				isSelected={this.state.selectedId === k}
				onclick={this._item_onclick}
				key={k}
				itemNumber={i}
				itemId={k} />);
		});

		var rows = [];
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var lastIndex = rows.length - 1;
			if (i != 0 && rows[lastIndex].length < 3) {
				rows[lastIndex].push(item);
			} else {
				rows.push([item]);
			}
		};
		return rows;
	},
	_render_row_expander(i) {
		var expanded = this.props.isSelected && i == Math.floor(this.state.selectedItem/3) && this.state.selectedId;
		console.log(this.state.selectedId);
		return (
			<div className={classNames("rowExpander", {
					"expanded": expanded, "hidden": !expanded})}>
				{ this.state.selectedId != null ? (<div>
				<div className="image"><img src="http://placekitten.com/300/200"/></div>
				<div className="title">{ this.props.items[this.state.selectedId].title }</div>
				<div className="description">{ this.props.items[this.state.selectedId].desc }</div>
				</div>) : null}
			</div>);
	},
	_item_onclick(expand, newSelected, itemNumber) {
		this.props.onclick(this.props.sectionId);
		this.setState({
			selectedId: expand ? newSelected : null,
			selectedItem: expand ? itemNumber : null});
	},
	_get_all_keys(items) {
		return items ? Object.keys(items) : [];
	}
});

module.exports = Section;