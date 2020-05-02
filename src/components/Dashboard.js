import React, { Component } from 'react';
import { bugs } from '../data_files/bugs.json';
import { fish } from '../data_files/fish.json';
import { fossils } from '../data_files/fossils.json';
import { songs } from '../data_files/songs.json';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import '../styles/Dashboard.css';
import MobileName from './MobileName';
import ShadowSize from './ShadowSize';
import TimeDisplay from './TimeDisplay';
import Fossils from './Fossils';
import Songs from './Songs';
import Fish from './Fish';
import Bugs from './Bugs';

import { TabMenu } from 'primereact/tabmenu';

// displays a green check if the month is set to 1 instead of 0
const month_display = (rowData, column) => {
	if (rowData[column.field] === '1') {
		return (
			<CheckCircleIcon
				style={{ color: 'green', fontSize: '30px', zIndex: '' }}
			/>
		);
	}
};
const name_display = (rowData, column) => {
	return window.innerWidth < 480 ? (
		<MobileName data={rowData} />
	) : (
		<div>{rowData.name}</div>
	);
};

const size_display = (rowData) => {
	return <ShadowSize size={rowData.size} />;
};

// checks local storage to populate checkboxes
const is_checked = (name) => {
	if (window.localStorage.getItem(name) === 'true') {
		return true;
	} else {
		return false;
	}
};

const icon_display = (rowData) => {
	return (
		<img
			className="critter-image"
			src={`http://acnhapi.com/icons/${rowData.size ? 'fish' : 'bugs'}/${
				rowData.id
			}`}
			alt="Icon"
		/>
	);
};

const time_display = (rowData) => {
	return <TimeDisplay critter={rowData} />;
};
class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ren: false,
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
			{ label: '🎵 KK Songs', value: '3' },
		];

		const tab_change = (num) => {
			window.localStorage.setItem('chart', num);
			this.setState({ activeItem: num });
		};

		let current_table;
		if (this.state.activeItem === '0') {
			current_table = <Bugs />;
		} else if (this.state.activeItem === '1') {
			current_table = <Fish />;
		} else if (this.state.activeItem === '2') {
			current_table = <Fossils />;
		} else if (this.state.activeItem === '3') {
			current_table = <Songs />;
		} else {
			current_table = <div>No data found</div>;
		}

		return (
			<div className="table-container">
				<TabMenu
					model={items}
					activeItem={items[this.state.activeItem]}
					onTabChange={(e) => tab_change(e.value.value)}
				/>
				{current_table}
			</div>
		);
	}
}

export default Dashboard;
