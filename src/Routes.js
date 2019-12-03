import React, { useContext } from 'react';

import { PathContext, AuthContext } from './store/Context';

import Drawer from './components/Drawer';
import NavbarComponent from './components/NavbarComponent';

import { Container, Row, Col, Jumbotron } from 'react-bootstrap';

import LoginPage from './pages/LoginPage';

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/404Page';


function preparePage(children) {
	return (
		<Container>
			<Row>
				<Col sm={3}>
					<Drawer />
				</Col>
				<Col sm={9}>
					<Col sm={12}>
						<NavbarComponent />
						<br />
					</Col>
					<Col sm={12}>
						<Jumbotron>
							{children}
						</Jumbotron>
					</Col>
				</Col>
			</Row>
		</Container>
	);
}

function getPath(path) {
	switch (path) {
		case '/':
			return <HomePage />
		default:
			return <NotFoundPage />;
	}
}

export default function Routes() {
	const [path] = useContext(PathContext);
	const [auth] = useContext(AuthContext);

	if (!auth) {
		return <LoginPage />;
	}

	return preparePage(getPath(path));

}