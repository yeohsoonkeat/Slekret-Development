import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './screens/Login'
import Register from './screens/Register'

export default function Auth() {
	return (
		<Layout>
			<Switch>
				<Route path="/auth/login" exact component={Login} />
				<Route path="/auth/register" exact component={Register} />
				<Redirect from="/auth*" to="/auth/login" />
			</Switch>
		</Layout>
	)
}
