import { gql, useMutation } from '@apollo/client';
import { useHistory, useLocation, withRouter } from 'react-router-dom';

function BlogConfirmDelete(props) {
	const location = useLocation();
	const history = useHistory();

	if (!location.state) {
		history.push('/blog');
	}
	console.log(location.state);

	const { id, blogTitle } = props.match.params;

	const [deteleBlog] = useMutation(DELETE_ID, {
		variables: {
			blogId: id,
		},
		onCompleted() {
			window.open(`/user/${location.state.username}`, '_self');
		},
	});
	return (
		<div
			className=" flex items-center justify-center max-w-4xl mx-auto"
			style={{
				height: '90vh',
			}}
		>
			<div className="w-full">
				<h1 className="text-3xl font-black p-5 bg-gray-200">
					{'=> '} {blogTitle}.
				</h1>
				<div className="w-full h-90 p-5">
					<h1 className="text-2xl">
						Are you sure you want to delete this Blog?
					</h1>
					<div className="mt-5 flex flex-wrap">
						<button
							className="px-14 py-3 bg-red-400 border-none text-white rounded mr-3 mt-5 md:mt-0"
							onClick={() => deteleBlog()}
						>
							Delete
						</button>

						<button
							className="px-14 py-3 rounded mr-3 border mt-5 md:mt-0"
							onClick={() => props.history.goBack()}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default withRouter(BlogConfirmDelete);

const DELETE_ID = gql`
	mutation MyMutation($blogId: uuid) {
		delete_blog_articles(where: { id: { _eq: $blogId } }) {
			affected_rows
		}
	}
`;
