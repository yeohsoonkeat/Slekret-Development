import { Route, Switch } from 'react-router-dom';
import NavigationBar from '../../components/navbar';
import BlogEditor from './view/BlogEditor';
import BlogHome from './view/BlogHome';

const Blog = (props) => {
	const { match } = props;
	const current_url = match.url;

	return (
		<div className="">
			<NavigationBar />
			<Switch>
				<Route exact path={current_url} component={BlogHome} />
				<Route exact path="/blog/editor" component={BlogEditor} />
			</Switch>
		</div>
	);
};

export default Blog;
