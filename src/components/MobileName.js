import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import '../styles/MobileName.css';
import ShadowSize from './ShadowSize';

function MobileName(props) {
	const [visible, setVisible] = useState(false);
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const activeMonths = monthNames.filter(
		(month) => props.data[month.toLocaleLowerCase()] === '1'
	);
	let activeMonthsArray = activeMonths.join(', ');
	let type = '';
	if (props.data.size) {
		type = 'fish';
	} else if (props.data.availability) {
		type = 'sea';
		const months = props.data.availability['month-northern'].split('-');
		console.log(months);
		// console.log(props.data.availability['month-northern'])
		activeMonthsArray = props.data.availability.isAllYear
			? 'All Year!'
			: `${monthNames[parseInt(months[0])]} - ${
					monthNames[parseInt(months[1])]
			  }`;
	} else {
		type = 'bugs';
	}
	return (
		<div style={{ textTransform: 'capitalize' }}>
			<div className="displayed-name" onClick={(e) => setVisible(true)}>
				{props.data.name.split('_').join(' ')}
			</div>
			<Dialog
				className="mobile-dialog-container"
				header={props.data.name.split('_').join(' ')}
				visible={visible}
				style={{ width: '50vw', zIndex: 1000 }}
				modal={true}
				onHide={() => setVisible(false)}
			>
				<div className="dialog-icon-container">
					<img
						className="dialog-critter-image"
						src={`https://acnhapi.com/v1/icons/${type}/${props.data.id}`}
						alt="Icon"
					/>
				</div>
				<table className="mobile-dialog-table">
					<tbody>
						<tr>
							<td>Months</td>
							<td>{activeMonthsArray}</td>
						</tr>
						<tr>
							<td>Time</td>
							<td>
								{props.data.timeString || props.data.availability.timeString}
							</td>
						</tr>
						{props.data.availability ? (
							<React.Fragment>
								<tr>
									<td>Speed</td>
									<td>{props.data.speed}</td>
								</tr>
								<tr>
									<td>Size</td>
									<td>{props.data.shadow}</td>
								</tr>
							</React.Fragment>
						) : (
							<React.Fragment>
								<tr>
									<td>Location</td>
									<td>{props.data.location}</td>
								</tr>
								<tr>
									<td>Rarity</td>
									<td>{props.data.rarity}</td>
								</tr>
							</React.Fragment>
						)}
						<tr>
							<td>Price</td>
							<td>{props.data.price}</td>
						</tr>
						{props.data.size ? (
							<tr>
								<td>Size</td>
								<td>
									<ShadowSize size={props.data.size} />
								</td>
							</tr>
						) : (
							<tr></tr>
						)}
					</tbody>
				</table>
			</Dialog>
		</div>
	);
}

export default MobileName;
