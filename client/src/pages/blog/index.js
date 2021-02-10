import { Route, Switch } from 'react-router-dom';
import NavigationBar from '../../components/navbar';
import ProtectedRoutes from '../../routes/ProtectedRoutes';
import EditorStateProvider from './provider/editor/editorStateProvider';
import BlogConfirmDelete from './view/BlogConfirmDelete';
import BlogConfirmDeleteComment from './view/BlogConfirmDeleteComment';
import BlogDetail from './view/BlogDetail';
import BlogEditComment from './view/BlogEditComment';
import BlogEditor from './view/BlogEditor';
import BlogHome from './view/BlogHome';
import NotFound from '../../components/NotFound'

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
						path={current_url + '/delete_confirm/:id/:blogTitle'}
						component={BlogConfirmDelete}
					/>
					<Route
						exact
						path={current_url + '/delete_confirm/comment/:id/:comment'}
						component={BlogConfirmDeleteComment}
					/>
					<Route
						exact
						path={current_url + '/edit/comment/:id/:comment'}
						component={BlogEditComment}
					/>
					<Route
						exact
						path={current_url + '/:id/:blogTitle'}
						component={BlogDetail}
					/>
					<EditorStateProvider>
						<ProtectedRoutes
							exact
							path={current_url + '/new'}
							component={BlogEditor}
						/>
						<ProtectedRoutes
							exact
							path={current_url + '/edit'}
							component={BlogEditor}
						/>
					</EditorStateProvider>
					<Route component={NotFound} />
				</Switch>
			</div>
		</div>
	);
};

export default Blog;
