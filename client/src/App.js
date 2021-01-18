import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import config from './config';
import routes from './constant/routes';
import ProtectedRoute from './routes/ProtectedRoutes';
import PublicRoutes from './routes/PublicRoutes';
import useAuthProvider from './hook/useAuthProvider';
import useApolloClientWithToken from './hook/useApolloClientWithToken';
import Admin from './pages/admin';
import Auth from './pages/auth';
import Profile from './pages/profile';
import Home from './pages/home';
import Forum from './pages/forum';
import Blog from './pages/blog';
import DefaultLayout from './layout/default';

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
        window.localStorage.setItem('auth', auth);
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
        <Switch>
          <ProtectedRoute path={routes.admin} auth={auth} component={Admin} />
          <PublicRoutes path={routes.auth} auth={auth} component={Auth} />

          <DefaultLayout>
            <Route path={routes.home} exact component={Home} />
            <ProtectedRoute
              auth={auth}
              path={routes.profile}
              component={Profile}
            />
            <Route path={routes.forum} component={Forum} />
            <Route path={routes.blog} component={Blog} />
          </DefaultLayout>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
