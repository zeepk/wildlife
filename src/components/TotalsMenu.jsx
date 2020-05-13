import React, { Component } from 'react';
import { Card } from 'primereact/card';
import '../styles/TotalsMenu.css';
class TotalsMenu extends Component {
	render() {
		return (
			<Card className="totals-container">
				<div className="total">
					<span role="img" aria-label="emoji">
						🐛
					</span>
					{this.props.totals.bugs_total}/80
				</div>
				<div className="total">
					<span role="img" aria-label="emoji">
						🐠
					</span>
					{this.props.totals.fish_total}/80
				</div>
				<div className="total">
					<span role="img" aria-label="emoji">
						⛏
					</span>
					{this.props.totals.fossils_total}/73
				</div>
				<div className="total">
					<span role="img" aria-label="emoji">
						🎵
					</span>
					{this.props.totals.songs_total}/95
				</div>
			</Card>
		);
	}
}

export default TotalsMenu;
