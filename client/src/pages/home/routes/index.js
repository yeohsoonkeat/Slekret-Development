import { Route, Switch } from 'react-router-dom';
import Home from '../view';

export default function HomeRoute() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}
