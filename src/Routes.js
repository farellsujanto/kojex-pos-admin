import React, { useContext } from 'react';

import { PathContext, AuthContext } from './store/Context';

import LoginPage from './pages/LoginPage';

import HomePage from './pages/HomePage';
import ServiceListPage from './pages/ServiceListPage';
import StaffListPage from './pages/StaffListPage';
import SalesListPage from './pages/SalesListPage';
import ComissionListPage from './pages/ComissionListPage';
import ItemListPage from './pages/ItemListPage';

import NotFoundPage from './pages/404Page';

import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';


function preparePage(children) {
	return (
		<>
			<AdminLayout>
				{children}
			</AdminLayout>
		</>

	);
}

function prepareAuthPage(children) {
	return (
		<AuthLayout>
			{children}
		</AuthLayout>
	);
}

function getLoggedInPath(path) {
	switch (path) {
		case '/':
			return <HomePage />;
		case '/service/list':
			return <ServiceListPage />;
		case '/staffs/list':
			return <StaffListPage />;
		case '/comission/list':
			return <ComissionListPage />;
		case '/sales/list':
			return <SalesListPage />;
		case '/items/list':
			return <ItemListPage />;
		default:
			return <NotFoundPage />;
	}
}

function getNotLoggedInPath(path) {
	switch (path) {
		case '/':
			return <LoginPage />
		default:
			return <LoginPage />;
	}
}

export default function Routes() {
	const [path] = useContext(PathContext);
	const [auth] = useContext(AuthContext);

	if (!auth) { return prepareAuthPage(getNotLoggedInPath(path)); }

	return preparePage(getLoggedInPath(path));
}