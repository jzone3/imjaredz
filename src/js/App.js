import ReactDOM from 'react-dom';
import React 	from 'react';
import IntroText from './IntroText';
import Parent from './Parent';
import Divider from './Divider';
import BootstrapWrapper from './BootstrapWrapper';
import Sections from './Sections';

var DATA = [
{"title": "Projects1", "items": {"HACKATHONS" : {title: "Hackathons",img: "img/SDFSDF.jpg",desc: "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."}, "GAPYEAR" : {title: "Hackathons",img: "img/SDFSDF.jpg",desc: "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."}}},
{"title": "Projects2", "items": {"HACKATHONS" : {title: "Hackathons",img: "img/SDFSDF.jpg",desc: "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."}, "GAPYEAR" : {title: "Hackathons",img: "img/SDFSDF.jpg",desc: "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."}}}
];
// var DATA = [{"title": "Projects", "items": {"HACKATHONS" : {...}, "GAPYEAR" : {...}}},...];

ReactDOM.render((
	<BootstrapWrapper>
		<IntroText />
		<Divider />
		<Sections data={DATA} />
	</BootstrapWrapper>
), document.getElementById('app'));