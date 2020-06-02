import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Fish from './Fish';
import Bugs from './Bugs';
import Fossils from './Fossils';
import Songs from './Songs';
import '../styles/Dashboard.css';

export default function Routing(props) {
	return (
		<Switch>
			<Route exact path="/">
				<Fish hideCaught={props.hideCaught} />
			</Route>
			<Route exact path="/bugs">
				<Bugs hideCaught={props.hideCaught} />
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
