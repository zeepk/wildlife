import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import '../styles/MobileName.css';
import tiny from '../images/tiny.png';
import small from '../images/small.png';
import medium from '../images/medium.png';
import large from '../images/large.png';
import long from '../images/long.png';
import fin from '../images/fin.png';
import huge from '../images/huge.png';

function MobileName(props) {
	const size_display = () => {
		if (props.data.size === 'tiny') {
			return <img className="size-image" src={tiny} alt={props.data.size} />;
		} else if (props.data.size === 'small') {
			return <img className="size-image" src={small} alt={props.data.size} />;
		} else if (props.data.size === 'medium') {
			return <img className="size-image" src={medium} alt={props.data.size} />;
		} else if (props.data.size === 'large') {
			return <img className="size-image" src={large} alt={props.data.size} />;
		} else if (props.data.size === 'long') {
			return <img className="size-image" src={long} alt={props.data.size} />;
		} else if (props.data.size === 'fin') {
			return <img className="size-image" src={fin} alt={props.data.size} />;
		} else if (props.data.size === 'huge') {
			return <img className="size-image" src={huge} alt={props.data.size} />;
		} else {
			return <div>N/A</div>;
		}
	};

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
	const active_months = monthNames.filter(
		(month) => props.data[month.toLocaleLowerCase()] === '1'
	);
	const active_array = active_months.join(', ');
	return (
		<div>
			<div className="displayed-name" onClick={(e) => setVisible(true)}>
				{props.data.name}
			</div>
			<Dialog
				className="mobile-dialog-container"
				header={props.data.name}
				visible={visible}
				style={{ width: '50vw', zIndex: 1000 }}
				modal={true}
				onHide={() => setVisible(false)}
			>
				<div className="dialog-icon-container">
					<img
						className="dialog-critter-image"
						src={`http://acnhapi.com/icons/${
							props.data.size ? 'fish' : 'bugs'
						}/${props.data.id}`}
						alt="Icon"
					/>
				</div>
				<table className="mobile-dialog-table">
					<tbody>
						<tr>
							<td>Months</td>
							<td>{active_array}</td>
						</tr>
						<tr>
							<td>Time</td>
							<td>{props.data.time_string}</td>
						</tr>
						<tr>
							<td>Location</td>
							<td>{props.data.location}</td>
						</tr>
						<tr>
							<td>Rarity</td>
							<td>{props.data.rarity}</td>
						</tr>
						<tr>
							<td>Price</td>
							<td>{props.data.price}</td>
						</tr>
						{props.data.size ? (
							<tr>
								<td>Size</td>
								<td>{size_display()}</td>
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
