import { bugs } from '../data_files/bugs.json';
import { fish } from '../data_files/fish.json';
import { fossils } from '../data_files/fossils.json';
import { songs } from '../data_files/songs.json';

export default function LocalStorage() {
	if (
		typeof Storage !== 'undefined' &&
		(localStorage.getItem('Spider') === null ||
			localStorage.getItem('Bitterling') === null ||
			localStorage.getItem('Acanthostega') === null ||
			localStorage.getItem('Agent K.K.') === null)
	) {
		console.log('Could not find local storage. Creating...');
		bugs.map((bug) => {
			window.localStorage.setItem(bug.name, false);
			return bug;
		});
		fish.map((fish) => {
			window.localStorage.setItem(fish.name, false);
			return fish;
		});
		fossils.map((fossil) => {
			window.localStorage.setItem(fossil.name.name, false);
			return fossil;
		});
		songs.map((song) => {
			window.localStorage.setItem(song.name.name, false);
			return song;
		});
		window.localStorage.setItem('chart', '0');
	} else {
		if (localStorage.getItem('Giant Trevally') === null) {
			window.localStorage.setItem(
				'Giant Trevally',
				localStorage.getItem('Gian Trevally')
			);
		}
	}
	return null;
}
