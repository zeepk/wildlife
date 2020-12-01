import React from 'react';

const IconDisplay = (props) => {
	return (
		<div className="critter-image-container">
			<img
				className={`${props.mobile ? 'mobile-' : ''}critter-image`}
				src={props.iconUri}
				alt="Icon"
			/>
		</div>
	);
};

export default IconDisplay;
