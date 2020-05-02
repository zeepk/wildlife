import React from 'react';
import './App.css';
import Header from './components/Header.js';
import Dashboard from './components/Dashboard.js';
import Footer from './components/Footer.js';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import ReactGA from 'react-ga';

function initializeReactGA() {
	ReactGA.initialize('UA-165301764-1');
	ReactGA.pageview('/homepage');
}
initializeReactGA();

function App() {
	return (
		<div className="App">
			<Header />
			<Dashboard />
			<Footer />
		</div>
	);
}

export default App;
