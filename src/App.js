import React from 'react';
import './App.css';
import Header from './components/Header.js';
import DashboardPRBug from './components/DashboardPRBug.js';
import Footer from './components/Footer.js';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
	return (
		<div className="App">
			<Header />
			<DashboardPRBug />
			<Footer />
		</div>
	);
}

export default App;
