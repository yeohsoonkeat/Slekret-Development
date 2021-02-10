import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useLocation, useParams, withRouter } from 'react-router-dom';

function BlogConfirmDeleteComment(props) {
	const { id, comment } = useParams();
	const location = useLocation();
	const blog = location.state?.blog;

	const [removeComment] = useMutation(DELETE_COMMENT, {
		onCompleted() {
			window.open(`/blog/${blog.blogId}/${blog.blogTitle}`, '_self');
		},
	});

	if (!location.state) {
		return window.open('/blog', '_self');
	}

	const handleOnClickDeleteComment = () => {
		removeComment({ variables: { commentId: id } });
	};

	return (
		<div
			className="flex items-center justify-center max-w-4xl mx-auto flex-col"
			style={{
				height: '70vh',
			}}
		>
			<h1 className="text-3xl font-black p-5 bg-gray-200 w-full">
				{'=> '} {comment}.
			</h1>{' '}
			<div className="w-full h-90 p-5">
				<h1 className="text-2xl">
					Are you sure you want to delete this Comment from
					<a
						href={`/blog/${blog.blogId}/${blog.blogTitle}`}
						className=" text-blue-500 underline"
					>
						{' '}
						this blog?
					</a>
				</h1>
				<div className="mt-5 flex flex-wrap">
					<button
						className="px-14 py-3 bg-red-400 border-none text-white rounded mr-3 mt-5 md:mt-0"
						onClick={handleOnClickDeleteComment}
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
	);
}

export default withRouter(BlogConfirmDeleteComment);

const DELETE_COMMENT = gql`
	mutation MyMutation($commentId: uuid) {
		delete_blog_article_comments(where: { id: { _eq: $commentId } }) {
			affected_rows
		}
	}
`;
