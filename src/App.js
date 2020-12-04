import React, { useState } from 'react';
import './App.css';
import Header from './components/common/Header.js';
import LocalStorage from './components/functions/LocalStorage.js';
import Footer from './components/common/Footer.js';
import Routing from './components/functions/Routing.js';
import { BrowserRouter } from 'react-router-dom';
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ReactGA from 'react-ga';

function initializeReactGA() {
	ReactGA.initialize('UA-165301764-1');
	ReactGA.pageview('/homepage');
}
initializeReactGA();

function App() {
	const [hideCaught, toggleCaught] = useState(false);

	return (
		<div className="App">
			<BrowserRouter>
				<LocalStorage />
				<Header
					toggleCaught={() => {
						toggleCaught(!hideCaught);
					}}
				/>
				<Routing hideCaught={hideCaught} />
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
