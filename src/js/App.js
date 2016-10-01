import ReactDOM from 'react-dom';
import React 	from 'react';
import IntroText from './IntroText';
import Parent from './Parent';
import Divider from './Divider';
import BootstrapWrapper from './BootstrapWrapper';
import Sections from './Sections';

var DATA = {"title": "Projects", "items": {"Hackathons" : [0,1,2], "Gap Year" : [0,1,2]}};

ReactDOM.render((
	<BootstrapWrapper>
		<IntroText />
		<Divider />
		<Sections data={DATA.items} title={DATA.title} />
	</BootstrapWrapper>
), document.getElementById('app'));