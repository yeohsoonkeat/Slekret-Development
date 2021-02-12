import { Route, Switch } from 'react-router-dom';
import DefaultLayout from '../../layout/default';
import ForumLayout from './layout/ForumLayout';
import NewQuestion from './view/NewQuestion';
import QuestionDetail from './view/QuestionDetail';
import Questions from './view/Questions';

const Forum = (props) => {
	const { match } = props;
	const current_url = match.url;

	return (
		<DefaultLayout>
			<ForumLayout>
				<Switch>
					<Route exact path={current_url} component={Questions} />
					<Route
						exact
						path={`${current_url}/:id/:title`}
						component={QuestionDetail}
					/>
					<Route
						exact
						path={`${current_url}/new-question`}
						component={NewQuestion}
					/>
				</Switch>
			</ForumLayout>
		</DefaultLayout>
	);
};

export default Forum;
