import React from 'react';
import { alwaysRealArtText } from '../../utils/constants';

const FakeArt = (props) => {
	if (!props.hasFake) {
		return <p>{alwaysRealArtText}</p>;
	}
	const fileName = props.name.toLowerCase().split(' ').join('-');
	let uri = `https://animalcrossingworld.com/wp-content/uploads/2020/04/animal-crossing-new-horizons-guide-redd-${fileName}-model-fake-crop-differences.png`;
	if (fileName.includes('warrior')) {
		uri = `https://animalcrossingworld.com/wp-content/uploads/2020/04/animal-crossing-new-horizons-guide-redd-${fileName}-icon-fake-crop-differences.png`;
	}
	if (fileName.includes('informative')) {
		uri = `https://animalcrossingworld.com/wp-content/uploads/2020/04/animal-crossing-new-horizons-guide-redd-${fileName}-model-fake-crop.png`;
	}
	if (fileName.includes('painting') || fileName.includes('ancient')) {
		uri = `https://animalcrossingworld.com/wp-content/uploads/2020/04/animal-crossing-new-horizons-guide-redd-${fileName}-real-vs-fake.jpg`;
	}
	return (
		<img
			className={`fake-art-image ${props.modal ? 'modal-image' : ''}`}
			src={uri}
			alt="Fake art"
		/>
	);
};

export default FakeArt;
