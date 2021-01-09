// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { BrowserRouter, Switch } from 'react-router-dom'
// import Admin from './pages/admin'
// import Auth from './pages/auth'
// import ProtectedRoute from './routes/ProtectedRoutes'
// import PublicRoutes from './routes/PublicRoutes'

// export default function App() {
// 	const [auth, setAuth] = useState(
// 		window.localStorage.getItem('auth') === 'true'
// 	)
// 	useEffect(() => {
// 		axios
// 			.get('http://localhost:8000/token', {
// 				withCredentials: true,
// 				headers: {
// 					Accept: 'application/json',
// 					'Content-Type': 'application/json',
// 					'Access-Control-Allow-Credentials': true,
// 				},
// 			})
// 			.then((res) => {
// 				console.log(res)
// 				if (res.data.auth) {
// 					setAuth(true)
// 					window.localStorage.setItem('auth', 'true')
// 				} else {
// 					setAuth(false)
// 					window.localStorage.setItem('auth', 'false')
// 				}
// 			})
// 			.catch((er) => {
// 				console.log(er)
// 			})
// 	}, [])

// 	return (
// 		<BrowserRouter>
// 			<Switch>
// 				<ProtectedRoute auth={auth} path="/" exact component={Admin} />
// 				<ProtectedRoute auth={auth} path="/admin" component={Admin} />
// 				<PublicRoutes auth={auth} component={Auth} path="/auth" />
// 			</Switch>
// 		</BrowserRouter>
// 	)
// }
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Admin from './pages/admin';
import Auth from './pages/auth';
import Profile from './pages/profile';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
        <Route path="/user/" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}
