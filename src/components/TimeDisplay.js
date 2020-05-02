import React from 'react';

export default function TimeDisplay(props) {
	let today = new Date();
	let hour = today.getHours();
	if (!props.critter.start_time || props.critter.start_time === 'Any time') {
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
	} else if (props.critter.start_time_2 && props.critter.id === 40) {
		// hardcoding for Pirahna
		if (
			(hour >= props.critter.start_time && hour < props.critter.end_time) ||
			hour >= props.critter.start_time_2 ||
			hour < props.critter.end_time_2
		) {
			return (
				<div style={{ backgroundColor: '#a1d6a1' }}>
					{props.critter.time_string}
				</div>
			);
		} else {
			return <div>{props.critter.time_string}</div>;
		}
	} else if (props.critter.start_time_2) {
		if (
			(hour >= props.critter.start_time && hour < props.critter.end_time) ||
			(hour >= props.critter.start_time_2 && hour < props.critter.end_time_2)
		) {
			return (
				<div style={{ backgroundColor: '#a1d6a1' }}>
					{props.critter.time_string}
				</div>
			);
		} else {
			return <div>{props.critter.time_string}</div>;
		}
	} else if (props.critter.start_time < props.critter.end_time) {
		if (hour >= props.critter.start_time && hour < props.critter.end_time) {
			return (
				<div style={{ backgroundColor: '#a1d6a1' }}>
					{props.critter.time_string}
				</div>
			);
		} else {
			return <div>{props.critter.time_string}</div>;
		}
	} else {
		if (hour >= props.critter.start_time || hour < props.critter.end_time) {
			return (
				<div style={{ backgroundColor: '#a1d6a1' }}>
					{props.critter.time_string}
				</div>
			);
		} else {
			return <div>{props.critter.time_string}</div>;
		}
	}
}
