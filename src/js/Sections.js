import ReactDOM from 'react-dom';
import React 	from 'react';
import Section from './Section';

var Sections = React.createClass({
	propTypes: {
		data: React.PropTypes.array.isRequired
		// [{"title": "Projects", "items": {"HACKATHONS" : {...}, "GAPYEAR" : {...}}},...];
	},
	getInitialState() {
		return {
			selected: null
		};
	},
	componentWillReceiveProps(nextProps) {
		this.setState({selected: null});
	},
	render(){
		var sections = this.props.data.map((sec, i) => (
			<Section
				items={sec.items}
				title={sec.title}
				sectionId={i}
				key={i}
				colored={i % 2 != 0}
				isSelected={this.state.selected == i}
				isLastItem={i == this.props.data.length - 1}
				onclick={this._section_click_handler} />
		));

		return <div className="container">{ sections }</div>;
	},
	_section_click_handler(sectionId) {
		this.setState({selected: sectionId});
	}
});

module.exports = Sections;