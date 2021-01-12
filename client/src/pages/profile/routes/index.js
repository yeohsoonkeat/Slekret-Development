import { Route, Switch } from 'react-router-dom';
import { ProfilePage } from '../views/';

export default function ProfileRoute() {
  return (
    <Switch>
      <Route path="/user/:id" exact component={ProfilePage} />
    </Switch>
  );
}
