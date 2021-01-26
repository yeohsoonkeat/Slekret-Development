import { Route, Switch } from 'react-router-dom';
import NavigationBar from '../../components/navbar';
import Footer from '../../components/Footer';
import EditorStateProvider from './provider/editor/editorStateProvider';
import BlogEditor from './view/BlogEditor';
import BlogHome from './view/BlogHome';
import BlogDetail from './view/BlogDetail';

const Blog = (props) => {
	const { match } = props;
	const current_url = match.url;

	return (
		<div>
			<NavigationBar />
			<div className="max-w-8xl mx-auto">
				<Switch>
					<Route exact path={current_url} component={BlogHome} />
					<Route
						exact
						path={current_url + '/:id/:blogTitle'}
						component={BlogDetail}
					/>
					<EditorStateProvider>
						<Route
							exact
							path={current_url + '/editor'}
							component={BlogEditor}
						/>
					</EditorStateProvider>
				</Switch>
			</div>
			<Footer />
		</div>
	);
};

export default Blog;
