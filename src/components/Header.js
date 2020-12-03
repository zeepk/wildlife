import React, { Component } from 'react';
import { messageOfTheDay } from '../utils/constants';
import '../styles/Header.css';
import NewThisMonth from './NewThisMonth';
import { InputSwitch } from 'primereact/inputswitch';
import { Card } from 'primereact/card';
import '../styles/TotalsMenu.css';
import TotalsMenu from './TotalsMenu';
import { Link } from 'react-router-dom';
import FossilIcon from '../images/fossilIcon.png';
import FishIcon from '../images/fishIcon.png';
import BugIcon from '../images/bugIcon.png';
import SongIcon from '../images/kkslider.png';
import SeaIcon from '../images/sea.png';

class Header extends Component {
	state = {
		hideCaught: false,
	};

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
				<a className="navbar-brand" href="/">
					<p className="title">WildLife Tracker</p>
					<p className="motd">{messageOfTheDay}</p>
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarColor01"
					aria-controls="navbarColor01"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="nav-text collapse navbar-collapse" id="navbarColor01">
					<ul className="navbar-nav ml-3">
						<li className=" pr-0 nav-item active">
							<Link to="/">
								<span role="img">
									<img src={FishIcon} alt="Fish" className="icon" />
								</span>
								{' Fish'}
							</Link>
						</li>
						<li className=" pr-0 nav-item">
							<Link to="/bugs">
								<span role="img">
									<img src={BugIcon} alt="Bugs" className="icon" />
								</span>
								{' Bugs'}
							</Link>
						</li>
						<li className=" pr-0 nav-item">
							<Link to="/sea">
								<span role="img">
									<img src={SeaIcon} alt="Sea" className="icon" />
								</span>
								{' Sea'}
							</Link>
						</li>
						<li className=" pr-0 nav-item">
							<Link to="/fossils">
								<span role="img">
									<img src={FossilIcon} alt="Fossils" className="icon" />
								</span>
								{' Fossils'}
							</Link>
						</li>
						<li className=" pr-0 nav-item">
							<Link to="/songs">
								<span role="img">
									<img src={SongIcon} alt="Songs" className="icon" />
								</span>
								{' Songs'}
							</Link>
						</li>
					</ul>

					<div className="mr-5">
						<TotalsMenu />
					</div>
					<div className="mr-5">
						<Card className="hide-caught">
							<div className="hide-text">Hide Caught</div>
							<InputSwitch
								checked={this.state.hideCaught}
								onChange={() => {
									this.props.toggleCaught();
									this.setState({
										hideCaught: !this.state.hideCaught,
									});
								}}
							/>
						</Card>
					</div>
					<div className="mr-5">
						<NewThisMonth />
					</div>
				</div>
			</nav>
		);
	}
}

export default Header;
