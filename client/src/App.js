import axios from 'axios'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Admin from './pages/admin'
import Auth from './pages/auth'
import ProtectedRoute from './routes/ProtectedRoutes'
import PublicRoutes from './routes/PublicRoutes'
import Profile from './pages/profile'

export default function App() {
	const [auth, setAuth] = useState(
		window.localStorage.getItem('auth') === 'true'
	)
	useEffect(() => {
		axios
			.get('http://localhost:8000/token', {
				withCredentials: true,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Credentials': true,
				},
			})
			.then((res) => {
				console.log(res)
				if (res.data.auth) {
					setAuth(true)
					window.localStorage.setItem('auth', 'true')
				} else {
					setAuth(false)
					window.localStorage.setItem('auth', 'false')
				}
			})
			.catch((er) => {
				console.log(er)
			})
	}, [])

	return (
		<BrowserRouter>
			<Switch>
				<ProtectedRoute auth={auth} path="/" exact component={Home} />
				<ProtectedRoute auth={auth} path="/admin" component={Admin} />
				<PublicRoutes auth={auth} component={Auth} path="/auth" />
				<Route path="/user/" component={Profile} />
			</Switch>
		</BrowserRouter>
	)
}

const Home = () => {
	const userLogout = async () => {
		await axios.post(
			'http://localhost:8000/auth/logout',
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
		<div>
			<h1 onClick={userLogout}>Logout</h1>
		</div>
	)
}
