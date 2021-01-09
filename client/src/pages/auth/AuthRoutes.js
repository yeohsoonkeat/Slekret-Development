import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Layout from './Layout'
import Expired from './views/Expired'
import Login from './views/Login'
import Register from './views/Register'
import Verify from './views/Verify'

export default function Auth() {
	return (
		<Layout>
			<Switch>
				<Route path="/auth/login" exact component={Login} />
				<Route path="/auth/register" exact component={Register} />
				<Route path="/auth/verify" exact component={Verify} />
				<Route path="/auth/expired" exact component={Expired} />

				<Redirect from="/auth*" to="/auth/login" />
			</Switch>
		</Layout>
	)
}
