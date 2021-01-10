import { Route, Redirect } from 'react-router-dom';
import routes from '../constant/routes';

const ProtectedRoutes = ({ auth, component: Component, ...rest }) => {
  const isAuth = window.localStorage.getItem('auth') === 'true' || auth;

  return (
    <Route
      {...rest}
      render={() => {
        return isAuth ? <Component /> : <Redirect to={routes.auth} />;
      }}
    />
  );
};

export default ProtectedRoutes;
