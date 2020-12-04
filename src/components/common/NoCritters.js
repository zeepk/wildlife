import React from 'react';
import styled from 'styled-components';
import { noCrittersMessage } from '../../utils/constants';

const NoCritters = () => {
	return <NoneContainer>{noCrittersMessage}</NoneContainer>;
};

export default NoCritters;

const NoneContainer = styled.div`
	min-height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100vw;
	font-size: 2rem;
	color: var(--pink);
`;
