import React, { useContext } from 'react';

import { PathContext } from './store/Context';

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/404Page'

export default function Routes() {
	const [path] = useContext(PathContext)
	switch (path) {
		case '/':
			return <HomePage />
		case '/about':
			return <AboutPage />
		default:
			return <NotFoundPage />
	}

}