import axios from 'axios'
import { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Admin from './pages/admin'
import Auth from './pages/auth'
import ProtectedRoute from './routes/ProtectedRoutes'
import PublicRoutes from './routes/PublicRoutes'
import Profile from './pages/profile'
import Home from './pages/home'
import Forum from './pages/forum'
import useAuthProvider from './hook/useAuthProvider'
import routes from './constant/routes'
import config from './config'
export default function App() {
	const [authState, authDispatch] = useAuthProvider()
	const { auth } = authState
	useEffect(() => {
		console.log(config.backendUrl)
		axios
			.get(config.backendUrl + '/token', {
				withCredentials: true,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Credentials': true,
				},
			})
			.then((res) => {
				const { auth, token, user } = res?.data
				window.localStorage.setItem('auth', auth)
				authDispatch({
					type: 'UPDATE_AUTH',
					payload: { auth, token, user },
				})
			})
			.catch((err) => {
				console.log(err)
				window.localStorage.setItem('auth', 'false')
			})
	}, [authDispatch])

	return (
		<BrowserRouter>
			<Switch>
				<ProtectedRoute auth={auth} path="/logout" exact component={Logout} />
				<Route path={routes.home} exact component={Home} />
				<ProtectedRoute path={routes.admin} auth={auth} component={Admin} />
				<PublicRoutes path={routes.auth} auth={auth} component={Auth} />
				<Route path={routes.profile} component={Profile} />
				<Route path={routes.forum} component={Forum} />
			</Switch>
		</BrowserRouter>
	)
}

const Logout = () => {
	const authDispatch = useAuthProvider()[1]

	const logout = () => {
		authDispatch({
			type: 'USER_LOGOUT',
		})
		window.localStorage.setItem('auth', 'false')
		axios.post(
			config + '/auth/logout',
			{},
			{
				withCredentials: true,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Credentials': true,
				},
			}
		)
	}

	return (
		<button className="bg-black text-white" onClick={logout}>
			Logout
		</button>
	)
}
