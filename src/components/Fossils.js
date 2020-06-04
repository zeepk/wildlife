import React, { Component } from 'react';
import { fossils } from '../data_files/fossils.json';
import Checkbox from '@material-ui/core/Checkbox';
import bells_image from '../images/bells.png';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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
			src={`https://acnhapi.com/images/fossils/${rowData.filename}`}
			alt="Icon"
		/>
	);
};

export default class Fossils extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ren: false,
		};
	}
	checkbox_change = (name) => {
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
	caught_display = (rowData) => {
		return (
			<Checkbox
				color="primary"
				checked={is_checked(rowData.name.name)}
				onChange={() => this.checkbox_change(rowData.name.name)}
			/>
		);
	};
	render() {
		const fossils_data = this.props.hideCaught
			? fossils.filter(
					(fossil) => window.localStorage.getItem(fossil.name.name) === 'false'
			  )
			: fossils;
		return (
			<DataTable
				className="fossils-datatable-container"
				value={fossils_data}
				style={{ width: '50vw' }}
			>
				<Column
					className="name-column"
					header="Name"
					sortable={true}
					filter={true}
					filterPlaceholder="Search"
					field="name.name"
					filterMatchMode="contains"
				/>
				<Column className="icon-column" header="Icon" body={icon_display} />
				<Column
					className="caught-column"
					header="Found"
					body={this.caught_display}
				/>
				<Column
					className="price-column"
					field="price"
					header={<img className="bells-image" src={bells_image} alt="Price" />}
					sortable={true}
				/>
			</DataTable>
		);
	}
}
