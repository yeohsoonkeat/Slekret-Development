import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Admin from './pages/admin';
import Auth from './pages/auth';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
      </Switch>
    </BrowserRouter>
  );
}
