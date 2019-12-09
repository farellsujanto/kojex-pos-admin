import React, { useContext } from 'react';

import { PathContext, AuthContext } from './store/Context';

import LoginPage from './pages/LoginPage';

import HomePage from './pages/HomePage';
import ServiceList from './pages/ServiceList';
import StaffList from './pages/StaffList';
import SalesListPage from './pages/SalesListPage';
import ComissionListPage from './pages/ComissionListPage';

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
			return <ServiceList />;
		case '/staffs/list':
			return <StaffList />;
		case '/comission/list':
			return <ComissionListPage />;
		case '/sales/list':
			return <SalesListPage />;
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