import React, { Component } from 'react';
import '../styles/Header.css';
import ac_logo from '../images/logo.png';
class Header extends Component {
	render() {
		return (
			<div className="header-container">
				<img className="logo-image" src={ac_logo} alt="AC" />
				<p className="title">WildLife Tracker</p>
			</div>
		);
	}
}

export default Header;
