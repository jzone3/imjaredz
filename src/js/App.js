import ReactDOM from 'react-dom';
import React 	from 'react';
import IntroText from './IntroText';
import Divider from './Divider';
import BootstrapWrapper from './BootstrapWrapper';
import Sections from './Sections';
import DATA from './DATA';


// var DATA = [{"title": "Projects", "items": {"HACKATHONS" : {...}, "GAPYEAR" : {...}}},...];

ReactDOM.render((
	<BootstrapWrapper>
		<IntroText />
		<Divider />
		<Sections data={DATA} />
	</BootstrapWrapper>
), document.getElementById('app'));