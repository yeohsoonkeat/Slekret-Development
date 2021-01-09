import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Admin from './pages/admin';
import Auth from './pages/auth';
import Profile from './pages/profile'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
        <Route path="/user/" component={Profile}/>
      </Switch>
    </BrowserRouter>
  );
}
