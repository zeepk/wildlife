import React, { Component } from 'react';
import '../styles/Header.css';
import NewThisMonth from './NewThisMonth';
import TotalsMenu from './TotalsMenu';
import { InputSwitch } from 'primereact/inputswitch';
import { Card } from 'primereact/card';
import '../styles/TotalsMenu.css';
import { Button } from 'primereact/button';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { bugs } from '../data_files/bugs.json';
import { fish } from '../data_files/fish.json';
import { fossils } from '../data_files/fossils.json';
import { songs } from '../data_files/songs.json';

class Header extends Component {
	state = {
		hideCaught: false,
		totals: { fish_total: 0, bugs_total: 0, fossils_total: 0, songs_total: 0 },
	};
	componentDidMount() {
		let temp_bugs = 0;
		let temp_fish = 0;
		let temp_fossils = 0;
		let temp_songs = 0;
		let test;
		bugs.map((bug) => {
			window.localStorage.getItem(bug.name) === 'true'
				? (temp_bugs += 1)
				: (test = 0);
			return bug;
		});
		fish.map((fish) => {
			window.localStorage.getItem(fish.name) === 'true'
				? (temp_fish += 1)
				: (test = 0);
			return fish;
		});
		fossils.map((fossil) => {
			window.localStorage.getItem(fossil.name.name) === 'true'
				? (temp_fossils += 1)
				: (test = 0);
			return fossil;
		});
		songs.map((song) => {
			window.localStorage.getItem(song.name.name) === 'true'
				? (temp_songs += 1)
				: (test = 0);
			return song;
		});
		this.setState({
			totals: {
				fish_total: temp_fish,
				bugs_total: temp_bugs,
				fossils_total: temp_fossils,
				songs_total: temp_songs,
			},
		});
	}
	render() {
		return (
			<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
				<a class="navbar-brand" href="/">
					<p className="title">WildLife Tracker</p>
				</a>
				<button
					class="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarColor01"
					aria-controls="navbarColor01"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="nav-text collapse navbar-collapse" id="navbarColor01">
					<ul class="navbar-nav mr-auto">
						<li class="nav-item active">
							<Link to="/">🎣 Fish</Link>
						</li>
						<li class="nav-item">
							<Link to="/bugs">🐛 Bugs</Link>
						</li>
						<li class="nav-item">
							<Link to="/fossils">⛏ Fossils</Link>
						</li>
						<li class="nav-item">
							<Link to="/songs">🎵 Songs</Link>
						</li>
					</ul>

					<div className="mr-5">
						<TotalsMenu totals={this.state.totals} />
					</div>
					<div className="nav-item mr-0">
						<Card className="hide-caught">
							<div className="hide-text">Hide Caught</div>
							<InputSwitch
								checked={this.state.hideCaught}
								onChange={() => {
									this.props.toggleCaught();
									this.setState({
										hideCaught: !this.state.hideCaught,
									});
								}}
							/>
						</Card>
					</div>
					<div className="nav-item mr-0">
						<NewThisMonth />
					</div>
				</div>
			</nav>

			/* <Toolbar>
					<div className="p-toolbar-group-left">
						<p className="title">WildLife Tracker</p>
					</div>
					<div className="p-toolbar-group-left">
						<Button
							className="mobile settings p-button-raised p-button-rounded"
							icon="pi pi-cog"
							onClick={() => this.props.toggle()}
							label="Menu"
						/>
					</div>
					<div className="p-toolbar-group-left">
						<NewThisMonth />
					</div>
					<div className="p-toolbar-group-right">
						<Card className="hide-caught">
							<div className="hide-text">Hide Caught</div>
							<InputSwitch
								tooltip="Nice"
								checked={this.state.hideCaught}
								onChange={() => {
									this.props.toggleCaught();
									this.setState({
										hideCaught: !this.state.hideCaught,
									});
								}}
							/>
						</Card>
					</div>
					<div className="p-toolbar-group-right">
						<TotalsMenu totals={this.state.totals} />
					</div>
				</Toolbar>
			</div> */
		);
	}
}

export default Header;
