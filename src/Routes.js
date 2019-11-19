import React, { useContext } from 'react';

import { PathContext } from './store/Context';

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/404Page';
import RecapListPage from './pages/RecapListPage';
import RecapAddPage from './pages/RecapAddPage';
import ProductListPage from './pages/ProductListPage';

export default function Routes() {
	const [path] = useContext(PathContext)
	switch (path) {
		case '/':
			return <HomePage />
		case '/order/list':
			return <RecapListPage />
		case '/order/add':
			return <RecapAddPage />
		case '/shopping/list':
			return <RecapListPage />
		case '/shopping/add':
			return <RecapAddPage />
		case '/product/list':
			return <ProductListPage />
		case '/user/list':
			return <RecapListPage />
		default:
			return <NotFoundPage />
	}

}