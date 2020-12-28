import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '../views/Dashboard';

export default function AdminRoutes() {
	return (
		<Switch>
			<Route path="/admin/dashboard" exact component={Dashboard} />
			<Route path="/admin/setting" exact component={Dashboard} />
			<Redirect from="/admin*" to="/admin/dashboard" />
		</Switch>
	);
}
