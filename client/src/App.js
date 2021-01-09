import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './constant/routes';
import Admin from './pages/admin';
import Auth from './pages/auth';
import Profile from './pages/profile';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.admin} component={Admin} />
        <Route path={routes.auth} component={Auth} />
        <Route path={routes.profile} component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}
