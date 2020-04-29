import React from 'react';
import './App.css';
import Header from './components/Header.js';
import Dashboard from './components/Dashboard.js';
import StickyHeadTable from './components/Dashboard-2.js';

function App() {
	return (
		<div className="App">
			<Header />
			<Dashboard />
		</div>
	);
}

export default App;
