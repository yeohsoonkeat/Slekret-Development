import { Route, Switch } from 'react-router-dom';
import BlogHome from './view/BlogHome';

const Blog = (props) => {
  const { match } = props;
  const current_url = match.url;

  return (
    <div className="w-full max-w-8xl flex-1">
      <Switch>
        <Route exact path={current_url} component={BlogHome} />
      </Switch>
    </div>
  );
};

export default Blog;
