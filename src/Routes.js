import React, { useContext } from 'react';

import { PathContext } from './store/Context';

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/404Page';

import OrderListPage from './pages/OrderListPage';
import OrderAddPage from './pages/OrderAddPage';

import ShoppingListPage from './pages/ShoppingListPage';
import ShoppingAddPage from './pages/ShoppingAddPage';

import ProductListPage from './pages/ProductListPage';
import UserListPage from './pages/UserListPage';

export default function Routes() {
	const [path] = useContext(PathContext)
	switch (path) {
		case '/':
			return <HomePage />
		case '/order/list':
			return <OrderListPage />
		case '/order/add':
			return <OrderAddPage />
		case '/shopping/list':
			return <ShoppingListPage />
		case '/shopping/add':
			return <ShoppingAddPage />
		case '/product/list':
			return <ProductListPage />
		case '/user/list':
			return <UserListPage />
		default:
			return <NotFoundPage />
	}

}