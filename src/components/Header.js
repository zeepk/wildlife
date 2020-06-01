import React, { Component } from 'react';
import '../styles/Header.css';
import ac_logo from '../images/logo.png';
import NewThisMonth from './NewThisMonth';
import Grid from '@material-ui/core/Grid';
import { Button } from 'primereact/button';

class Header extends Component {
	render() {
		return (
			<div className="header-container">
				<Grid className="header-container" container spacing={0}>
					<Grid className="grid-item" item xs={12} sm={3}>
						<Button
							className="mobile settings p-button-raised p-button-rounded"
							icon="pi pi-cog"
							onClick={() => this.props.toggle()}
							label="Menu"
						/>
					</Grid>
					<Grid className="grid-item" item xs={12} sm={6}>
						<img className="logo-image" src={ac_logo} alt="AC" />
						<p className="title">WildLife Tracker</p>
					</Grid>
					<Grid className="grid-item" item xs={12} sm={3}>
						<NewThisMonth />
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default Header;
