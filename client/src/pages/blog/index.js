import { Route, Switch } from 'react-router-dom';
import BlogHome from './view/BlogHome';
import BlogDetail from './view/BlogDetail'

const Blog = (props) => {
  const { match } = props;
  const current_url = match.url;
  return (
    <div className="w-full max-w-8xl flex-1">
      <Switch>
        <Route exact path={current_url} component={BlogHome} />
        <Route exact path={`${current_url}/:id`} component={BlogDetail} />
      </Switch>
    </div>
  );
};

export default Blog;
