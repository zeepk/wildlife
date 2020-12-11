import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Sea from '../pages/Sea';
import Art from '../pages/Art';
import Fish from '../pages/Fish';
import Bugs from '../pages/Bugs';
import Songs from '../pages/Songs';
import Fossils from '../pages/Fossils';
import LandingPage from '../pages/LandingPage';
import '../../styles/Dashboard.css';

export default function Routing(props) {
	return (
		<Switch>
			<Route exact path="/">
				<LandingPage />
			</Route>
			<Route exact path="/fish">
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
			<Route exact path="/art">
				<Art hideCaught={props.hideCaught} />
			</Route>
		</Switch>
	);
}
