import React, { Component } from 'react';
import { bugs } from '../data_files/bugs.json';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Checkbox from '@material-ui/core/Checkbox';
import bells_image from '../images/bells.png';
import MobileName from './MobileName';
import TimeDisplay from './TimeDisplay';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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
			src={`https://acnhapi.com/icons/${rowData.size ? 'fish' : 'bugs'}/${
				rowData.id
			}`}
			alt="Icon"
		/>
	);
};

const time_display = (rowData) => {
	return <TimeDisplay critter={rowData} />;
};

export default class Bugs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ren: false,
		};
	}
	checkbox_change = (name) => {
		console.log('changing...');
		if (window.localStorage.getItem(name) === 'false') {
			window.localStorage.setItem(name, 'true');
		} else if (window.localStorage.getItem(name) === 'true') {
			window.localStorage.setItem(name, 'false');
		} else {
			alert('Something went wrong with updating local storage');
		}
		this.setState({
			ren: !this.state.ren,
		});
		return name;
	};
	caught_display = (rowData) => {
		return (
			<Checkbox
				color="primary"
				checked={is_checked(rowData.name)}
				onChange={() => this.checkbox_change(rowData.name)}
			/>
		);
	};
	render() {
		const date = new Date();
		const month_id = date.getMonth();
		const color = '#a1d6a1';
		const bug_data = this.props.hideCaught
			? bugs.filter((bug) => window.localStorage.getItem(bug.name) === 'false')
			: bugs;
		return (
			<DataTable
				className="bugs-datatable-container"
				value={bug_data}
				// responsive={true}
			>
				<Column
					className="name-column"
					field="name"
					header="Name"
					sortable={true}
					filter={true}
					filterPlaceholder="Search"
					body={name_display}
					filterMatchMode="contains"
				/>
				<Column className="icon-column" header="Icon" body={icon_display} />
				<Column
					className="caught-column"
					header="Caught"
					body={this.caught_display}
				/>
				<Column
					className="rarity-column"
					field="rarity"
					header="Rarity"
					sortable={true}
				/>
				<Column
					className="price-column"
					field="price"
					header={<img className="bells-image" src={bells_image} alt="Price" />}
					sortable={true}
				/>
				<Column
					className="location-column"
					field="location"
					header="Location"
				/>
				<Column className="time-column" body={time_display} header="Time" />
				<Column
					className="month-column"
					sortable={true}
					style={month_id === 0 ? { backgroundColor: color } : {}}
					field="january"
					header="Jan"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={month_id === 1 ? { backgroundColor: color } : {}}
					field="february"
					header="Feb"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={month_id === 2 ? { backgroundColor: color } : {}}
					field="march"
					header="Mar"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={month_id === 3 ? { backgroundColor: color } : {}}
					field="april"
					header="Apr"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={month_id === 4 ? { backgroundColor: color } : {}}
					field="may"
					header="May"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={month_id === 5 ? { backgroundColor: color } : {}}
					field="june"
					header="June"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={month_id === 6 ? { backgroundColor: color } : {}}
					field="july"
					header="July"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={month_id === 7 ? { backgroundColor: color } : {}}
					field="august"
					header="Aug"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={month_id === 8 ? { backgroundColor: color } : {}}
					field="september"
					header="Sept"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={month_id === 9 ? { backgroundColor: color } : {}}
					field="october"
					header="Oct"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={month_id === 10 ? { backgroundColor: color } : {}}
					field="november"
					header="Nov"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={month_id === 11 ? { backgroundColor: color } : {}}
					field="december"
					header="Dec"
					body={month_display}
				/>
			</DataTable>
		);
	}
}
