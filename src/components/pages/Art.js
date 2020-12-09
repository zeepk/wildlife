import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../utils/constants';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import Checkbox from '@material-ui/core/Checkbox';
import FakeArt from '../displays/FakeArt';
import NoCritters from '../common/NoCritters';
import bellsImage from '../../images/bells.png';
import IconDisplay from '../displays/IconDisplay';
import LoadingScreen from '../common/LoadingScreen';
import CellNameDisplay from '../displays/CellNameDisplay';
const Art = (props) => {
	const [ren, setRen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [lightboxVisible, setLightboxVisible] = useState(false);
	const [lightboxData, setLightboxData] = useState({});
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(`${apiUrl}/art`)
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
						price: jsonData[critter]['buy-price'],
						iconUri: jsonData[critter]['image_uri'],
						hasFake: jsonData[critter]['hasFake'],
					});
				}
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
	if (filteredData.length <= 0) {
		return <NoCritters />;
	}
	return (
		<div>
			<Dialog
				header={lightboxData.name}
				visible={lightboxVisible}
				modal={true}
				onHide={() => setLightboxVisible(false)}
			>
				<FakeArt
					name={lightboxData.name}
					hasFake={lightboxData.hasFake}
					modal={true}
				/>
			</Dialog>
			<DataTable className="fossils-datatable-container" value={filteredData}>
				<Column
					className="name-column"
					field="name"
					header="Name"
					sortable={true}
					filter={true}
					filterPlaceholder="Search"
					body={(rowData) => (
						<div
							onClick={() => {
								setLightboxData(rowData);
								setLightboxVisible(true);
							}}
						>
							<CellNameDisplay name={rowData.name} />
						</div>
					)}
					filterMatchMode="contains"
					style={{ textDecoration: 'none' }}
				/>
				<Column className="icon-column" header="Icon" body={IconDisplay} />
				<Column
					className="caught-column"
					header="Caught"
					body={caughtDisplay}
				/>
				<Column
					className="price-column"
					field="price"
					header={<img className="bells-image" src={bellsImage} alt="Price" />}
					sortable={true}
				/>
				<Column
					className="fake-art-column"
					header="Fake"
					body={(rowData) => (
						<div
							onClick={() => {
								setLightboxData(rowData);
								setLightboxVisible(true);
							}}
						>
							<FakeArt name={rowData.name} hasFake={rowData.hasFake} />
						</div>
					)}
				/>
			</DataTable>
		</div>
	);
};
export default Art;
