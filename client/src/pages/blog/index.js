import { Route, Switch } from 'react-router-dom';
import BlogHome from './view/BlogHome';

const Blog = (props) => {
  const { match } = props;
  const current_url = match.url;

  return (
    <Switch>
      <Route exact path={current_url} component={BlogHome} />
    </Switch>
  );
};

export default Blog;
