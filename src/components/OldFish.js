import React, { Component } from 'react';
import { fish } from '../data_files/fish.json';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Checkbox from '@material-ui/core/Checkbox';
import bellsImage from '../images/bells.png';
import MobileName from './MobileName';
import ShadowSize from './ShadowSize';
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
			src={`https://acnhapi.com/v1/icons/${rowData.size ? 'fish' : 'bugs'}/${
				rowData.id
			}`}
			alt="Icon"
		/>
	);
};

const timeDisplay = (rowData) => {
	return <TimeDisplay critter={rowData} />;
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
		const fishData = this.props.hideCaught
			? fish.filter(
					(fish) => window.localStorage.getItem(fish.name) === 'false'
			  )
			: fish;
		return (
			<DataTable
				className="fish-datatable-container"
				value={fishData}
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
					field="rarity"
					header="Rarity"
					sortable={true}
				/>
				<Column
					className="price-column"
					field="price"
					header={<img className="bells-image" src={bellsImage} alt="Price" />}
					sortable={true}
				/>
				<Column
					className="location-column"
					field="location"
					header="Location"
				/>
				<Column className="size-column" header="Size" body={size_display} />
				<Column className="time-column" body={timeDisplay} header="Time" />

				<Column
					className="month-column"
					sortable={true}
					style={monthId === 0 ? { backgroundColor: color } : {}}
					field="january"
					header="Jan"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 1 ? { backgroundColor: color } : {}}
					field="february"
					header="Feb"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 2 ? { backgroundColor: color } : {}}
					field="march"
					header="Mar"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 3 ? { backgroundColor: color } : {}}
					field="april"
					header="Apr"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 4 ? { backgroundColor: color } : {}}
					field="may"
					header="May"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 5 ? { backgroundColor: color } : {}}
					field="june"
					header="June"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 6 ? { backgroundColor: color } : {}}
					field="july"
					header="July"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 7 ? { backgroundColor: color } : {}}
					field="august"
					header="Aug"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 8 ? { backgroundColor: color } : {}}
					field="september"
					header="Sept"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 9 ? { backgroundColor: color } : {}}
					field="october"
					header="Oct"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 10 ? { backgroundColor: color } : {}}
					field="november"
					header="Nov"
					body={month_display}
				/>
				<Column
					className="month-column"
					sortable={true}
					style={monthId === 11 ? { backgroundColor: color } : {}}
					field="december"
					header="Dec"
					body={month_display}
				/>
			</DataTable>
		);
	}
}
