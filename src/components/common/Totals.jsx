import React from 'react';
import FossilIcon from '../../images/fossilIcon.png';
import FishIcon from '../../images/fishIcon.png';
import BugIcon from '../../images/bugIcon.png';
import SongIcon from '../../images/kkslider.png';
import SeaIcon from '../../images/sea.png';
import ArtIcon from '../../images/reddIcon.png';
import { ProgressBar } from 'primereact/progressbar';
import {
	progressBarColor,
	progressBarFullColor,
	totalFish,
	totalBugs,
	totalSeaCreatures,
	totalFossils,
	totalSongs,
	totalArt,
	totalsTitleText,
} from '../../../src/utils/constants';
import styled from 'styled-components';

const Totals = (props) => {
	let fish, bugs, sea, fossils, songs, art;
	({ fish, bugs, sea, fossils, songs, art } = props.totals);

	return (
		<TotalsCard>
			<Title>{totalsTitleText}</Title>
			<div className="p-grid">
				<div className="p-col-6 p-md-4 p-lg-2">
					<TotalContainer href="/fish">
						<Icon src={FishIcon} alt="Fish" />
						<ProgressBar
							color={
								fish === totalFish ? progressBarFullColor : progressBarColor
							}
							className="progress"
							value={(fish / totalFish) * 100}
							displayValueTemplate={() => (
								<div>
									{fish}/{totalFish}
								</div>
							)}
						/>
					</TotalContainer>
				</div>
				<div className="p-col-6 p-md-4 p-lg-2">
					<TotalContainer href="/bugs">
						<Icon src={BugIcon} alt="Bugs" />
						<ProgressBar
							color={
								bugs === totalBugs ? progressBarFullColor : progressBarColor
							}
							className="progress"
							value={(bugs / totalBugs) * 100}
							displayValueTemplate={() => (
								<div>
									{bugs}/{totalBugs}
								</div>
							)}
						/>
					</TotalContainer>
				</div>
				<div className="p-col-6 p-md-4 p-lg-2">
					<TotalContainer href="/sea">
						<Icon src={SeaIcon} alt="Sea Creatures" />
						<ProgressBar
							color={
								sea === totalSeaCreatures
									? progressBarFullColor
									: progressBarColor
							}
							className="progress"
							value={(sea / totalSeaCreatures) * 100}
							displayValueTemplate={() => (
								<div>
									{sea}/{totalSeaCreatures}
								</div>
							)}
						/>
					</TotalContainer>
				</div>
				<div className="p-col-6 p-md-4 p-lg-2">
					<TotalContainer href="/fossils">
						<Icon src={FossilIcon} alt="Fossils" />
						<ProgressBar
							color={
								fossils === totalFossils
									? progressBarFullColor
									: progressBarColor
							}
							className="progress"
							value={(fossils / totalFossils) * 100}
							displayValueTemplate={() => (
								<div>
									{fossils}/{totalFossils}
								</div>
							)}
						/>
					</TotalContainer>
				</div>
				<div className="p-col-6 p-md-4 p-lg-2">
					<TotalContainer href="/songs">
						<Icon src={SongIcon} alt="Songs" />
						<ProgressBar
							color={
								songs === totalSongs ? progressBarFullColor : progressBarColor
							}
							className="progress"
							value={(songs / totalSongs) * 100}
							displayValueTemplate={() => (
								<div>
									{songs}/{totalSongs}
								</div>
							)}
						/>
					</TotalContainer>
				</div>
				<div className="p-col-6 p-md-4 p-lg-2">
					<TotalContainer href="/art">
						<Icon src={ArtIcon} alt="Art" />
						<ProgressBar
							color={art === totalArt ? progressBarFullColor : progressBarColor}
							className="progress"
							value={(art / totalArt) * 100}
							displayValueTemplate={() => (
								<div>
									{art}/{totalArt}
								</div>
							)}
						/>
					</TotalContainer>
				</div>
			</div>
		</TotalsCard>
	);
};

export default Totals;

const Title = styled.p`
	font-size: clamp(2rem, 3vw, 2rem);
	margin: 10px 0;
	color: #333333;
`;

const TotalsCard = styled.div`
	padding: 10px;
	background-color: var(--blue);
	border-radius: 10px;
`;

const TotalContainer = styled.a`
	width: 100%;
	position: relative;
	display: flex;
	flex-wrap: wrap;
	height: 100%;
	align-content: space-between;

	.progress {
		height: 25px;
		width: 100%;
	}

	.p-progressbar-value {
		background-color: var(--green);
	}
`;

const Icon = styled.img`
	display: block;
	max-width: 50%;
	max-height: 10vh;
	width: auto;
	height: auto;
	margin: 0 auto 10px auto;
`;
