import React, { useState, useEffect } from 'react';
import { months, apiUrl } from '../../utils/constants';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import Checkbox from '@material-ui/core/Checkbox';
import NoCritters from '../common/NoCritters';
import bellsImage from '../../images/bells.png';
import IconDisplay from '../displays/IconDisplay';
import LoadingScreen from '../common/LoadingScreen';
import CellNameDisplay from '../displays/CellNameDisplay';
import CellMonthDisplay from '../displays/CellMonthDisplay';
import TimeStringDisplay from '../displays/TimeStringDisplay';
const Bugs = (props) => {
	const [ren, setRen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [visible, setVisible] = useState(false);
	const [mobileData, setMobileData] = useState([]);
	const [mobileIconUri, setMobileIconUri] = useState('');

	useEffect(() => {
		fetch(`${apiUrl}/bugs`)
			.then((response) => response.json())
			.then((jsonData) => {
				const formattedData = [];
				for (const critter in jsonData) {
					const critterObject = {
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
						isAllYear: jsonData[critter]['availability']['isAllYear'],
						timeString: jsonData[critter]['availability']['time'],
						isAllDay: jsonData[critter]['availability']['isAllDay'],
						timeArray: jsonData[critter]['availability']['time-array'],
						price: jsonData[critter]['price'],
						iconUri: jsonData[critter]['icon_uri'],
						rarity: jsonData[critter]['availability']['rarity'],
						location: jsonData[critter]['availability']['location'],
					};
					months.forEach((month) => {
						critterObject[month.name] = jsonData[critter]['availability'][
							'month-array-northern'
						].includes(month.order);
					});
					formattedData.push(critterObject);
				}
				setData(formattedData);
			})
			.then(() => setLoading(false));
	}, []);

	const openModal = (critterData) => {
		const modalData = [
			{ title: 'Name', data: critterData.name },
			{ title: 'Rarity', data: critterData.rarity },
			{ title: 'Location', data: critterData.location },
			{ title: 'Time', data: critterData.timeString || 'All Day' },
			{
				title: 'Months',
				data: critterData.isAllYear
					? 'Year Round'
					: critterData.monthArrayNorth
							.map((monthId) => months[monthId - 1].name)
							.join(', '),
			},
		];
		setMobileIconUri(critterData.iconUri);
		setMobileData(modalData);
		setVisible(true);
	};

	const monthSort = (props) => {
		setData(
			data.sort((a, b) => {
				if (
					a.monthArrayNorth.includes(props.field) &&
					b.monthArrayNorth.includes(props.field)
				) {
					return 0;
				} else if (a.monthArrayNorth.includes(props.field)) {
					return 0 - props.order;
				} else {
					return props.order;
				}
			})
		);
		return data;
	};

	const monthColumns = months.map((month) => {
		return (
			<Column
				className="month-column"
				sortable={true}
				sortFunction={monthSort}
				field={month.order}
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
	if (filteredData.length <= 0) {
		return <NoCritters />;
	}
	return (
		<div>
			<Dialog
				className="mobile-dialog-container"
				visible={visible}
				modal={true}
				onHide={() => setVisible(false)}
				header={<IconDisplay mobile iconUri={mobileIconUri} />}
			>
				{
					<DataTable value={mobileData}>
						<Column className="modal--title-col" field="title" />
						<Column field="data" />
					</DataTable>
				}
			</Dialog>
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
					body={(rowData) => (
						<div onClick={() => openModal(rowData)}>
							<CellNameDisplay name={rowData.name} />
						</div>
					)}
					filterMatchMode="contains"
				/>
				<Column className="icon-column" header="Icon" body={IconDisplay} />
				<Column
					className="caught-column"
					header="Caught"
					body={caughtDisplay}
				/>
				<Column
					className="rarity-column"
					field="rarity"
					header="Rarity"
					sortable={true}
				/>
				<Column
					className="location-column"
					field="location"
					header="Location"
				/>
				<Column
					className="price-column"
					field="price"
					header={<img className="bells-image" src={bellsImage} alt="Price" />}
					sortable={true}
				/>
				<Column
					className="time-column"
					body={TimeStringDisplay}
					header="Time"
				/>

				{monthColumns}
			</DataTable>
		</div>
	);
};
export default Bugs;
