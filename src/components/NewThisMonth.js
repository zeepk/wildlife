import React, { useState } from 'react'
import { Button } from 'primereact/button'
import { bugs } from '../data_files/bugs.json'
import { fish } from '../data_files/fish.json'
import { sea } from '../data_files/sea.json'
import '../styles/NewThisMonth.css'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

function NewThisMonth(props) {
	const name_display = (rowData, column) => {
		return (
			<div style={{ textTransform: 'capitalize' }}>
				{rowData.name.split('_').join(' ')}
			</div>
		)
	}
	const icon_display = (rowData) => {
		let type = ''
		if (rowData.size) {
			type = 'fish'
		} else if (rowData.availability) {
			type = 'sea'
		} else {
			type = 'bugs'
		}
		return (
			<img
				className="new-critter-image"
				src={`https://acnhapi.com/v1/icons/${type}/${rowData.id}`}
				alt="Icon"
			/>
		)
	}
	const [visible, setVisible] = useState(false)
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
	]
	const date = new Date()
	const is_end_of_month = date.getDate() > 20
	const current_month_id = is_end_of_month
		? date.getMonth() + 1
		: date.getMonth()
	const current_month = monthNames[current_month_id]
	const message = is_end_of_month
		? `Coming soon in ${current_month}!`
		: `New for ${current_month}!`
	const last_month = monthNames[current_month_id - 1].toLocaleLowerCase()
	const current_month_lower = current_month.toLocaleLowerCase()
	const new_fish = fish.filter((f) => {
		return f[current_month_lower] === '1' && f[last_month] === ''
	})
	const new_sea = sea.filter((creature) => {
		return (
			creature.availability['month-array-northern'].includes(
				current_month_id
			) &&
			!creature.availability['month-array-northern'].includes(
				current_month_id - 1
			)
		)
	})
	const new_bugs = bugs.filter((f) => {
		return f[current_month_lower] === '1' && f[last_month] === ''
	})

	const new_data = [...new_sea, ...new_fish, ...new_bugs]

	return (
		<div>
			<Dialog
				className="dialog-container"
				header={message}
				visible={visible}
				style={{ width: '50vw', zIndex: 1000 }}
				modal={true}
				onHide={() => setVisible(false)}
			>
				<DataTable className="new-container" value={new_data}>
					<Column
						className="name-column"
						field="name"
						header="Name"
						body={name_display}
					/>
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
				label={'😯 ' + message}
				className="button-container p-button-raised p-button-rounded"
				icon=""
				onClick={(e) => setVisible(true)}
			/>
		</div>
	)
}

export default NewThisMonth
