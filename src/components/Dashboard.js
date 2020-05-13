import React, { Component } from 'react';
import { bugs } from '../data_files/bugs.json';
import { fish } from '../data_files/fish.json';
import { fossils } from '../data_files/fossils.json';
import { songs } from '../data_files/songs.json';
import '../styles/Dashboard.css';
import Fossils from './Fossils';
import Songs from './Songs';
import Fish from './Fish';
import Bugs from './Bugs';
import SubMenu from './SubMenu';
import TotalsMenu from './TotalsMenu';
import { TabMenu } from 'primereact/tabmenu';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Card } from 'primereact/card';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ren: false,
			totals: {
				fish_total: 0,
				bugs_total: 0,
				fossils_total: 0,
				songs_total: 0,
			},

			hideCaught: false,
			activeItem:
				window.localStorage.getItem('chart') === null
					? '0'
					: window.localStorage.getItem('chart'),
		};
	}

	calcTotals() {
		let test = 0;
		let temp_bugs = 0;
		let temp_fish = 0;
		let temp_fossils = 0;
		let temp_songs = 0;
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

	componentDidMount() {
		if (
			typeof Storage !== 'undefined' &&
			(localStorage.getItem('Spider') === null ||
				localStorage.getItem('Bitterling') === null ||
				localStorage.getItem('Acanthostega') === null ||
				localStorage.getItem('Agent K.K.') === null)
		) {
			console.log('Could not find local storage. Creating...');
			bugs.map((bug) => {
				window.localStorage.setItem(bug.name, false);
				return bug;
			});
			fish.map((fish) => {
				window.localStorage.setItem(fish.name, false);
				return fish;
			});
			fossils.map((fossil) => {
				window.localStorage.setItem(fossil.name.name, false);
				return fossil;
			});
			songs.map((song) => {
				window.localStorage.setItem(song.name.name, false);
				return song;
			});
			window.localStorage.setItem('chart', '0');
		} else {
			this.calcTotals();
		}
	}
	// check for local storage, create if not found

	render() {
		// Notification.requestPermission().then(function (result) {
		// 	console.log(result);
		// });

		const items = [
			{ label: '🐛 Bugs', value: '0' },
			{ label: '🎣 Fish', value: '1' },
			{ label: '⛏ Fossils', value: '2' },
			{ label: '🎵 Songs', value: '3' },
		];

		const tab_change = (num) => {
			window.localStorage.setItem('chart', num);
			this.setState({ activeItem: num });
		};

		let current_table;
		if (this.state.activeItem === '0') {
			current_table = <Bugs hideCaught={this.state.hideCaught} />;
		} else if (this.state.activeItem === '1') {
			current_table = <Fish hideCaught={this.state.hideCaught} />;
		} else if (this.state.activeItem === '2') {
			current_table = <Fossils hideCaught={this.state.hideCaught} />;
		} else if (this.state.activeItem === '3') {
			current_table = <Songs hideCaught={this.state.hideCaught} />;
		} else {
			current_table = <div>No data found</div>;
		}

		return (
			<div className="table-container">
				<Grid container spacing={3}>
					<Grid className="grid-item" item xs={12} sm={3}>
						<SubMenu
							hideCaught={this.state.hideCaught}
							changeHide={(e) =>
								this.setState({ hideCaught: !this.state.hideCaught })
							}
						/>
					</Grid>
					<Grid className="grid-item" item xs={12} sm={6}>
						<TabMenu
							model={items}
							activeItem={items[this.state.activeItem]}
							onTabChange={(e) => tab_change(e.value.value)}
						/>
					</Grid>
					<Grid className="grid-item" item xs={12} sm={3}>
						<TotalsMenu totals={this.state.totals} />
					</Grid>
				</Grid>

				{current_table}
			</div>
		);
	}
}

export default Dashboard;
