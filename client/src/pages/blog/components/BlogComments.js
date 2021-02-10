import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import AddNewComment from './AddNewComment';
import BlogComment from './BlogComment';

export default function BlogComments({ blogId, numberOfComments, blogTitle }) {
	const [listOfComments, setListOfComment] = useState([]);
	const [commentsLength, setNumberOfComments] = useState(numberOfComments);
	const { loading, error, data } = useQuery(GET_BLOG_COMMENTS, {
		variables: { id: blogId },
	});
	if (loading) {
		// implement skeleton
		return <h1>Loading</h1>;
	}

	if (error) {
		return <h1>Error</h1>;
	}

	return (
		<div className="mb-20 w-11/12 mx-auto">
			<h1 className="text-2xl font-black mb-5  mx-auto">
				{commentsLength >= 2
					? `${commentsLength} Comments`
					: `${commentsLength} Comment`}
			</h1>

			<AddNewComment
				blogId={blogId}
				setListOfComment={setListOfComment}
				setNumberOfComments={setNumberOfComments}
			/>

			{listOfComments.map((comment, index) => {
				if (index === 0) {
					return (
						<div className=" bg-yellow-50 p-5">
							<BlogComment
								comment={comment}
								key={index}
								blog={{ blogId: comment.id, blogTitle }}
							/>
						</div>
					);
				}
				return (
					<BlogComment
						comment={comment}
						key={index}
						blog={{ blogId: comment.id, blogTitle }}
					/>
				);
			})}

			{data.blog_article_comments.map((comment, index) => {
				return (
					<BlogComment
						comment={comment}
						key={index}
						blog={{ blogId, blogTitle }}
					/>
				);
			})}
		</div>
	);
}

const GET_BLOG_COMMENTS = gql`
	query MyQuery($id: uuid) {
		blog_article_comments(
			where: { blog_article: { id: { _eq: $id } } }
			order_by: { created_at: asc }
		) {
			id
			content
			slekret_user {
				avatar_src
				displayname
				username
				id
			}
			created_at
		}
	}
`;
