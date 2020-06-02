import React, { Component } from 'react';
import { Card } from 'primereact/card';
import '../styles/TotalsMenu.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
const DarkTooltip = withStyles((theme) => ({
	tooltip: {
		fontSize: 20,
	},
}))(Tooltip);
class TotalsMenu extends Component {
	render() {
		return (
			<Card className="totals-container">
				<DarkTooltip
					placement="top"
					arrow
					title={`${this.props.totals.bugs_total}/80`}
				>
					<CircularProgress
						variant="static"
						// value={(this.props.totals.bugs_total / 80) * 100}
						value={100}
						className="bug-spinner spinner"
						style={{
							color: `${
								(this.props.totals.bugs_total / 80) * 100 >= 100
									? 'gold'
									: 'green'
							}`,
						}}
					/>
				</DarkTooltip>
				<div className="total">
					<span role="img" aria-label="emoji">
						🐛
					</span>
				</div>
				<DarkTooltip
					placement="top"
					arrow
					title={`${this.props.totals.fish_total}/80`}
				>
					<CircularProgress
						variant="static"
						// value={(this.props.totals.fish_total / 80) * 100}
						value={100}
						className="fish-spinner spinner"
						style={{
							color: `${
								(this.props.totals.fish_total / 80) * 100 >= 100
									? 'gold'
									: 'blue'
							}`,
						}}
					/>
				</DarkTooltip>
				<div className="total">
					<span role="img" aria-label="emoji">
						🎣
					</span>
				</div>
				<DarkTooltip
					placement="top"
					arrow
					title={`${this.props.totals.fossils_total}/73`}
				>
					<CircularProgress
						variant="static"
						// value={(this.props.totals.fossils_total / 73) * 100}
						value={100}
						className="fossil-spinner spinner"
						style={{
							color: `${
								(this.props.totals.fossils_total / 73) * 100 >= 100
									? 'gold'
									: 'green'
							}`,
						}}
					/>
				</DarkTooltip>
				<div className="total">
					<span role="img" aria-label="emoji">
						⛏
					</span>
				</div>
				<DarkTooltip
					placement="top"
					arrow
					title={`${this.props.totals.songs_total}/95`}
				>
					<CircularProgress
						variant="static"
						// value={(this.props.totals.songs_total / 95) * 100}
						value={100}
						className="song-spinner spinner"
						style={{
							color: `${
								(this.props.totals.songs_total / 95) * 100 >= 100
									? 'gold'
									: 'blue'
							}`,
						}}
					/>
				</DarkTooltip>
				<div className="total">
					<span role="img" aria-label="emoji">
						🎵
					</span>
				</div>
			</Card>
		);
	}
}

export default TotalsMenu;
