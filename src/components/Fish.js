import React, { useState, useEffect } from 'react';
import { months, apiUrl } from '../../src/utils/constants';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Checkbox from '@material-ui/core/Checkbox';
import bellsImage from '../images/bells.png';
import IconDisplay from './IconDisplay';
import LoadingScreen from './LoadingScreen';
import CellNameDisplay from './CellNameDisplay';
import CellMonthDisplay from './CellMonthDisplay';
import TimeStringDisplay from './TimeStringDisplay';
const Fish = (props) => {
	const [ren, setRen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(`${apiUrl}/fish`)
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
						size: jsonData[critter]['shadow'],
					});
				}
				console.log(formattedData);
				setData(formattedData);
			})
			.then(() => setLoading(false));
	}, []);

	const monthColumns = months.map((month) => {
		return (
			<Column
				className="month-column"
				sortable={true}
				style={
					new Date().getMonth() === month.id
						? { backgroundColor: 'var(--monthHighlight)' }
						: {}
				}
				monthNumber={month.order}
				header={month.abbreviation}
				body={CellMonthDisplay}
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
				checked={window.localStorage.getItem(rowData.name) === 'true'}
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
			className="fish-datatable-container"
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
				body={CellNameDisplay}
				filterMatchMode="contains"
			/>
			<Column className="icon-column" header="Icon" body={IconDisplay} />
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
			<Column
				className="size-column"
				header="Size"
				body={(rowData) => <div>{rowData.size.split(' ')[0]}</div>}
			/>
			<Column className="time-column" body={TimeStringDisplay} header="Time" />

			{monthColumns}
		</DataTable>
	);
};
export default Fish;
