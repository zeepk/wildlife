import { bugs } from '../../data_files/bugs.json';
import { fish } from '../../data_files/fish.json';
import { sea } from '../../data_files/sea.json';
import { fossils } from '../../data_files/fossils.json';
import { songs } from '../../data_files/songs.json';
import { misspelled, apiUrl } from '../../utils/constants';

export default function LocalStorage() {
	if (
		typeof Storage !== 'undefined' &&
		localStorage.getItem('Spider') === null
	) {
		console.log('Could not find local storage for Bugs. Creating...');
		bugs.map((bug) => {
			window.localStorage.setItem(bug.name, false);
			return bug;
		});

		window.localStorage.setItem('chart', '0');
	}
	if (
		typeof Storage !== 'undefined' &&
		localStorage.getItem('Bitterling') === null
	) {
		console.log('Could not find local storage for Fish. Creating...');

		fish.map((fish) => {
			window.localStorage.setItem(fish.name, false);
			return fish;
		});
	}
	if (
		typeof Storage !== 'undefined' &&
		localStorage.getItem('Acanthostega') === null
	) {
		console.log('Could not find local storage for Fossils. Creating...');

		fossils.map((fossil) => {
			window.localStorage.setItem(fossil.name.name, false);
			return fossil;
		});
	}
	if (
		typeof Storage !== 'undefined' &&
		localStorage.getItem('Agent K.K.') === null
	) {
		console.log('Could not find local storage for KK Songs. Creating...');

		songs.map((song) => {
			window.localStorage.setItem(song.name.name, false);
			return song;
		});
	}
	if (
		typeof Storage !== 'undefined' &&
		localStorage.getItem('sea_grapes') === null
	) {
		console.log('Could not find local storage for Sea Creatures. Creating...');
		sea.map((sea) => {
			window.localStorage.setItem(sea.name, false);
			return sea;
		});
	}
	if (
		typeof Storage !== 'undefined' &&
		localStorage.getItem('Academic Painting') === null
	) {
		console.log('Could not find local storage for Art. Creating...');
		fetch(`${apiUrl}/art`)
			.then((response) => response.json())
			.then((jsonData) => {
				for (const critter in jsonData) {
					const name = jsonData[critter]['name']['name-USen']
						.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
						.replace(/(^|[\s-])\S/g, function (match) {
							return match.toUpperCase();
						});
					window.localStorage.setItem(name, false);
				}
			});
	}

	for (const critter in misspelled) {
		if (localStorage.getItem(misspelled[critter].correct) === null) {
			window.localStorage.setItem(
				misspelled[critter].correct,
				localStorage.getItem(misspelled[critter].incorrect)
			);
		}
	}

	return null;
}
