import React, { Component } from 'react';
import { songs } from '../data_files/songs.json';
import Checkbox from '@material-ui/core/Checkbox';
import bellsImage from '../images/bells.png';

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
			src={`https://acnhapi.com/v1/images/songs/${rowData.id}`}
			alt="Icon"
		/>
	);
};

export default class Songs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ren: false,
		};
	}
	checkboxChange = (name) => {
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
	caughtDisplay = (rowData) => {
		return (
			<Checkbox
				color="primary"
				checked={is_checked(rowData.name.name)}
				onChange={() => this.checkboxChange(rowData.name.name)}
			/>
		);
	};
	render() {
		const songsData = this.props.hideCaught
			? songs.filter(
					(song) => window.localStorage.getItem(song.name.name) === 'false'
			  )
			: songs;
		return (
			<DataTable
				className="songs-datatable-container"
				value={songsData}
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
					body={this.caughtDisplay}
				/>
				<Column
					className="price-column"
					field="price"
					header={<img className="bells-image" src={bellsImage} alt="Price" />}
					sortable={true}
				/>
			</DataTable>
		);
	}
}
