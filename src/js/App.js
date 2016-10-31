import ReactDOM from 'react-dom';
import React 	from 'react';
import IntroText from './IntroText';
import Footer from './Footer';
import Divider from './Divider';
import BootstrapWrapper from './BootstrapWrapper';
import Sections from './Sections';
import DATA from './DATA';


// var DATA = [{"title": "Projects", "items": {"HACKATHONS" : {...}, "GAPYEAR" : {...}}},...];

ReactDOM.render((
	<BootstrapWrapper>
		<IntroText data={DATA[0]} />
		<Sections data={DATA[1]} />
		{ true ? <Footer /> : null }
	</BootstrapWrapper>
), document.getElementById('app'));