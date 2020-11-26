import React from 'react';

export default function TimeDisplay(props) {
	let today = new Date();
	let hour = today.getHours();
	if (!props.critter.startTime || props.critter.startTime === 'Any time') {
		return (
			<div
				style={{
					backgroundColor: '#a1d6a1',
					height: '100%',
				}}
			>
				Any Time
			</div>
		);
	} else if (props.critter.startTime2 && props.critter.id === 40) {
		// hardcoding for Pirahna
		if (
			(hour >= props.critter.startTime && hour < props.critter.endTime) ||
			hour >= props.critter.startTime2 ||
			hour < props.critter.endTime2
		) {
			return (
				<div style={{ backgroundColor: '#a1d6a1' }}>
					{props.critter.timeString}
				</div>
			);
		} else {
			return <div>{props.critter.timeString}</div>;
		}
	} else if (props.critter.startTime2) {
		if (
			(hour >= props.critter.startTime && hour < props.critter.endTime) ||
			(hour >= props.critter.startTime2 && hour < props.critter.endTime2)
		) {
			return (
				<div style={{ backgroundColor: '#a1d6a1' }}>
					{props.critter.timeString}
				</div>
			);
		} else {
			return <div>{props.critter.timeString}</div>;
		}
	} else if (props.critter.startTime < props.critter.endTime) {
		if (hour >= props.critter.startTime && hour < props.critter.endTime) {
			return (
				<div style={{ backgroundColor: '#a1d6a1' }}>
					{props.critter.timeString}
				</div>
			);
		} else {
			return <div>{props.critter.timeString}</div>;
		}
	} else {
		if (hour >= props.critter.startTime || hour < props.critter.endTime) {
			return (
				<div style={{ backgroundColor: '#a1d6a1' }}>
					{props.critter.timeString}
				</div>
			);
		} else {
			return <div>{props.critter.timeString}</div>;
		}
	}
}
