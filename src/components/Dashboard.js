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
import { TabMenu } from 'primereact/tabmenu';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Card } from 'primereact/card';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ren: false,
			hideCaught: false,
			activeItem:
				window.localStorage.getItem('chart') === null
					? '0'
					: window.localStorage.getItem('chart'),
		};
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
					<Grid className="grid-item" item xs={12} sm={2}>
						<SubMenu
							hideCaught={this.state.hideCaught}
							changeHide={(e) =>
								this.setState({ hideCaught: !this.state.hideCaught })
							}
						/>
					</Grid>
					<Grid className="grid-item" item xs={12} sm={8}>
						<TabMenu
							model={items}
							activeItem={items[this.state.activeItem]}
							onTabChange={(e) => tab_change(e.value.value)}
						/>
					</Grid>
					<Grid className="grid-item" item xs={12} sm={2}>
						{/* <Card>
							<CircularProgress
								variant="static"
								value={50}
								className="fish-image"
							/>
						</Card> */}
					</Grid>
				</Grid>

				{current_table}
			</div>
		);
	}
}

export default Dashboard;
