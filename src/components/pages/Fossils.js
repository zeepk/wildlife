import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../utils/constants';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Checkbox from '@material-ui/core/Checkbox';
import bellsImage from '../../images/bells.png';
import IconDisplay from '../displays/IconDisplay';
import LoadingScreen from '../common/LoadingScreen';
import CellNameDisplay from '../displays/CellNameDisplay';
const Fossils = (props) => {
	const [ren, setRen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(`${apiUrl}/fossils`)
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
						price: jsonData[critter]['price'],
						iconUri: jsonData[critter]['image_uri'],
					});
				}
				console.log(formattedData);
				setData(formattedData);
			})
			.then(() => setLoading(false));
	}, []);
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
		const legacyName = rowData.name
			.toLowerCase()
			.replace(/^./, rowData.name[0].toUpperCase());
		console.log(legacyName);
		return (
			<Checkbox
				color="primary"
				checked={window.localStorage.getItem(legacyName) === 'true'}
				onChange={() => checkboxChange(legacyName)}
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
			className="fossils-datatable-container"
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
				style={{ textDecoration: 'none' }}
			/>
			<Column className="icon-column" header="Icon" body={IconDisplay} />
			<Column className="caught-column" header="Caught" body={caughtDisplay} />
			<Column
				className="price-column"
				field="price"
				header={<img className="bells-image" src={bellsImage} alt="Price" />}
				sortable={true}
			/>
		</DataTable>
	);
};
export default Fossils;
