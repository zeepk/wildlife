import React, { useState, useEffect } from 'react';
import Totals from '../common/Totals.jsx';
import Available from '../common/Available.jsx';
import styled from 'styled-components';
import { apiUrl, messageOfTheDay } from '../../../src/utils/constants';

const isAvailableNow = (name, data) => {
	const month = new Date().getMonth() + 1;
	const hour = new Date().getHours();
	const isAvailable =
		window.localStorage.getItem(name) !== 'true' &&
		data['availability']['month-array-northern'].includes(month) &&
		data['availability']['time-array'].includes(hour);
	return isAvailable;
};

const countTotal = (nameArray) => {
	let count = 0;
	nameArray.forEach((critterName) => {
		window.localStorage.getItem(critterName) === 'true' && (count += 1);
	});
	return count;
};

const LandingPage = () => {
	const [totals, setTotals] = useState({});
	const [available, setAvailable] = useState([]);

	useEffect(() => {
		Promise.all([
			fetch(`${apiUrl}/fish`),
			fetch(`${apiUrl}/bugs`),
			fetch(`${apiUrl}/sea`),
			fetch(`${apiUrl}/fossils`),
			fetch(`${apiUrl}/songs`),
			fetch(`${apiUrl}/art`),
		])
			.then((responses) =>
				Promise.all(responses.map((response) => response.json()))
			)
			.then((data) => {
				const availableNow = [];
				const fish = countTotal(
					Object.keys(data[0]).map((critter) => {
						const name = data[0][critter]['name']['name-USen']
							.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
							.replace(/(^|[\s-])\S/g, function (match) {
								return match.toUpperCase();
							});
						isAvailableNow(name, data[0][critter]) &&
							availableNow.push(data[0][critter]);
						return name;
					})
				);
				const bugs = countTotal(
					Object.keys(data[1]).map((critter) => {
						const name = data[1][critter]['name']['name-USen']
							.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
							.replace(/(^|[\s-])\S/g, function (match) {
								return match.toUpperCase();
							});
						isAvailableNow(name, data[1][critter]) &&
							availableNow.push(data[1][critter]);
						return name;
					})
				);
				const sea = countTotal(Object.keys(data[2]));
				Object.keys(data[2]).forEach((critter) => {
					isAvailableNow(critter, data[2][critter]) &&
						availableNow.push(data[2][critter]);
				});
				const fossils = countTotal(
					Object.keys(data[3]).map((critter) => {
						return data[3][critter]['name']['name-USen']
							.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
							.replace(/(^|[\s-])\S/g, function (match) {
								return match.toUpperCase();
							})
							.toLowerCase()
							.replace(
								/^./,
								data[3][critter]['name']['name-USen'][0].toUpperCase()
							);
					})
				);
				const songs = countTotal(
					Object.keys(data[4]).map((fish) => {
						return data[4][fish]['name']['name-USen']
							.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
							.replace(/(^|[\s-])\S/g, function (match) {
								return match.toUpperCase();
							});
					})
				);
				const art = countTotal(
					Object.keys(data[5]).map((fish) => {
						return data[5][fish]['name']['name-USen']
							.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
							.replace(/(^|[\s-])\S/g, function (match) {
								return match.toUpperCase();
							});
					})
				);
				setTotals({
					fish,
					bugs,
					sea,
					fossils,
					songs,
					art,
				});
				setAvailable(availableNow);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div>
			<Title>{messageOfTheDay}</Title>
			<TotalsContainer>
				<Totals totals={totals} />
			</TotalsContainer>
			<AvailableContainer>
				<Available available={available} />
			</AvailableContainer>
		</div>
	);
};

export default LandingPage;

const Title = styled.p`
	font-size: clamp(2rem, 3vw, 5rem);
	margin: 10px 0 0 0;
	color: #333333;
`;

const TotalsContainer = styled.div`
	width: 90vw;
	margin: 0 auto 5vh auto;
`;

const AvailableContainer = styled.div`
	width: 90vw;
	height: 500px;
	margin: 0 auto 5vh auto;
`;
