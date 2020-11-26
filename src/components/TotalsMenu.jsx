import React from 'react';
import FossilIcon from '../images/fossilIcon.png';
import FishIcon from '../images/fishIcon.png';
import BugIcon from '../images/bugIcon.png';
import SongIcon from '../images/kkslider.png';
import SeaIcon from '../images/sea.png';
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

const TotalsMenu = (props) => {
	const bugTotal = props.totals.bugsTotal;
	const fishTotal = props.totals.fishTotal;
	const fossilTotal = props.totals.fossilsTotal;
	const songTotal = props.totals.songsTotal;
	const seaTotal = props.totals.seaTotal;
	return (
		<Card className="totals-container">
			<DarkTooltip placement="top" arrow title={`${fishTotal}/80`}>
				<CircularProgress
					variant="static"
					value={(fishTotal / 80) * 100}
					// value={100}
					className="fish-spinner spinner"
					style={{
						color: `${(fishTotal / 80) * 100 >= 100 ? 'gold' : 'blue'}`,
					}}
				/>
			</DarkTooltip>
			<div className="total">
				<span role="img">
					<img src={FishIcon} alt="Fish" className="icon" />
				</span>
			</div>
			<DarkTooltip placement="top" arrow title={`${bugTotal}/80`}>
				<CircularProgress
					variant="static"
					value={(bugTotal / 80) * 100}
					// value={100}
					className="bug-spinner spinner"
					style={{
						color: `${(bugTotal / 80) * 100 >= 100 ? 'gold' : 'green'}`,
					}}
				/>
			</DarkTooltip>
			<div className="total">
				<span role="img">
					<img src={BugIcon} alt="Bugs" className="icon" />
				</span>
			</div>
			<DarkTooltip placement="top" arrow title={`${seaTotal}/40`}>
				<CircularProgress
					variant="static"
					value={(seaTotal / 40) * 100}
					// value={100}
					className="sea-spinner spinner"
					style={{
						color: `${(seaTotal / 40) * 100 >= 100 ? 'gold' : 'blue'}`,
					}}
				/>
			</DarkTooltip>
			<div className="total">
				<span role="img">
					<img src={SeaIcon} alt="Sea" className="icon" />
				</span>
			</div>
			<DarkTooltip placement="top" arrow title={`${fossilTotal}/73`}>
				<CircularProgress
					variant="static"
					value={(fossilTotal / 73) * 100}
					// value={100}
					className="fossil-spinner spinner"
					style={{
						color: `${(fossilTotal / 73) * 100 >= 100 ? 'gold' : 'green'}`,
					}}
				/>
			</DarkTooltip>
			<div className="total">
				<span role="img">
					<img src={FossilIcon} alt="Fossils" className="icon" />
				</span>
			</div>
			<DarkTooltip placement="top" arrow title={`${songTotal}/95`}>
				<CircularProgress
					variant="static"
					value={(songTotal / 95) * 100}
					// value={100}
					className="song-spinner spinner"
					style={{
						color: `${(songTotal / 95) * 100 >= 100 ? 'gold' : 'blue'}`,
					}}
				/>
			</DarkTooltip>
			<div className="total">
				<span role="img">
					<img src={SongIcon} alt="Song" className="icon" />
				</span>
			</div>
		</Card>
	);
};

export default TotalsMenu;
