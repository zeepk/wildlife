import React from 'react';
import { Carousel } from 'primereact/carousel';
import styled from 'styled-components';
import AvailableCarouselDisplay from '../displays/AvailableCarouselDisplay.jsx';
import {
	availableNowText,
	carouselAutoplayInterval,
	carouselNumScroll,
	carouselNumShow,
} from '../../../src/utils/constants';
const Available = (props) => {
	const available = props.available.sort(() => Math.random() - 0.5);
	const responsiveOptions = [
		{
			breakpoint: '1024px',
			numVisible: 3,
			numScroll: 3,
		},
		{
			breakpoint: '600px',
			numVisible: 2,
			numScroll: 2,
		},
		{
			breakpoint: '480px',
			numVisible: 1,
			numScroll: 1,
		},
	];

	return (
		<AvailableCard>
			<Title>{availableNowText}</Title>
			<Carousel
				value={available}
				itemTemplate={AvailableCarouselDisplay}
				responsiveOptions={responsiveOptions}
				circular
				numVisible={carouselNumShow}
				numScroll={carouselNumScroll}
				autoplayInterval={carouselAutoplayInterval}
			></Carousel>
		</AvailableCard>
	);
};

export default Available;

const AvailableCard = styled.div`
	padding: 10px;
	background-color: var(--blue);
	border-radius: 10px;

	@media (max-width: 768px) {
		.p-carousel-indicators {
			display: none;
		}
	}
`;

const Title = styled.p`
	font-size: clamp(1.5rem, 3vw, 2rem);
	margin: 10px 0;
	color: #333333;
`;
