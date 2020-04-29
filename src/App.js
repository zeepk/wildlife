import React from 'react';
import './App.css';
import Header from './components/Header.js';
import Dashboard from './components/Dashboard.js';
import DashboardPR from './components/DahboardPR.js';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
	return (
		<div className="App">
			<Header />
			<DashboardPR />
		</div>
	);
}

export default App;
