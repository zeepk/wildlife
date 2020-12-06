import React, { useState, useEffect } from 'react';
import { apiUrl, isOrderableText } from '../../utils/constants';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import NoCritters from '../common/NoCritters';
import Checkbox from '@material-ui/core/Checkbox';
import IconDisplay from '../displays/IconDisplay';
import LoadingScreen from '../common/LoadingScreen';
import CellNameDisplay from '../displays/CellNameDisplay';
import ReactAudioPlayer from 'react-audio-player';
const Songs = (props) => {
	const [ren, setRen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(`${apiUrl}/songs`)
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
						audioUri: jsonData[critter]['music_uri'],
						isOrderable: jsonData[critter]['isOrderable'],
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
	const methodDisplay = (rowData) => {
		if (rowData.isOrderable) {
			return <div>{isOrderableText}</div>;
		}
		let methodText = isOrderableText;
		switch (rowData.id) {
			case 3:
			case 8:
			case 9:
				methodText = 'Special Request';
				break;
			case 19:
				methodText = 'Your Birthday Party';
				break;
			case 95:
				methodText = '3 Star Island';
				break;
			default:
				methodText = isOrderableText;
		}
		return <div>{methodText}</div>;
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
		<DataTable
			className="songs-datatable-container"
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
			<Column className="method-column" header="Method" body={methodDisplay} />
			<Column
				className="audio-column"
				header="Audio"
				body={(rowData) => (
					<ReactAudioPlayer
						src={rowData.audioUri}
						autoPlay={false}
						controls
						style={{ width: '90%' }}
					/>
				)}
			/>
		</DataTable>
	);
};
export default Songs;
