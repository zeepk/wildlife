import React from 'react';
import styled from 'styled-components';
import IconDisplay from './IconDisplay';

const AvailableCarouselDisplay = (critter) => {
	return (
		<CritterCard>
			<IconDisplay iconUri={critter['icon_uri']} />
			<p>{critter['name']['name-USen']}</p>
			<p>{critter['availability']['location'] || 'Underwater'}</p>
		</CritterCard>
	);
};

export default AvailableCarouselDisplay;

const CritterCard = styled.div`
	padding: 10px;
	background-color: white;
	border-radius: 10px;
	max-width: 90%;
	margin: 0 auto;
	color: #333333;
	text-transform: capitalize;
`;
