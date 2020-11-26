import React, { Component } from 'react';
import { sea } from '../data_files/sea.json';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Checkbox from '@material-ui/core/Checkbox';
import bellsImage from '../images/bells.png';
import MobileName from './MobileName';
import TimeDisplay from './TimeDisplay';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const month_display = (rowData, column) => {
	// console.log(column)
	// console.log(rowData)
	// if (rowData[column.field] === '1') {
	if (rowData.availability['month-array-northern'].includes(column.monthid)) {
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
		<div style={{ textTransform: 'capitalize' }}>
			{rowData.name.split('_').join(' ')}
		</div>
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
	return <img className="critter-image" src={rowData.icon_uri} alt="Icon" />;
};

const timeDisplay = (rowData) => {
	return <TimeDisplay critter={rowData.availability} />;
};

export default class Fish extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ren: false,
		};
	}
	checkboxChange = (name) => {
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
	caughtDisplay = (rowData) => {
		return (
			<Checkbox
				color="primary"
				checked={is_checked(rowData.name)}
				onChange={() => this.checkboxChange(rowData.name)}
			/>
		);
	};
	render() {
		const date = new Date();
		const monthId = date.getMonth();
		const color = '#a1d6a1';
		const sea_data = this.props.hideCaught
			? sea.filter(
					(creature) => window.localStorage.getItem(creature.name) === 'false'
			  )
			: sea;
		return (
			<DataTable
				className="fish-datatable-container"
				value={sea_data}
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
					body={this.caughtDisplay}
				/>
				<Column
					className="rarity-column"
					field="speed"
					header="Speed"
					sortable={true}
				/>
				<Column
					className="price-column"
					field="price"
					header={<img className="bells-image" src={bellsImage} alt="Price" />}
					sortable={true}
				/>
				<Column className="size-column" field="shadow" header="Size" />
				<Column className="time-column" body={timeDisplay} header="Time" />
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 0 ? { backgroundColor: color } : {}}
					header="Jan"
					monthid={1}
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 1 ? { backgroundColor: color } : {}}
					header="Feb"
					monthid={2}
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 2 ? { backgroundColor: color } : {}}
					header="Mar"
					monthid={3}
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 3 ? { backgroundColor: color } : {}}
					header="Apr"
					monthid={4}
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 4 ? { backgroundColor: color } : {}}
					header="May"
					monthid={5}
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 5 ? { backgroundColor: color } : {}}
					header="June"
					monthid={6}
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 6 ? { backgroundColor: color } : {}}
					header="July"
					monthid={7}
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 7 ? { backgroundColor: color } : {}}
					header="Aug"
					monthid={8}
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 8 ? { backgroundColor: color } : {}}
					header="Sept"
					monthid={9}
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 9 ? { backgroundColor: color } : {}}
					header="Oct"
					monthid={10}
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 10 ? { backgroundColor: color } : {}}
					header="Nov"
					monthid={11}
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 11 ? { backgroundColor: color } : {}}
					header="Dec"
					monthid={12}
					body={month_display}
				/>
			</DataTable>
		);
	}
}
