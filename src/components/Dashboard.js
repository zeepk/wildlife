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
import { Sidebar } from 'primereact/sidebar';
import Header from './Header.js';

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
			sidebarVisible: false,
			hideCaught: false,
			activeItem:
				window.localStorage.getItem('chart') === null
					? '0'
					: window.localStorage.getItem('chart'),
		};
	}

	componentDidMount() {}
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
				<Header />

				{/* <Sidebar
					className="mobile sidebar"
					position="top"
					visible={this.state.sidebarVisible}
					onHide={() => this.setState({ sidebarVisible: false })}
				>
					<h3
						style={{
							width: '100vw',
							margin: '20px 0',
							padding: '10px 0',
							backgroundColor: 'lightgreen',
						}}
					>
						Tools
					</h3>
					<Grid container spacing={3}>
						<Grid className="mobile-grid-item" item xs={12}>
							<TabMenu
								model={items}
								activeItem={items[this.state.activeItem]}
								onTabChange={(e) => tab_change(e.value.value)}
							/>
						</Grid>
						<Grid className="mobile-grid-item" item xs={12}>
							<SubMenu
								hideCaught={this.state.hideCaught}
								changeHide={(e) =>
									this.setState({ hideCaught: !this.state.hideCaught })
								}
							/>
						</Grid>
						<Grid className="mobile-grid-item" item xs={12}>
							<TotalsMenu totals={this.state.totals} />
						</Grid>
					</Grid>
				</Sidebar> */}

				<Grid className="desktop" container spacing={3}>
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
