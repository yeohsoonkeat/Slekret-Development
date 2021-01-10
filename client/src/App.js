import axios from 'axios'
import { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Admin from './pages/admin'
import Auth from './pages/auth'
import ProtectedRoute from './routes/ProtectedRoutes'
import PublicRoutes from './routes/PublicRoutes'
import Profile from './pages/profile'
import useAuthProvider from './hook/useAuthProvider'

export default function App() {
	const [authState, authDispatch] = useAuthProvider()
	const { auth } = authState
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
				window.localStorage.setItem('auth', res.data?.auth)
				authDispatch({
					type: 'UPDATE_AUTH',
					payload: { auth: res.data?.auth, token: res.data?.token },
				})
			})
			.catch((er) => {
				window.localStorage.setItem('auth', 'false')
			})
	}, [authDispatch])

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
	const authDispatch = useAuthProvider()[1]
	const userLogout = async () => {
		authDispatch({
			type: 'UPDATE_AUTH',
			payload: { auth: false },
		})
		window.localStorage.setItem('auth', 'false')
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
