import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Checkbox from '@material-ui/core/Checkbox';
import bellsImage from '../images/bells.png';
import LoadingScreen from './LoadingScreen';
import { months, apiUrl } from '../../src/utils/constants';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const Bugs = (props) => {
	const [ren, setRen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(`${apiUrl}/bugs`)
			.then((response) => response.json())
			.then((jsonData) => {
				const formattedData = [];
				for (const critter in jsonData) {
					formattedData.push({
						id: jsonData[critter]['id'],
						name: jsonData[critter]['name']['name-USen']
							.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
							.replace(/(^|[\s-])\S/g, function (match) {
								return match.toUpperCase();
							}),
						fileName: jsonData[critter]['file-name'],
						monthArrayNorth:
							jsonData[critter]['availability']['month-array-northern'],
						monthArraySouth:
							jsonData[critter]['availability']['month-array-southern'],
						timeString: jsonData[critter]['availability']['time'],
						isAllDay: jsonData[critter]['availability']['isAllDay'],
						timeArray: jsonData[critter]['availability']['time-array'],
						price: jsonData[critter]['price'],
						iconUri: jsonData[critter]['icon_uri'],
						rarity: jsonData[critter]['availability']['rarity'],
						location: jsonData[critter]['availability']['location'],
					});
				}
				console.log(formattedData);
				setData(formattedData);
			})
			.then(() => setLoading(false));
	}, []);

	const nameDisplay = (rowData, column) => {
		return window.innerWidth < 480 ? (
			// <MobileName data={rowData} />
			<div>{rowData.name}</div>
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
		return <img className="critter-image" src={rowData.iconUri} alt="Icon" />;
	};

	const timeDisplay = (rowData) => {
		const isAvailableNow =
			rowData.isAllDay || rowData.timeArray.includes(new Date().getHours());
		return (
			<TimeCell isAvailableNow={isAvailableNow}>
				{rowData.timeString || 'All Day'}
			</TimeCell>
		);
	};
	const monthDisplay = (rowData, column) => {
		if (rowData.monthArrayNorth.includes(column.monthNumber)) {
			return (
				<CheckCircleIcon
					style={{ color: 'green', fontSize: '30px', zIndex: '' }}
				/>
			);
		}
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
				monthNumber={month.order}
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
	const filteredData = props.hideCaught
		? data.filter(
				(critter) => window.localStorage.getItem(critter.name) === 'false'
		  )
		: data;
	if (loading) {
		return <LoadingScreen />;
	}
	return (
		<DataTable
			className="bugs-datatable-container"
			value={filteredData}
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
			<Column className="location-column" field="location" header="Location" />
			<Column
				className="price-column"
				field="price"
				header={<img className="bells-image" src={bellsImage} alt="Price" />}
				sortable={true}
			/>
			<Column className="time-column" body={timeDisplay} header="Time" />

			{monthColumns}
		</DataTable>
	);
};
export default Bugs;

const TimeCell = styled.div`
	background-color: ${(props) => (props.isAvailableNow ? '#a1d6a1' : '')};
	height: 100%;
`;
