import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { bugs } from '../data_files/bugs.json';
import { fish } from '../data_files/fish.json';
import '../styles/NewThisMonth.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function NewThisMonth(props) {
	const icon_display = (rowData) => {
		return (
			<img
				className="bug-image"
				src={`http://acnhapi.com/icons/${rowData.size ? 'fish' : 'bugs'}/${
					rowData.id
				}`}
				alt="Icon"
			/>
		);
	};
	const [visible, setVisible] = useState(false);
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const date = new Date();
	const current_month_id = date.getMonth();
	const current_month = monthNames[current_month_id];
	const last_month = monthNames[current_month_id - 1].toLocaleLowerCase();
	const current_month_lower = current_month.toLocaleLowerCase();
	const new_fish = fish.filter((f) => {
		return f[current_month_lower] === '1' && f[last_month] === '';
	});
	const new_bugs = bugs.filter((f) => {
		return f[current_month_lower] === '1' && f[last_month] === '';
	});

	const new_data = new_fish.concat(new_bugs);

	return (
		<div>
			<Dialog
				className="dialog-container"
				header={'New for ' + current_month + '!'}
				visible={visible}
				style={{ width: '50vw', zIndex: 1000 }}
				modal={true}
				onHide={() => setVisible(false)}
			>
				<DataTable className="new-container" value={new_data}>
					<Column className="name-column" field="name" header="Name" />
					<Column className="name-column" header="Icon" body={icon_display} />
					<Column
						className="location-column"
						field="location"
						header="Location"
					/>
					<Column className="time-column" field="time_string" header="Time" />
				</DataTable>
			</Dialog>

			<Button
				label={'New for ' + current_month + '!'}
				className="button-container"
				icon="pi pi-info-circle"
				onClick={(e) => setVisible(true)}
			/>
		</div>
	);
}

export default NewThisMonth;
