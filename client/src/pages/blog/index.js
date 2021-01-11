import { Route, Switch } from 'react-router-dom';
import routes from '../../constant/routes';
import DefaultLayout from '../../layout/default';
import BlogHome from './view/BlogHome';

const Blog = () => {
  return (
    <DefaultLayout>
      <Switch>
        <Route path={routes.blog} component={BlogHome} />
      </Switch>
    </DefaultLayout>
  );
};

export default Blog;
