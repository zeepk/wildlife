import React, { useState, useEffect } from 'react';
import FossilIcon from '../../images/fossilIcon.png';
import FishIcon from '../../images/fishIcon.png';
import BugIcon from '../../images/bugIcon.png';
import SongIcon from '../../images/kkslider.png';
import SeaIcon from '../../images/sea.png';
import ArtIcon from '../../images/reddIcon.png';
import { Card } from 'primereact/card';
import '../../styles/TotalsMenu.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { apiUrl } from '../../../src/utils/constants';

const DarkTooltip = withStyles((theme) => ({
	tooltip: {
		fontSize: 20,
	},
}))(Tooltip);

const countTotal = (nameArray) => {
	let count = 0;
	nameArray.forEach((critterName) => {
		window.localStorage.getItem(critterName) === 'true' && (count += 1);
	});
	return count;
};

const TotalsMenu = () => {
	const [bugTotal, setBugTotal] = useState(0);
	const [fishTotal, setFishTotal] = useState(0);
	const [seaTotal, setSeaTotal] = useState(0);
	const [fossilTotal, setFossilTotal] = useState(0);
	const [songTotal, setSongTotal] = useState(0);
	const [artTotal, setArtTotal] = useState(0);

	useEffect(() => {
		Promise.all([
			fetch(`${apiUrl}/fish`),
			fetch(`${apiUrl}/bugs`),
			fetch(`${apiUrl}/sea`),
			fetch(`${apiUrl}/fossils`),
			fetch(`${apiUrl}/songs`),
			fetch(`${apiUrl}/art`),
		])
			.then((responses) =>
				Promise.all(responses.map((response) => response.json()))
			)
			.then((data) => {
				const numFish = countTotal(
					Object.keys(data[0]).map((critter) => {
						return data[0][critter]['name']['name-USen']
							.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
							.replace(/(^|[\s-])\S/g, function (match) {
								return match.toUpperCase();
							});
					})
				);
				setFishTotal(numFish);
				const numBugs = countTotal(
					Object.keys(data[1]).map((critter) => {
						return data[1][critter]['name']['name-USen']
							.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
							.replace(/(^|[\s-])\S/g, function (match) {
								return match.toUpperCase();
							});
					})
				);
				setBugTotal(numBugs);
				const numSea = countTotal(Object.keys(data[2]));
				setSeaTotal(numSea);
				const numFossils = countTotal(
					Object.keys(data[3]).map((fish) => {
						return data[3][fish]['name']['name-USen']
							.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
							.replace(/(^|[\s-])\S/g, function (match) {
								return match.toUpperCase();
							})
							.toLowerCase()
							.replace(
								/^./,
								data[3][fish]['name']['name-USen'][0].toUpperCase()
							);
					})
				);
				setFossilTotal(numFossils);
				const numSongs = countTotal(
					Object.keys(data[4]).map((fish) => {
						return data[4][fish]['name']['name-USen']
							.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
							.replace(/(^|[\s-])\S/g, function (match) {
								return match.toUpperCase();
							});
					})
				);
				setSongTotal(numSongs);
				const numArt = countTotal(
					Object.keys(data[5]).map((fish) => {
						return data[5][fish]['name']['name-USen']
							.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
							.replace(/(^|[\s-])\S/g, function (match) {
								return match.toUpperCase();
							});
					})
				);
				setArtTotal(numArt);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

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

			<DarkTooltip placement="top" arrow title={`${artTotal}/43`}>
				<CircularProgress
					variant="static"
					value={(artTotal / 43) * 100}
					// value={100}
					className="art-spinner spinner"
					style={{
						color: `${(artTotal / 43) * 100 >= 100 ? 'gold' : 'green'}`,
					}}
				/>
			</DarkTooltip>
			<div className="total">
				<span role="img">
					<img src={ArtIcon} alt="Art" className="icon" />
				</span>
			</div>
		</Card>
	);
};

export default TotalsMenu;
