import React, { useContext } from 'react';

import { PathContext, AuthContext } from './store/Context';

import Drawer from './components/Drawer';
import NavbarComponent from './components/NavbarComponent';

import { Container, Row, Col, Jumbotron } from 'react-bootstrap';

import LoginPage from './pages/LoginPage';

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/404Page';

import OrderListPage from './pages/OrderListPage';
import OrderAddPage from './pages/OrderAddPage';

import ShoppingListPage from './pages/ShoppingListPage';
import ShoppingAddPage from './pages/ShoppingAddPage';

import ProductListPage from './pages/ProductListPage';
import UserListPage from './pages/UserListPage';

import RestaurantListPage from './pages/RestaurantListPage';

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
		case '/order/list':
			return <OrderListPage />;
		case '/order/add':
			return <OrderAddPage />;
		case '/shopping/list':
			return <ShoppingListPage />;
		case '/shopping/add':
			return <ShoppingAddPage />;
		case '/product/list':
			return <ProductListPage />;
		case '/user/list':
			return <UserListPage />;
		case '/restaurant/list':
			return <RestaurantListPage />;
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