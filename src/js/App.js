import ReactDOM from 'react-dom';
import React 	from 'react';
import IntroText from './IntroText';
import Parent from './Parent';

ReactDOM.render((
	<div name={"wrapper"}>
		<IntroText />
		Hello
	</div>
), document.getElementById('app'));