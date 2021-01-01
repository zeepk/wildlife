const { DateTime } = require('luxon');
var now = DateTime.local();

// urls

export const apiUrl = 'https://acnhapi.com/v1';

// verbiage

export const version = '2.6.3';
export const totalsTitleText = 'Your Progress';
export const availableNowText = `Available Now as of  ${now.toLocaleString(
	DateTime.TIME_SIMPLE
)}`;
export const messageOfTheDay = '⛄ Happy Winter! ⛄';
export const loadingMessage = 'Loading . . .';
export const isOrderableText = 'Catalog';
export const noCrittersMessage = "Congrats! You've got em all!";
export const alwaysRealArtText = 'Always Real';
export const landingPageImportExportLabelText =
	'Transfer your data between devices:';

// functions

// data

export const totalFish = 80;
export const totalBugs = 80;
export const totalSeaCreatures = 40;
export const totalFossils = 73;
export const totalSongs = 95;
export const totalArt = 43;

export const carouselAutoplayInterval = 4000;
export const carouselNumShow = 5;
export const carouselNumScroll = 5;

export const progressBarColor = 'rgba(255, 164, 180, 0.733)';
export const progressBarFullColor = 'rgb(254, 227, 124, 0.75)';

export const months = [
	{
		id: 0,
		order: 1,
		abbreviation: 'Jan',
		name: 'January',
	},
	{
		id: 1,
		order: 2,
		abbreviation: 'Feb',
		name: 'February',
	},
	{
		id: 2,
		order: 3,
		abbreviation: 'Mar',
		name: 'March',
	},
	{
		id: 3,
		order: 4,
		abbreviation: 'Apr',
		name: 'April',
	},
	{
		id: 4,
		order: 5,
		abbreviation: 'May',
		name: 'May',
	},
	{
		id: 5,
		order: 6,
		abbreviation: 'Jun',
		name: 'June',
	},
	{
		id: 6,
		order: 7,
		abbreviation: 'Jul',
		name: 'July',
	},
	{
		id: 7,
		order: 8,
		abbreviation: 'Aug',
		name: 'August',
	},
	{
		id: 8,
		order: 9,
		abbreviation: 'Sep',
		name: 'September',
	},
	{
		id: 9,
		order: 10,
		abbreviation: 'Oct',
		name: 'October',
	},
	{
		id: 10,
		order: 11,
		abbreviation: 'Nov',
		name: 'November',
	},
	{
		id: 11,
		order: 12,
		abbreviation: 'Dec',
		name: 'December',
	},
];

export const misspelled = [
	{
		incorrect: 'Gian Trevally',
		correct: 'Giant Trevally',
	},
	{
		incorrect: 'Paper Kit Butterfly',
		correct: 'Paper Kite Butterfly',
	},
	{
		incorrect: 'Plesio body',
		correct: 'Plesio torso',
	},
	{
		incorrect: 'Pachysaurus skull',
		correct: 'Pachy skull',
	},
	{
		incorrect: 'Pachysaurus tail',
		correct: 'Pachy tail',
	},
	{
		incorrect: 'To the Edge',
		correct: 'To The Edge',
	},
	{
		incorrect: 'Honey Bee',
		correct: 'Honeybee',
	},
	{
		incorrect: 'Saddled Birchir',
		correct: 'Saddled Bichir',
	},
	{
		incorrect: 'Seahorse',
		correct: 'Sea Horse',
	},
	{
		incorrect: 'Sea bass',
		correct: 'Sea Bass',
	},
	{
		incorrect: 'Clownfish',
		correct: 'Clown Fish',
	},
	{
		incorrect: 'Great White SHark',
		correct: 'Great White Shark',
	},
];

export const specialRequestIds = [3, 8, 9];
