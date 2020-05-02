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
