import { ApolloProvider } from '@apollo/client';
import axios from 'axios';
import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import config from './config';
import routes from './constant/routes';
import useApolloClientWithToken from './hook/useApolloClientWithToken';
import useAuthProvider from './hook/useAuthProvider';

const Admin = lazy(() => import('./pages/admin'));
const Auth = lazy(() => import('./pages/auth'));
const Profile = lazy(() => import('./pages/profile'));
// const Home = lazy(() => import('./pages/home'));
const Forum = lazy(() => import('./pages/forum'));
const Blog = lazy(() => import('./pages/blog'));
const ErrorPage = lazy(() => import('./pages/error'));
const DefaultLayout = lazy(() => import('./layout/default'));
const ProtectedRoute = lazy(() => import('./routes/ProtectedRoutes'));
const PublicRoutes = lazy(() => import('./routes/PublicRoutes'));

const App = () => {
	const [token, setToken] = useState();
	const [authState, authDispatch] = useAuthProvider();
	const { apolloClient } = useApolloClientWithToken(token, authDispatch);
	const { auth } = authState;
	useEffect(() => {
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
				const { auth, token, user } = res?.data;
				setToken(token);
				console.log(token);
				window.localStorage.setItem('auth', auth);
				window.localStorage.setItem('avatarSrc', user.avatar_src);

				authDispatch({
					type: 'UPDATE_AUTH',
					payload: { auth, user },
				});
			})
			.catch((err) => {
				window.localStorage.setItem('auth', 'false');
			});
	}, [authDispatch]);

	return (
		<ApolloProvider client={apolloClient}>
			<BrowserRouter>
				<Suspense fallback={<Loading />}>
					<Switch>
						<ProtectedRoute path={routes.admin} auth={auth} component={Admin} />
						<PublicRoutes path={routes.auth} auth={auth} component={Auth} />

						<Route path={routes.blog} component={Blog} />

						<DefaultLayout>
							<Route path={routes.error} component={ErrorPage} />
							{/* <Route exact path={routes.home} component={Home} /> */}
							<ProtectedRoute
								auth={auth}
								path={routes.profile}
								component={Profile}
							/>
							<Route path={routes.forum} component={Forum} />
						</DefaultLayout>
					</Switch>
				</Suspense>
			</BrowserRouter>
		</ApolloProvider>
	);
};

export default App;
