import { Route, Switch } from 'react-router-dom';
import HomePage from './view';

const Home = (props) => {
  const { match } = props;
  const current_url = match.url;

  return (
    <Switch>
      <Route exact path={current_url} component={HomePage} />
    </Switch>
  );
};

export default Home;
