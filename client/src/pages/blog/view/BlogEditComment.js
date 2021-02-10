import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useLocation, useParams, withRouter } from 'react-router-dom';

function BlogEditComment(props) {
	const location = useLocation();
	const { id, comment } = useParams();
	const [updatedComment, setNewComment] = useState(comment);

	const [updateComment] = useMutation(UPDATE_COMMENT, {
		onCompleted() {
			window.open(`/blog/${blog.blogId}/${blog.blogTitle}`, '_self');
		},
	});

	if (!location.state) {
		return window.open('/blog', '_self');
	}

	const blog = location.state?.blog;

	const handleOnClickUpdateComment = () => {
		if (updatedComment.trim()) {
			updateComment({
				variables: {
					commentId: id,
					content: updatedComment,
				},
			});
		}
	};

	return (
		<div
			className="flex items-center justify-center max-w-4xl mx-auto flex-col p-5"
			style={{
				height: '90vh',
			}}
		>
			<h1 className="text-2xl mb-5">
				Comment from
				<a
					href={`/blog/${blog.blogId}/${blog.blogTitle}`}
					className=" text-blue-500 underline"
				>
					this blog?
				</a>
			</h1>
			<div className="mb-10 w-full">
				<textarea
					className="h-56 w-full mx-auto resize-none p-5 border rounded shadow"
					placeholder="Update comment..."
					onChange={(e) => setNewComment(e.target.value)}
					value={updatedComment}
					id="comment-editor"
				/>
				<div>
					<button
						className="bg-blue-500 py-3 px-5 uppercase text-white font-bold rounded mr-2"
						onClick={handleOnClickUpdateComment}
						disabled={updatedComment === comment}
					>
						Update
					</button>
					<button
						className=" px-14 py-3 rounded mr-3 border mt-5 md:mt-0"
						onClick={() => props.history.goBack()}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

export default withRouter(BlogEditComment);

const UPDATE_COMMENT = gql`
	mutation MyMutation($commentId: uuid, $content: String) {
		update_blog_article_comments(
			where: { id: { _eq: $commentId } }
			_set: { content: $content }
		) {
			affected_rows
		}
	}
`;
