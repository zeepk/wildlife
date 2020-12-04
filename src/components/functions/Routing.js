import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Fish from '../pages/Fish';
import Bugs from '../pages/Bugs';
import Sea from '../pages/Sea';
import Fossils from '../pages/Fossils';
import Songs from '../pages/Songs';
import '../../styles/Dashboard.css';

export default function Routing(props) {
	return (
		<Switch>
			<Route exact path="/">
				<Fish hideCaught={props.hideCaught} />
			</Route>
			<Route exact path="/bugs">
				<Bugs hideCaught={props.hideCaught} />
			</Route>
			<Route exact path="/sea">
				<Sea hideCaught={props.hideCaught} />
			</Route>
			<Route exact path="/fossils">
				<Fossils hideCaught={props.hideCaught} />
			</Route>
			<Route exact path="/songs">
				<Songs hideCaught={props.hideCaught} />
			</Route>
		</Switch>
	);
}
