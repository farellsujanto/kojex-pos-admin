import React from 'react';

import Routes from './Routes';
import Drawer from './components/Drawer';
import NavbarComponent from './components/NavbarComponent';

import { Container, Row, Col, Jumbotron } from 'react-bootstrap';

export default () => {

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
							<Routes />
						</Jumbotron>
					</Col>
				</Col>
			</Row>
		</Container>
	);
}