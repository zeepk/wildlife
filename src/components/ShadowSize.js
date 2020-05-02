import React from 'react';
import tiny from '../images/tiny.png';
import small from '../images/small.png';
import medium from '../images/medium.png';
import large from '../images/large.png';
import long from '../images/long.png';
import fin from '../images/fin.png';
import huge from '../images/huge.png';

export default function ShadowSize(props) {
	if (props.size === 'tiny') {
		return <img className="size-image" src={tiny} alt={props.size} />;
	} else if (props.size === 'small') {
		return <img className="size-image" src={small} alt={props.size} />;
	} else if (props.size === 'medium') {
		return <img className="size-image" src={medium} alt={props.size} />;
	} else if (props.size === 'large') {
		return <img className="size-image" src={large} alt={props.size} />;
	} else if (props.size === 'long') {
		return <img className="size-image" src={long} alt={props.size} />;
	} else if (props.size === 'fin') {
		return <img className="size-image" src={fin} alt={props.size} />;
	} else if (props.size === 'huge') {
		return <img className="size-image" src={huge} alt={props.size} />;
	} else {
		return <div>N/A</div>;
	}
}
