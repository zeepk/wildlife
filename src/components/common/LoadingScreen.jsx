import React from 'react';
import styled from 'styled-components';
import { loadingMessage } from '../../utils/constants';
import IsabelleClapping from '../../animations/isabelleClapping.webp';

const LoadingScreen = () => {
	return (
		<LoadingContainer>
			<img src={IsabelleClapping} alt="Loading..." />
			<LoadingTitle>{loadingMessage}</LoadingTitle>
		</LoadingContainer>
	);
};

export default LoadingScreen;

const LoadingContainer = styled.div`
	min-height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100vw;
`;

const LoadingTitle = styled.h1`
	text-align: center;
	font-size: 4rem;
	color: var(--yellow);
	text-shadow: 2px 2px 9px black;
`;
