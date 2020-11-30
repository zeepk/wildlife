import React from 'react';
import styled from 'styled-components';

const TimeStringDisplay = (props) => {
	const isAvailableNow =
		props.isAllDay || props.timeArray.includes(new Date().getHours());
	return (
		<TimeCell isAvailableNow={isAvailableNow}>
			{props.timeString || 'All Day'}
		</TimeCell>
	);
};

export default TimeStringDisplay;

const TimeCell = styled.div`
	background-color: ${(props) => (props.isAvailableNow ? '#a1d6a1' : '')};
	height: 100%;
`;
