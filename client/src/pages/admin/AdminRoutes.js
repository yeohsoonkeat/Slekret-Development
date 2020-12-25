import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './screens/Dashboard'

export default function Admin() {
	return (
		<Layout>
			<Switch>
				<Route path="/admin/dashboard" exact component={Dashboard} />
				<Route path="/admin/setting" exact component={Dashboard} />
				<Redirect from="/admin*" to="/admin/dashboard" />
			</Switch>
		</Layout>
	)
}
