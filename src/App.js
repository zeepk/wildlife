import React, { useState } from 'react'
import './App.css'
import Header from './components/Header.js'
import LocalStorage from './components/LocalStorage.js'
import Footer from './components/Footer.js'
import Routing from './components/Routing.js'
import { BrowserRouter as Router } from 'react-router-dom'

import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import ReactGA from 'react-ga'

function initializeReactGA() {
	ReactGA.initialize('UA-165301764-1')
	ReactGA.pageview('/homepage')
}
initializeReactGA()

function App() {
	const [hideCaught, toggleCaught] = useState(false)

	return (
		<div className="App">
			<Router>
				<LocalStorage />
				<Header
					toggleCaught={() => {
						toggleCaught(!hideCaught)
					}}
				/>
				<Routing hideCaught={hideCaught} />
				<Footer />
			</Router>
		</div>
	)
}

export default App
