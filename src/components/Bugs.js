import React, { useState } from 'react';
import { bugs } from '../data_files/bugs.json';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Checkbox from '@material-ui/core/Checkbox';
import bellsImage from '../images/bells.png';
import MobileName from './MobileName';
import TimeDisplay from './TimeDisplay';
import { months } from '../../src/utils/constants';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const Bugs = (props) => {
	const [ren, setRen] = useState(false);

	const monthDisplay = (rowData, column) => {
		if (rowData[column.field] === '1') {
			return (
				<CheckCircleIcon
					style={{ color: 'green', fontSize: '30px', zIndex: '' }}
				/>
			);
		}
	};
	const nameDisplay = (rowData, column) => {
		return window.innerWidth < 480 ? (
			<MobileName data={rowData} />
		) : (
			<div>{rowData.name}</div>
		);
	};

	// checks local storage to populate checkboxes
	const isChecked = (name) => {
		if (window.localStorage.getItem(name) === 'true') {
			return true;
		} else {
			return false;
		}
	};

	const iconDisplay = (rowData) => {
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

	const monthColumns = months.map((month) => {
		return (
			<Column
				className="month-column"
				sortable={true}
				style={
					new Date().getMonth() === month.id
						? { backgroundColor: 'var(--monthColor)' }
						: {}
				}
				field={month.name.toLowerCase()}
				header={month.abbreviation}
				body={monthDisplay}
			/>
		);
	});

	const checkboxChange = (name) => {
		console.log('changing...');
		if (window.localStorage.getItem(name) === 'false') {
			window.localStorage.setItem(name, 'true');
		} else if (window.localStorage.getItem(name) === 'true') {
			window.localStorage.setItem(name, 'false');
		} else {
			alert('Something went wrong with updating local storage');
		}
		setRen(!ren);
		return name;
	};
	const caughtDisplay = (rowData) => {
		return (
			<Checkbox
				color="primary"
				checked={isChecked(rowData.name)}
				onChange={() => checkboxChange(rowData.name)}
			/>
		);
	};
	const bugData = props.hideCaught
		? bugs.filter((bug) => window.localStorage.getItem(bug.name) === 'false')
		: bugs;
	return (
		<DataTable
			className="bugs-datatable-container"
			value={bugData}
			// responsive={true}
		>
			<Column
				className="name-column"
				field="name"
				header="Name"
				sortable={true}
				filter={true}
				filterPlaceholder="Search"
				body={nameDisplay}
				filterMatchMode="contains"
			/>
			<Column className="icon-column" header="Icon" body={iconDisplay} />
			<Column className="caught-column" header="Caught" body={caughtDisplay} />
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
			<Column className="location-column" field="location" header="Location" />
			<Column className="time-column" body={timeDisplay} header="Time" />
			{monthColumns}
		</DataTable>
	);
};
export default Bugs;
